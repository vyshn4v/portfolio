import React, { useState, useEffect, useRef } from 'react';
import { motion, LayoutGroup, useReducedMotion } from 'framer-motion';
import { X, RotateCcw, AlertCircle, Maximize2, Minimize2, ArrowUp, Loader2 } from 'lucide-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { OtpWidget, type UIAction } from './OtpWidget';
import { ScheduleFormWidget } from './ScheduleFormWidget';
import './AIChat.css';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  statusText?: string;
  uiAction?: UIAction | null;
  intent?: string;
  isStreaming?: boolean;
}

const API_ENDPOINT = import.meta.env.VITE_API_URL || 'https://api-pulse.vyshnavpc.com/api/chat';
const YOHO_ICON_SRC = '/Kawaii Ghost Coder Icon.png';

// Strict minimum and maximum boundaries for desktop chat window
const MIN_WINDOW_WIDTH = 400;
const MIN_WINDOW_HEIGHT = 480;
const MAX_WINDOW_WIDTH = 780;
const MAX_WINDOW_HEIGHT = 840;
const CHAT_CORNER_RADIUS = 12;

const QUICK_PROMPTS = [
  'What did Vyshnav build at Neutrinos?',
  'How was Yoho AI-Agent architected?',
  'Tell me about the Domain Scanner SaaS platform',
  'Schedule a technical consultation with Vyshnav',
];

const formatStatus = (data: { node?: string; status?: string }): string => {
  switch (data.status) {
    case 'understanding_query':
      return 'Yoho is analyzing your query...';
    case 'searching_knowledge_base':
      return "Searching Vyshnav's knowledge base...";
    case 'verifying_relevance':
      return 'Verifying technical profile relevance...';
    case 'generating_answer':
      return 'Generating response...';
    case 'starting':
      return 'Yoho is preparing...';
    default:
      if (data.status) {
        return `Yoho: ${data.status.replace(/_/g, ' ')}...`;
      }
      return 'Yoho is thinking...';
  }
};

// Guarded sessionStorage helper falling back safely to in-memory state
const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window === 'undefined') return null;
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, value);
      }
    } catch {
      // In-memory fallback on storage failure
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key);
      }
    } catch {
      // In-memory fallback on storage failure
    }
  },
};

const hasBubblePayload = (
  msg: Pick<Message, 'sender' | 'text' | 'uiAction'>
): boolean =>
  msg.sender === 'user' ||
  msg.text.trim().length > 0 ||
  Boolean(msg.uiAction);

const sanitizeRestoredMessages = (raw: unknown): Message[] | null => {
  if (!Array.isArray(raw)) return null;

  const cleaned = raw
    .filter((item): item is Message => {
      if (!item || typeof item !== 'object') return false;
      const candidate = item as Partial<Message>;
      const sender = candidate.sender;
      if (
        (sender !== 'user' && sender !== 'assistant') ||
        typeof candidate.id !== 'string' ||
        typeof candidate.text !== 'string'
      ) {
        return false;
      }
      return hasBubblePayload({
        sender,
        text: candidate.text,
        uiAction: candidate.uiAction ?? null,
      });
    })
    .map((msg) => ({
      ...msg,
      isStreaming: false,
      statusText: undefined,
    }));

  return cleaned.length > 0 ? cleaned : null;
};

interface AIChatProps {
  isReady?: boolean;
}

