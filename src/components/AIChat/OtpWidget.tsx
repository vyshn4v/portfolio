import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import './OtpWidget.css';

export interface FormField {
  name: string;
  type?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export interface UIAction {
  type: string;
  title?: string;
  email?: string;
  length?: number;
  description?: string;
  placeholder?: string;
  fields?: FormField[];
  submitted?: boolean;
  submittedValue?: string;
}

interface OtpWidgetProps {
  uiAction: UIAction;
  onSubmit: (code: string) => void;
  isLoading?: boolean;
}

export const OtpWidget: React.FC<OtpWidgetProps> = ({
  uiAction,
  onSubmit,
  isLoading = false,
}) => {
  const length = uiAction.length && uiAction.length > 0 ? uiAction.length : 6;
  const [digits, setDigits] = useState<string[]>(() => {
    if (uiAction.submittedValue) {
      const chars = uiAction.submittedValue.split('');
      return Array.from({ length }, (_, i) => chars[i] || '');
    }
    return Array(length).fill('');
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(Boolean(uiAction.submitted));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input on mount if not already submitted
  useEffect(() => {
    if (!isSubmitted && !uiAction.submitted) {
      const timer = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, uiAction.submitted]);

  const triggerSubmit = (code: string) => {
    if (code.length === length && !isSubmitted) {
      setIsSubmitted(true);
      uiAction.submitted = true;
      uiAction.submittedValue = code;
      onSubmit(code);
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSubmitted || isLoading) return;
    const val = e.target.value.replace(/\D/g, ''); // Digits only

    if (!val) {
      const updated = [...digits];
      updated[index] = '';
      setDigits(updated);
      return;
    }

    // Single character input
    const char = val.slice(-1);
    const updated = [...digits];
    updated[index] = char;
    setDigits(updated);

    // Auto-advance to next box if available
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all digits are filled
    const fullCode = updated.join('');
    if (fullCode.length === length && updated.every((d) => d !== '')) {
      triggerSubmit(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSubmitted || isLoading) return;

    if (e.key === 'Backspace') {
      if (digits[index]) {
        // Clear current box
        const updated = [...digits];
        updated[index] = '';
        setDigits(updated);
      } else if (index > 0) {
        // Step back and clear previous box
        inputRefs.current[index - 1]?.focus();
        const updated = [...digits];
        updated[index - 1] = '';
        setDigits(updated);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      const code = digits.join('');
      if (code.length === length) {
        triggerSubmit(code);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (isSubmitted || isLoading) return;
    e.preventDefault();

    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;

    const updated = [...digits];
    for (let i = 0; i < length; i++) {
      updated[i] = pasted[i] || '';
    }
    setDigits(updated);

    // Focus last filled or next empty box
    const nextEmptyIndex = updated.findIndex((d) => d === '');
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }

    // Auto-submit if full code was pasted
    if (pasted.length === length) {
      triggerSubmit(pasted);
    }
  };

  const handleManualSubmit = () => {
    const code = digits.join('');
    if (code.length === length) {
      triggerSubmit(code);
    }
  };

  const isFull = digits.every((d) => d !== '') && digits.join('').length === length;

  return (
    <div className={`otp-widget-card ${isSubmitted ? 'is-confirmed' : ''}`}>
      <div className="otp-widget-header">
        <div className="otp-widget-icon-wrap">
          {isSubmitted ? (
            <CheckCircle2 size={16} className="otp-icon-confirmed" />
          ) : (
            <ShieldCheck size={16} className="otp-icon-shield" />
          )}
        </div>
        <div className="otp-widget-titles">
          <h4 className="otp-widget-title">
            {uiAction.title || 'Enter 6-Digit Verification Code'}
          </h4>
          <p className="otp-widget-desc">
            {uiAction.description ||
              (uiAction.email
                ? `Please enter the 6-digit code sent to ${uiAction.email}`
                : 'Enter the verification code to confirm your request')}
          </p>
        </div>
      </div>

      <div className="otp-boxes-row" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={isSubmitted || isLoading}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`otp-digit-input ${digit ? 'has-value' : ''} ${
              isSubmitted ? 'is-locked' : ''
            }`}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        ))}
      </div>

      <div className="otp-widget-footer">
        {isSubmitted ? (
          <div className="otp-submitted-badge">
            <CheckCircle2 size={13} />
            <span>Code Submitted ({digits.join('')})</span>
          </div>
        ) : (
          <div className="otp-action-row">
            <span className="otp-auto-hint">Auto-submits on 6th digit</span>
            <button
              type="button"
              onClick={handleManualSubmit}
              disabled={!isFull || isLoading}
              className="otp-submit-btn"
              aria-label="Verify Code"
            >
              {isLoading ? (
                <>
                  <Loader2 size={13} className="spin-icon" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
