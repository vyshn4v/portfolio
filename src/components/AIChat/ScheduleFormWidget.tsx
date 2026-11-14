import React, { useState, useMemo } from 'react';
import { Calendar, User, Mail, Phone, MessageSquare, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import type { UIAction, FormField } from './OtpWidget';
import './ScheduleFormWidget.css';

// Always provide full name, email address, phone number, and meeting reason
const BASE_FIELDS: FormField[] = [
  { name: 'name', type: 'text', label: 'Full Name', required: true, placeholder: 'e.g. Alex Rivera' },
  { name: 'email', type: 'email', label: 'Email Address', required: true, placeholder: 'e.g. alex@example.com' },
  { name: 'phone', type: 'tel', label: 'Phone Number', required: false, placeholder: 'e.g. +91 98765 43210' },
  { name: 'reason', type: 'textarea', label: 'Reason for Meeting', required: false, placeholder: 'e.g. Project inquiry, consulting, full-stack AI collaboration...' },
];

interface ScheduleFormWidgetProps {
  uiAction: UIAction;
  onSubmit: (formattedMessage: string) => Promise<boolean> | boolean | void;
  isLoading?: boolean;
}

export const ScheduleFormWidget: React.FC<ScheduleFormWidgetProps> = ({
  uiAction,
  onSubmit,
  isLoading = false,
}) => {
  const fields = useMemo(() => {
    const map = new Map<string, FormField>();
    BASE_FIELDS.forEach((f) => map.set(f.name, f));
    if (uiAction.fields && uiAction.fields.length > 0) {
      uiAction.fields.forEach((f) => {
        const existing = map.get(f.name);
        map.set(f.name, { ...existing, ...f });
      });
    }
    return Array.from(map.values());
  }, [uiAction.fields]);

  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach((f) => {
      initial[f.name] = '';
    });
    return initial;
  });

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(Boolean(uiAction.submitted));
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted || isLoading || isPending) return;

    // Validate required fields
    for (const f of fields) {
      const val = (formData[f.name] || '').trim();
      if (f.required && !val) {
        setValidationError(`Please enter your ${f.label || f.name}.`);
        return;
      }
      if (f.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setValidationError('Please enter a valid email address.');
        return;
      }
    }

    const nameVal = (formData['name'] || '').trim();
    const emailVal = (formData['email'] || '').trim();
    const phoneVal = (formData['phone'] || '').trim();
    const reasonVal = (formData['reason'] || '').trim();

    // Construct query message text that backend agent understands
    let messageText = `My name is ${nameVal} and my email is ${emailVal}`;
    if (phoneVal) {
      messageText += `, phone: ${phoneVal}`;
    }
    if (reasonVal) {
      messageText += `. Reason for meeting: ${reasonVal}`;
    }

    // Include values for all configured fields, using each field's name or label to identify its value
    const standardFields = new Set(['name', 'email', 'phone', 'reason']);
    const extraParts: string[] = [];
    fields.forEach((f) => {
      if (!standardFields.has(f.name)) {
        const val = (formData[f.name] || '').trim();
        if (val) {
          const identifier = f.label || f.name;
          extraParts.push(`${identifier}: ${val}`);
        }
      }
    });

    if (extraParts.length > 0) {
      messageText += (messageText ? '. ' : '') + extraParts.join(', ');
    }

    setIsPending(true);
    try {
      const result = await onSubmit(messageText);
      if (result !== false) {
        setIsSubmitted(true);
        uiAction.submitted = true;
        uiAction.submittedValue = `${nameVal} (${emailVal})`;
      } else {
        setIsSubmitted(false);
        delete uiAction.submitted;
        delete uiAction.submittedValue;
      }
    } catch {
      setIsSubmitted(false);
      delete uiAction.submitted;
      delete uiAction.submittedValue;
    } finally {
      setIsPending(false);
    }
  };

  const renderFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case 'email':
        return <Mail size={14} className="field-prefix-icon" />;
      case 'phone':
        return <Phone size={14} className="field-prefix-icon" />;
      case 'reason':
        return <MessageSquare size={14} className="field-prefix-icon field-prefix-textarea" />;
      default:
        return <User size={14} className="field-prefix-icon" />;
    }
  };

  return (
    <div className={`schedule-form-card ${isSubmitted ? 'is-confirmed' : ''}`}>
      <div className="schedule-form-header">
        <div className="schedule-form-icon-wrap">
          {isSubmitted ? (
            <CheckCircle2 size={16} className="schedule-icon-confirmed" />
          ) : (
            <Calendar size={16} className="schedule-icon-calendar" />
          )}
        </div>
        <div className="schedule-form-titles">
          <h4 className="schedule-form-title">
            {uiAction.title || 'Schedule a Meeting with Vyshnav'}
          </h4>
          <p className="schedule-form-desc">
            {uiAction.description ||
              'Enter your details below to request a meeting. A verification code will be sent to your email.'}
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="schedule-submitted-badge">
          <CheckCircle2 size={13} />
          <span>Details Submitted ({uiAction.submittedValue || formData['email']})</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="schedule-form-body">
          <div className="schedule-fields-grid">
            {fields.map((field) => (
              <div key={field.name} className="schedule-field-group">
                <label className="schedule-field-label">
                  {field.label || field.name}
                  {field.required && <span className="required-star">*</span>}
                </label>
                <div className="schedule-input-wrapper">
                  {renderFieldIcon(field.name)}
                  {field.type === 'textarea' || field.name === 'reason' ? (
                    <textarea
                      rows={2}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder || `Enter ${field.label || field.name}`}
                      disabled={isLoading || isSubmitted || isPending}
                      className="schedule-field-textarea"
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder || `Enter ${field.label || field.name}`}
                      disabled={isLoading || isSubmitted || isPending}
                      required={field.required}
                      className="schedule-field-input"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {validationError && (
            <div className="schedule-validation-error">{validationError}</div>
          )}

          <div className="schedule-form-footer">
            <span className="schedule-hint">Vyshnav responds within 24 hours</span>
            <button
              type="submit"
              disabled={isLoading || isSubmitted || isPending}
              className="schedule-submit-btn"
            >
              {isPending ? (
                <>
                  <Loader2 size={13} className="spin-icon" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