export const AIChat: React.FC<AIChatProps> = ({ isReady = true }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeAbortControllerRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef<number>(0);

  const [conversationId, setConversationId] = useState<string>(() => {
    try {
      const saved = safeSessionStorage.getItem('vyshnav_chat_conv_id');
      if (saved) return saved;
      const generated =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `conv-${Date.now()}`;
      safeSessionStorage.setItem('vyshnav_chat_conv_id', generated);
      return generated;
    } catch {
      return `conv-${Date.now()}`;
    }
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = safeSessionStorage.getItem('vyshnav_yoho_messages');
      if (saved) {
        const restored = sanitizeRestoredMessages(JSON.parse(saved));
        if (restored) {
          return restored;
        }
      }
    } catch {
      // Continue using in-memory state on storage failure
    }
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: "👋 Hi! I'm Yoho, Vyshnav's autonomous AI assistant. I can answer questions about his backend architecture, enterprise InsurTech delivery at Neutrinos, and tech stack—or help you schedule a technical consultation.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const launcherBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 640px)');
  const prefersReducedMotion = useReducedMotion();
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const getDefaultBounds = () => {
    if (typeof window === 'undefined') {
      return { x: 0, y: 0, width: 430, height: 580 };
    }
    const targetW = 430;
    const targetH = 580;
    const minW = Math.min(MIN_WINDOW_WIDTH, window.innerWidth - 32);
    const minH = Math.min(MIN_WINDOW_HEIGHT, window.innerHeight - 80);
    const w = Math.max(minW, Math.min(targetW, window.innerWidth - 32));
    const h = Math.max(minH, Math.min(targetH, window.innerHeight - 80));
    const x = Math.max(16, window.innerWidth - w - 24);
    const y = Math.max(16, window.innerHeight - h - 24);
    return { x, y, width: w, height: h };
  };

  const [bounds, setBounds] = useState(getDefaultBounds);
  const currentBoundsRef = useRef(bounds);
  const prevBoundsRef = useRef(bounds);

  useEffect(() => {
    currentBoundsRef.current = bounds;
  }, [bounds]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (typeof window === 'undefined') return;
      setBounds((prev) => {
        const minW = Math.min(MIN_WINDOW_WIDTH, window.innerWidth - 24);
        const minH = Math.min(MIN_WINDOW_HEIGHT, window.innerHeight - 40);
        const w = Math.max(minW, Math.min(prev.width, window.innerWidth - 24));
        const h = Math.max(minH, Math.min(prev.height, window.innerHeight - 40));
        const x = Math.max(12, Math.min(window.innerWidth - w - 12, prev.x));
        const y = Math.max(12, Math.min(window.innerHeight - h - 12, prev.y));
        return { x, y, width: w, height: h };
      });
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const handleHeaderPointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;
    if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
    e.preventDefault();

    const el = windowRef.current;
    if (!el) return;

    const dragTarget = e.currentTarget as HTMLElement;
    try {
      dragTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    el.classList.add('is-dragging');
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startX = currentBoundsRef.current.x;
    const startY = currentBoundsRef.current.y;
    let curX = startX;
    let curY = startY;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startMouseX;
      const deltaY = moveEvent.clientY - startMouseY;

      const maxX = Math.max(12, window.innerWidth - currentBoundsRef.current.width - 12);
      const maxY = Math.max(12, window.innerHeight - currentBoundsRef.current.height - 12);
      curX = Math.round(Math.max(12, Math.min(maxX, startX + deltaX)));
      curY = Math.round(Math.max(12, Math.min(maxY, startY + deltaY)));

      el.style.left = `${curX}px`;
      el.style.top = `${curY}px`;
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        dragTarget.releasePointerCapture(upEvent.pointerId);
      } catch {
        // ignore
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      el.classList.remove('is-dragging');
      document.body.style.userSelect = '';
      document.body.style.cursor = '';

      el.style.left = `${curX}px`;
      el.style.top = `${curY}px`;

      currentBoundsRef.current.x = curX;
      currentBoundsRef.current.y = curY;
      setBounds((prev) => ({ ...prev, x: curX, y: curY }));
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
  };

  const handleToggleMaximize = () => {
    if (isMaximized) {
      setBounds(prevBoundsRef.current);
      setIsMaximized(false);
    } else {
      prevBoundsRef.current = bounds;
      const maxW = Math.min(720, window.innerWidth - 32);
      const maxH = Math.min(800, window.innerHeight - 32);
      const centerX = Math.max(16, Math.round((window.innerWidth - maxW) / 2));
      const centerY = Math.max(16, Math.round((window.innerHeight - maxH) / 2));
      setBounds({ x: centerX, y: centerY, width: maxW, height: maxH });
      setIsMaximized(true);
    }
  };

  type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se';

  const handleResizeStart = (e: React.PointerEvent, direction: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();

    const el = windowRef.current;
    if (!el) return;

    const handleTarget = e.currentTarget as HTMLElement;
    try {
      handleTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    el.classList.add('is-resizing');
    document.body.style.userSelect = 'none';

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startX = currentBoundsRef.current.x;
    const startY = currentBoundsRef.current.y;
    const startW = currentBoundsRef.current.width;
    const startH = currentBoundsRef.current.height;

    let curX = startX;
    let curY = startY;
    let curW = startW;
    let curH = startH;

    const minW = Math.min(MIN_WINDOW_WIDTH, window.innerWidth - 24);
    const minH = Math.min(MIN_WINDOW_HEIGHT, window.innerHeight - 24);
    const maxW = Math.min(MAX_WINDOW_WIDTH, window.innerWidth - 24);
    const maxH = Math.min(MAX_WINDOW_HEIGHT, window.innerHeight - 24);

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startMouseX;
      const deltaY = moveEvent.clientY - startMouseY;

      // Horizontal
      if (direction === 'se' || direction === 'e' || direction === 'ne') {
        curW = Math.max(minW, Math.min(window.innerWidth - startX - 12, Math.min(maxW, startW + deltaX)));
      } else if (direction === 'sw' || direction === 'w' || direction === 'nw') {
        const maxLeftShift = startW - minW;
        const minLeftShift = startW - maxW;
        const boundedDeltaX = Math.min(maxLeftShift, Math.max(Math.max(-startX + 12, minLeftShift), deltaX));
        curX = startX + boundedDeltaX;
        curW = startW - boundedDeltaX;
      }

      // Vertical
      if (direction === 'se' || direction === 's' || direction === 'sw') {
        curH = Math.max(minH, Math.min(window.innerHeight - startY - 12, Math.min(maxH, startH + deltaY)));
      } else if (direction === 'ne' || direction === 'n' || direction === 'nw') {
        const maxTopShift = startH - minH;
        const minTopShift = startH - maxH;
        const boundedDeltaY = Math.min(maxTopShift, Math.max(Math.max(-startY + 12, minTopShift), deltaY));
        curY = startY + boundedDeltaY;
        curH = startH - boundedDeltaY;
      }

      curX = Math.round(curX);
      curY = Math.round(curY);
      curW = Math.round(curW);
      curH = Math.round(curH);

      el.style.left = `${curX}px`;
      el.style.top = `${curY}px`;
      el.style.width = `${curW}px`;
      el.style.height = `${curH}px`;
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        handleTarget.releasePointerCapture(upEvent.pointerId);
      } catch {
        // ignore
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      el.classList.remove('is-resizing');
      document.body.style.userSelect = '';

      el.style.left = `${curX}px`;
      el.style.top = `${curY}px`;
      el.style.width = `${curW}px`;
      el.style.height = `${curH}px`;

      currentBoundsRef.current = { x: curX, y: curY, width: curW, height: curH };
      setBounds({ x: curX, y: curY, width: curW, height: curH });
      setIsMaximized(false);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
  };

  useEffect(() => {
    try {
      safeSessionStorage.setItem('vyshnav_yoho_messages', JSON.stringify(messages));
    } catch {
      // Retain in-memory messages state on storage failure
    }
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    try {
      if (conversationId) {
        safeSessionStorage.setItem('vyshnav_chat_conv_id', conversationId);
      } else {
        safeSessionStorage.removeItem('vyshnav_chat_conv_id');
      }
    } catch {
      // Retain in-memory conversation state on storage failure
    }
  }, [conversationId]);

  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = isOpen;

    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
    if (!isOpen && wasOpen) {
      launcherBtnRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const isScrollableAtBoundary = (el: HTMLElement | null, deltaY: number): boolean => {
      if (!el) return true;
      if (el.scrollHeight <= el.clientHeight) return true;
      const atTop = el.scrollTop <= 0 && deltaY < 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && deltaY > 0;
      return atTop || atBottom;
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest(
        '.chat-messages-container, .chat-textarea, .schedule-field-textarea'
      ) as HTMLElement | null;
      if (isScrollableAtBoundary(scrollable, e.deltaY)) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest(
        '.chat-messages-container, .chat-textarea, .schedule-field-textarea'
      ) as HTMLElement | null;
      if (!scrollable || scrollable.scrollHeight <= scrollable.clientHeight) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen]);

  const handleSend = async (textToSend?: string): Promise<boolean> => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return false;

    // Abort and invalidate any active in-flight request
    if (activeAbortControllerRef.current) {
      activeAbortControllerRef.current.abort();
      activeAbortControllerRef.current = null;
    }

    const abortController = new AbortController();
    activeAbortControllerRef.current = abortController;
    const currentRequestId = ++activeRequestIdRef.current;

    setError(null);
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    const currentConvId =
      conversationId ||
      (typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `conv-${Date.now()}`);

    if (!conversationId) {
      setConversationId(currentConvId);
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const botMessageId = `agent-${Date.now()}`;
    const botPlaceholder: Message = {
      id: botMessageId,
      sender: 'assistant',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      statusText: 'Yoho is thinking...',
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, botPlaceholder]);
    setIsLoading(true);

    const updateBotMessage = (updater: (msg: Message) => Message) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === botMessageId ? updater(m) : m))
      );
    };

    try {
      const payload: { message: string; conversationId?: string } = {
        message: query,
        conversationId: currentConvId,
      };

      const streamUrl = API_ENDPOINT.endsWith('/stream')
        ? API_ENDPOINT
        : `${API_ENDPOINT.replace(/\/+$/, '')}/stream`;

      const streamResponse = await fetch(streamUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify(payload),
        signal: abortController.signal,
      });

      if (!streamResponse.ok) {
        throw new Error(`Server returned HTTP ${streamResponse.status}`);
      }
      if (!streamResponse.body) {
        throw new Error('Streaming response body is unavailable');
      }

      const reader = streamResponse.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      // Keep currentEvent outside the chunk loop so event/data pairs across chunks stay intact
      let currentEvent = 'message';
      let accumulatedText = '';
      let capturedUiAction: UIAction | null = null;
      let capturedIntent: string | undefined;
      let streamCompleted = false;

      const processSseLine = (rawLine: string): boolean => {
        const line = rawLine.trim();
        if (!line) {
          // Reset only when parser reaches the event delimiter (blank line)
          currentEvent = 'message';
          return false;
        }
        if (line.startsWith('event:')) {
          currentEvent = line.slice(6).trim();
          return false;
        }
        if (!line.startsWith('data:')) {
          return false;
        }

        const dataStr = line.slice(5).trim();
        let data: Record<string, unknown>;
        try {
          data = JSON.parse(dataStr);
        } catch {
          return false;
        }

        if (abortController.signal.aborted || activeRequestIdRef.current !== currentRequestId) {
          return true;
        }

        if (typeof data.conversationId === 'string' && data.conversationId) {
          setConversationId(data.conversationId);
        }

        if (currentEvent === 'status') {
          if (typeof data.status === 'string' && data.status) {
            const st = formatStatus({
              node: typeof data.node === 'string' ? data.node : undefined,
              status: data.status,
            });
            updateBotMessage((m) => ({ ...m, statusText: st }));
          }
        } else if (currentEvent === 'token') {
          if (typeof data.token === 'string' && data.token) {
            accumulatedText += data.token;
            const hasVisibleText = accumulatedText.trim().length > 0;
            updateBotMessage((m) => ({
              ...m,
              text: accumulatedText,
              statusText: hasVisibleText ? undefined : m.statusText,
              isStreaming: true,
            }));
          }
        } else if (currentEvent === 'ui_action') {
          capturedUiAction = data as unknown as UIAction;
          updateBotMessage((m) => ({ ...m, uiAction: capturedUiAction }));
        } else if (currentEvent === 'error') {
          const errMessage =
            (typeof data.error === 'string' && data.error) ||
            (typeof data.message === 'string' && data.message) ||
            'Streaming request failed';
          throw new Error(errMessage);
        } else if (currentEvent === 'done') {
          streamCompleted = true;
          if (data.uiAction) {
            capturedUiAction = data.uiAction as UIAction;
          }
          if (typeof data.intent === 'string') {
            capturedIntent = data.intent;
          }
          const doneReply = typeof data.reply === 'string' ? data.reply : '';
          if (doneReply && !accumulatedText.trim()) {
            accumulatedText = doneReply;
          }
          const finalText = accumulatedText.trim()
            ? accumulatedText
            : doneReply.trim()
              ? doneReply
              : capturedUiAction
                ? ''
                : 'No response received.';

          updateBotMessage((m) => ({
            ...m,
            text: finalText || m.text,
            statusText: undefined,
            uiAction: capturedUiAction || m.uiAction,
            intent: capturedIntent,
            isStreaming: false,
          }));
        }

        return false;
      };

      while (true) {
        if (abortController.signal.aborted || activeRequestIdRef.current !== currentRequestId) {
          void reader.cancel().catch(() => {});
          return false;
        }

        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const rawLine of lines) {
          if (processSseLine(rawLine)) return false;
        }
      }

      if (abortController.signal.aborted || activeRequestIdRef.current !== currentRequestId) {
        return false;
      }

      // Flush any trailing decoded SSE line lacking a terminal newline
      buffer += decoder.decode();
      if (buffer) {
        for (const rawLine of buffer.split('\n')) {
          if (processSseLine(rawLine)) return false;
        }
      }

      if (abortController.signal.aborted || activeRequestIdRef.current !== currentRequestId) {
        return false;
      }

      if (!streamCompleted) {
        const finalText = accumulatedText.trim()
          ? accumulatedText
          : capturedUiAction
            ? ''
            : 'No response received.';
        updateBotMessage((m) => ({
          ...m,
          text: finalText || m.text,
          statusText: undefined,
          uiAction: capturedUiAction || m.uiAction,
          intent: capturedIntent,
          isStreaming: false,
        }));
      }

      return true;
    } catch (err: unknown) {
      if (abortController.signal.aborted || activeRequestIdRef.current !== currentRequestId) {
        return false;
      }
      console.error('AI chat error:', err);
      const fallbackErrorMessage = 'Something went wrong, please try sometimes later.';
      setError(fallbackErrorMessage);
      updateBotMessage((m) => ({
        ...m,
        text: fallbackErrorMessage,
        statusText: undefined,
        isStreaming: false,
      }));
      return false;
    } finally {
      if (activeRequestIdRef.current === currentRequestId) {
        activeAbortControllerRef.current = null;
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Graceful fallback for browsers without field-sizing: content support
    if (inputRef.current && !CSS.supports?.('field-sizing', 'content')) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent premature submission during active IME composition (e.g. CJK or accented input)
      if (e.nativeEvent.isComposing || e.keyCode === 229) {
        return;
      }
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetConversation = () => {
    // Abort or invalidate any active request from handleSend
    if (activeAbortControllerRef.current) {
      activeAbortControllerRef.current.abort();
      activeAbortControllerRef.current = null;
    }
    activeRequestIdRef.current++;
    setIsLoading(false);

    const newConvId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `conv-${Date.now()}`;
    setConversationId(newConvId);
    safeSessionStorage.setItem('vyshnav_chat_conv_id', newConvId);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: "👋 Hi, I am Yoho! I will help you to know Vyshnav's details and schedule meetings with him. How can I help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setError(null);
  };

  // Basic markdown parser for bold, lists, and line breaks
  const renderFormattedText = (raw: string, isStreaming?: boolean) => {
    if (!raw.trim()) {
      return isStreaming ? <span className="streaming-cursor" aria-hidden="true" /> : null;
    }

    const lines = raw.split('\n');
    return (
      <div className="chat-markdown">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="chat-empty-line" />;
          }

          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="chat-heading-3">
                {trimmed.replace(/^###\s+/, '')}
              </h4>
            );
          }

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className="chat-bullet-item">
                <span className="bullet-dot" />
                <span>{parseInline(content)}</span>
              </div>
            );
          }

          return <p key={idx}>{parseInline(trimmed)}</p>;
        })}
        {isStreaming && <span className="streaming-cursor" aria-hidden="true" />}
      </div>
    );
  };

  const parseInline = (text: string) => {
    // Matches **bold**, inline code `code`, and links
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="chat-inline-code">{part.slice(1, -1)}</code>;
      }
      if (part.startsWith('http://') || part.startsWith('https://')) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="chat-link">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  if (!isReady) {
    return null;
  }

  const morphTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.34, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="ai-chat-root">
      <LayoutGroup id="yoho-chat-morph">
        {!isOpen ? (
          <div className="ai-chat-launcher-wrap">
            <motion.button
              ref={launcherBtnRef}
              key="chat-launcher"
              type="button"
              layoutId={prefersReducedMotion ? undefined : 'yoho-chat-surface'}
              layoutDependency={isOpen}
              initial={hasOpenedOnce || prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
              transition={{
                layout: morphTransition,
                opacity: { duration: 0.2 },
                y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.12 },
              }}
              onClick={() => {
                setHasOpenedOnce(true);
                setIsOpen(true);
              }}
              className="ai-chat-launcher-btn"
              style={{ borderRadius: CHAT_CORNER_RADIUS }}
              aria-label="Meet Yoho — Open AI Chat"
            >
              <motion.span
                className="ai-chat-launcher-inner"
                initial={hasOpenedOnce && !prefersReducedMotion ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.14,
                  delay: hasOpenedOnce && !prefersReducedMotion ? 0.12 : 0,
                }}
              >
                <span className="ai-chat-launcher-label">Meet Yoho</span>
                <span className="launcher-avatar-box" aria-hidden="true">
                  <span className="launcher-yoho-wrap">
                    <img
                      src={YOHO_ICON_SRC}
                      alt=""
                      aria-hidden="true"
                      className="yoho-chat-btn-img"
                    />
                  </span>
                  <span className="launcher-status-dot" />
                </span>
              </motion.span>
            </motion.button>
          </div>
        ) : (
          <>
            <div className="ai-chat-backdrop" aria-hidden="true" />
            <motion.div
            ref={windowRef}
            key="chat-window"
            layoutId={prefersReducedMotion ? undefined : 'yoho-chat-surface'}
            layoutDependency={isOpen}
            className="ai-chat-window"
            initial={prefersReducedMotion ? { opacity: 0 } : undefined}
            animate={{ opacity: 1 }}
            transition={{
              layout: morphTransition,
              opacity: { duration: prefersReducedMotion ? 0.01 : 0.15 },
            }}
            role="dialog"
            aria-label="Yoho AI Agent Chat Window"
            style={
              !isMobile
                ? {
                    left: `${bounds.x}px`,
                    top: `${bounds.y}px`,
                    width: `${bounds.width}px`,
                    height: `${bounds.height}px`,
                    right: 'auto',
                    bottom: 'auto',
                    borderRadius: CHAT_CORNER_RADIUS,
                  }
                : { borderRadius: CHAT_CORNER_RADIUS }
            }
          >
            <motion.div
              className="ai-chat-window-content"
              initial={prefersReducedMotion ? false : { opacity: 0.25 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.14,
                delay: 0,
                ease: 'easeOut',
              }}
            >
            {/* Edge & Corner Resize Handles (Desktop Only) */}
            {!isMobile && (
              <>
                <div
                  className="chat-resize-handle chat-resize-nw"
                  onPointerDown={(e) => handleResizeStart(e, 'nw')}
                  title="Drag corner to resize"
                  aria-hidden="true"
                >
                  <span className="resize-corner-mark" />
                </div>
                <div
                  className="chat-resize-handle chat-resize-ne"
                  onPointerDown={(e) => handleResizeStart(e, 'ne')}
                  title="Drag corner to resize"
                  aria-hidden="true"
                />
                <div
                  className="chat-resize-handle chat-resize-sw"
                  onPointerDown={(e) => handleResizeStart(e, 'sw')}
                  title="Drag corner to resize"
                  aria-hidden="true"
                />
                <div
                  className="chat-resize-handle chat-resize-se"
                  onPointerDown={(e) => handleResizeStart(e, 'se')}
                  title="Drag corner to resize"
                  aria-hidden="true"
                >
                  <span className="resize-corner-mark resize-corner-mark-se" />
                </div>
                <div
                  className="chat-resize-handle chat-resize-n"
                  onPointerDown={(e) => handleResizeStart(e, 'n')}
                  title="Drag edge to resize height"
                  aria-hidden="true"
                />
                <div
                  className="chat-resize-handle chat-resize-s"
                  onPointerDown={(e) => handleResizeStart(e, 's')}
                  title="Drag edge to resize height"
                  aria-hidden="true"
                />
                <div
                  className="chat-resize-handle chat-resize-w"
                  onPointerDown={(e) => handleResizeStart(e, 'w')}
                  title="Drag edge to resize width"
                  aria-hidden="true"
                />
                <div
                  className="chat-resize-handle chat-resize-e"
                  onPointerDown={(e) => handleResizeStart(e, 'e')}
                  title="Drag edge to resize width"
                  aria-hidden="true"
                />
              </>
            )}

            {/* Header / Drag Handle */}
            <div
              className={`chat-header ${!isMobile ? 'chat-header-draggable' : ''}`}
              onPointerDown={handleHeaderPointerDown}
              title={!isMobile ? 'Drag to move' : undefined}
            >
              <div className="chat-header-info">
                <div className="agent-avatar-wrap">
                  <img
                    src={YOHO_ICON_SRC}
                    alt="Yoho Ghost Coder"
                    className="yoho-header-avatar"
                  />
                  <span className="agent-status-indicator" />
                </div>
                <div>
                  <div className="chat-header-title">
                    <span>Yoho · AI Agent</span>
                    <span className="chat-badge">LIVE</span>
                  </div>
                  <div className="chat-header-subtitle">
                    Autonomous Portfolio Agent
                  </div>
                </div>
              </div>

              <div className="chat-header-actions">
                {!isMobile && (
                  <button
                    onClick={handleToggleMaximize}
                    className="chat-action-btn"
                    title={isMaximized ? 'Restore size' : 'Maximize chat'}
                    aria-label={isMaximized ? 'Restore size' : 'Maximize chat'}
                  >
                    {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  </button>
                )}
                <button
                  onClick={handleResetConversation}
                  className="chat-action-btn"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="chat-action-btn chat-close-btn"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="chat-messages-stage">
              <div className="chat-messages-container">

              {messages.map((msg) => {
                const showBubble = hasBubblePayload(msg);
                return (
                  <div
                    key={msg.id}
                    className={`chat-message-row ${
                      msg.sender === 'user' ? 'message-row-user' : 'message-row-agent'
                    }`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="msg-avatar msg-avatar-yoho">
                        <img
                          src={YOHO_ICON_SRC}
                          alt="Yoho"
                          className="yoho-msg-avatar-img"
                        />
                      </div>
                    )}
                    <div className="msg-bubble-wrap">
                      {showBubble && (
                        <div
                          className={`msg-bubble ${
                            msg.sender === 'user' ? 'bubble-user' : 'bubble-agent'
                          }`}
                        >
                          {/* Text content with markdown formatting and streaming cursor */}
                          {msg.sender === 'assistant'
                            ? renderFormattedText(msg.text, msg.isStreaming)
                            : msg.text}

                          {/* Dynamic In-Chat Schedule Form Widget (Generative UI) */}
                          {msg.uiAction?.type === 'form_input' && (
                            <ScheduleFormWidget
                              uiAction={msg.uiAction}
                              onSubmit={(messageText) => handleSend(messageText)}
                              isLoading={isLoading}
                            />
                          )}

                          {/* Dynamic In-Chat OTP Input Widget (Generative UI) */}
                          {msg.uiAction?.type === 'otp_input' && (
                            <OtpWidget
                              uiAction={msg.uiAction}
                              onSubmit={(code) => handleSend(code)}
                              isLoading={isLoading}
                            />
                          )}
                        </div>
                      )}

                      {/* Backend Action Status: under the message icon/bubble, OUTSIDE the speech bubble */}
                      {msg.statusText && (
                        <div className="msg-status-under-bubble">
                          <span className="pipeline-spinner" />
                          <span className="status-under-text">{msg.statusText}</span>
                        </div>
                      )}

                      {showBubble && <span className="msg-timestamp">{msg.timestamp}</span>}
                    </div>
                  </div>
                );
              })}

              {/* Quick Prompts below if minimal messages */}
              {messages.length <= 2 && !isLoading && (
                <div className="chat-quick-prompts">
                  <div className="quick-prompts-label">SUGGESTED QUESTIONS:</div>
                  <div className="quick-prompts-list">
                    {QUICK_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        className="quick-prompt-btn"
                        onClick={() => handleSend(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Error Notification Bar */}
            {error && (
              <div className="chat-error-bar">
                <AlertCircle size={13} />
                <span>{error}</span>
              </div>
            )}

            {/* Input Container */}
            <div className="chat-input-wrapper">
              <div className={`chat-input-box ${input.trim() ? 'has-content' : ''}`}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Yoho anything about Vyshnav..."
                  className="chat-textarea"
                  rows={1}
                  disabled={isLoading}
                />

                <div className="chat-input-bottom-bar">
                  <div className="chat-input-hint">
                    <span className="kbd-badge">Enter ↵</span> to send
                  </div>

                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="chat-send-btn"
                    aria-label="Send message"
                    title={isLoading ? 'Generating response...' : 'Send (Enter)'}
                  >
                    {isLoading ? (
                      <Loader2 size={15} className="chat-send-spinner" />
                    ) : (
                      <ArrowUp size={16} strokeWidth={2.4} />
                    )}
                  </button>
                </div>
              </div>

              <div className="chat-input-disclaimer">
                <span>Yoho explores Vyshnav's work & schedules meetings</span>
              </div>
            </div>
            </motion.div>
          </motion.div>
          </>
        )}
      </LayoutGroup>
    </div>
  );
};

export default AIChat;
