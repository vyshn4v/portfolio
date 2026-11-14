import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, AlertCircle, GripHorizontal, Maximize2, Minimize2, ArrowUp, Loader2 } from 'lucide-react';
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
const YOHO_MAINFRAME_SRC = '/Cute Coding Ghost with Glowing Headphones.png';

// Strict minimum and maximum boundaries for desktop chat window
const MIN_WINDOW_WIDTH = 400;
const MIN_WINDOW_HEIGHT = 480;
const MAX_WINDOW_WIDTH = 780;
const MAX_WINDOW_HEIGHT = 840;

const QUICK_PROMPTS = [
  'What are the main technical skills of Vyshnav?',
  'Schedule a meeting with Vyshnav',
  'Tell me about the Domain Scanner project',
  'What did Vyshnav build at Neutrinos?',
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

interface AIChatProps {
  isReady?: boolean;
}

export const AIChat: React.FC<AIChatProps> = ({ isReady = true }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>(() => {
    const saved = sessionStorage.getItem('vyshnav_chat_conv_id');
    if (saved) return saved;
    try {
      const generated = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `conv-${Date.now()}`;
      sessionStorage.setItem('vyshnav_chat_conv_id', generated);
      return generated;
    } catch {
      return `conv-${Date.now()}`;
    }
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = sessionStorage.getItem('vyshnav_yoho_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore fallback
      }
    }
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: "👋 Hi, I am Yoho! I will help you to know Vyshnav's details and schedule meetings with him.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 640px)');
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
    sessionStorage.setItem('vyshnav_yoho_messages', JSON.stringify(messages));
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (conversationId) {
      sessionStorage.setItem('vyshnav_chat_conv_id', conversationId);
    } else {
      sessionStorage.removeItem('vyshnav_chat_conv_id');
    }
  }, [conversationId]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

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

    try {
      const payload: { message: string; conversationId?: string } = {
        message: query,
        conversationId: currentConvId,
      };

      const streamUrl = API_ENDPOINT.endsWith('/stream')
        ? API_ENDPOINT
        : `${API_ENDPOINT.replace(/\/+$/, '')}/stream`;

      let streamSucceeded = false;
      let accumulatedText = '';
      let capturedUiAction: UIAction | null = null;

      try {
        const streamResponse = await fetch(streamUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
          },
          body: JSON.stringify(payload),
        });

        if (streamResponse.ok && streamResponse.body) {
          const reader = streamResponse.body.getReader();
          const decoder = new TextDecoder('utf-8');
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            let currentEvent = 'message';
            for (const rawLine of lines) {
              const line = rawLine.trim();
              if (!line) {
                currentEvent = 'message';
                continue;
              }
              if (line.startsWith('event:')) {
                currentEvent = line.slice(6).trim();
                continue;
              }
              if (line.startsWith('data:')) {
                const dataStr = line.slice(5).trim();
                try {
                  const data = JSON.parse(dataStr);

                  if (currentEvent === 'status') {
                    if (data.status) {
                      const st = formatStatus(data);
                      setMessages((prev) =>
                        prev.map((m) =>
                          m.id === botMessageId
                            ? { ...m, statusText: st }
                            : m
                        )
                      );
                    }
                    if (data.conversationId) {
                      setConversationId(data.conversationId);
                    }
                  } else if (currentEvent === 'token') {
                    if (data.token) {
                      accumulatedText += data.token;
                      streamSucceeded = true;
                      setMessages((prev) =>
                        prev.map((m) =>
                          m.id === botMessageId
                            ? {
                                ...m,
                                text: accumulatedText,
                                statusText: undefined,
                                isStreaming: true,
                              }
                            : m
                        )
                      );
                    }
                    if (data.conversationId) {
                      setConversationId(data.conversationId);
                    }
                  } else if (currentEvent === 'ui_action') {
                    capturedUiAction = data;
                    streamSucceeded = true;
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === botMessageId
                          ? { ...m, uiAction: data }
                          : m
                      )
                    );
                  } else if (currentEvent === 'done') {
                    streamSucceeded = true;
                    if (data.conversationId) {
                      setConversationId(data.conversationId);
                    }
                    if (data.uiAction) {
                      capturedUiAction = data.uiAction;
                    }
                    if (data.reply && !accumulatedText) {
                      accumulatedText = data.reply;
                    }
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === botMessageId
                          ? {
                              ...m,
                              text: accumulatedText || data.reply || m.text,
                              statusText: undefined,
                              uiAction: capturedUiAction || m.uiAction,
                              intent: data.intent,
                              isStreaming: false,
                            }
                          : m
                      )
                    );
                  }
                } catch {
                  // ignore non-json SSE lines
                }
              }
            }
          }
        }
      } catch (streamErr) {
        console.warn('SSE stream error, trying standard fallback:', streamErr);
        streamSucceeded = false;
      }

      // If SSE did not produce content or failed, fallback to standard endpoint
      if (!streamSucceeded || (!accumulatedText && !capturedUiAction)) {
        const fallbackResponse = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!fallbackResponse.ok) {
          throw new Error(`Server returned HTTP ${fallbackResponse.status}`);
        }

        const data = await fallbackResponse.json();
        const botReply = data.reply || data.message || data.response || 'No response received.';

        if (data.conversationId) {
          setConversationId(data.conversationId);
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? {
                  ...m,
                  text: botReply,
                  statusText: undefined,
                  uiAction: data.uiAction || null,
                  intent: data.intent,
                  isStreaming: false,
                }
              : m
          )
        );
      } else {
        // Ensure final state is cleaned up
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? {
                  ...m,
                  statusText: undefined,
                  isStreaming: false,
                }
              : m
          )
        );
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to reach AI service';
      setError(errMsg);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? {
                ...m,
                text: `⚠️ Could not reach the AI agent at ${API_ENDPOINT}. Please make sure the backend server is running. (${errMsg})`,
                statusText: undefined,
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetConversation = () => {
    const newConvId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `conv-${Date.now()}`;
    setConversationId(newConvId);
    sessionStorage.setItem('vyshnav_chat_conv_id', newConvId);
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

  return (
    <div className="ai-chat-root">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="chat-launcher"
            initial={{ scale: 0.85, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="ai-chat-launcher-wrap"
          >
            <div className="ai-chat-launcher-hint">
              <span>Meet Yoho</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.12 }}
              onClick={() => setIsOpen(true)}
              className="ai-chat-launcher-btn"
              aria-label="Open Yoho AI Chat"
            >
              <div className="launcher-yoho-wrap">
                <img
                  src={YOHO_ICON_SRC}
                  alt="Yoho Ghost Coder Icon"
                  className="yoho-chat-btn-img"
                />
              </div>
              <span className="launcher-status-dot" title="Online" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            ref={windowRef}
            key="chat-window"
            className="ai-chat-window"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{
              opacity: { duration: 0.18, ease: 'easeOut' },
              scale: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
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
                  }
                : undefined
            }
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

              {!isMobile && (
                <div className="chat-header-grip" aria-hidden="true">
                  <GripHorizontal size={16} />
                </div>
              )}

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
            <div className="chat-messages-container">
              {/* Yoho Main Frame inside Chat */}
              <div className="yoho-mainframe-banner">
                <div className="yoho-mainframe-aspect">
                  <img
                    src={YOHO_MAINFRAME_SRC}
                    alt="Yoho Coding Ghost Main Frame"
                    className="yoho-mainframe-img"
                  />
                </div>
              </div>

              {messages.map((msg) => (
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
                    {(msg.text || msg.uiAction || msg.sender === 'user') && (
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
                            isLoading={isLoading && Boolean(msg.isStreaming)}
                          />
                        )}

                        {/* Dynamic In-Chat OTP Input Widget (Generative UI) */}
                        {msg.uiAction?.type === 'otp_input' && (
                          <OtpWidget
                            uiAction={msg.uiAction}
                            onSubmit={(code) => handleSend(code)}
                            isLoading={isLoading && Boolean(msg.isStreaming)}
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

                    <span className="msg-timestamp">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {/* Typing indicator fallback when no streaming message is present yet */}
              {isLoading && !messages.some((m) => m.isStreaming) && (
                <div className="chat-message-row message-row-agent">
                  <div className="msg-avatar msg-avatar-yoho">
                    <img
                      src={YOHO_ICON_SRC}
                      alt="Yoho"
                      className="yoho-msg-avatar-img"
                    />
                  </div>
                  <div className="msg-bubble bubble-agent typing-bubble">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}

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
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;
