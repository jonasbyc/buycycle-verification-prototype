import React, { useState, useRef, useEffect, useCallback } from 'react';

// ==================== DESIGN TOKENS ====================
// Strictly following buycycle design system
const tokens = {
  colors: {
    background: {
      primary: '#FCFCFC',
      secondary: '#F3F3F3',
      tertiary: '#FFFFFF',
      quaternary: '#EAEAEA',
      reverse: '#090907',
      positive: '#E8F8F0',
      alert: '#FFEBEB',
      information: '#EFF6FF',
      warning: '#FFF7ED',
      attention: '#FFFBEB',
    },
    content: {
      primary: '#090907',
      secondary: '#333333',
      tertiary: '#535353',
      quaternary: '#A9A9A9',
      reverse: '#FCFCFC',
      positive: '#146C43',
      alert: '#B91C1C',
      information: '#1D4ED8',
      warning: '#EA580C',
      attention: '#92400E',
    },
    border: {
      primary: '#090907',
      secondary: '#757575',
      tertiary: '#EAEAEA',
      quaternary: '#D0D0D0',
      alert: '#B91C1C',
      positive: '#146C43',
    }
  },
  typography: {
    fontFamily: "'Neue Haas Grotesk Text Pro', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    11: '44px',
    12: '48px',
  }
};

// ==================== ICONS (from buycycle design system) ====================
const IconChevronLeft = ({ color = tokens.colors.content.primary, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCheck = ({ color = tokens.colors.content.positive, size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M40 15L19 36L8 25" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconLock = ({ color = tokens.colors.content.primary, size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="12" y="22" width="24" height="18" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M16 22V16C16 11.5817 19.5817 8 24 8C28.4183 8 32 11.5817 32 16V22" stroke={color} strokeWidth="2"/>
  </svg>
);

const IconEye = ({ color = tokens.colors.content.tertiary, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M1 10C1 10 4 4 10 4C16 4 19 10 19 10C19 10 16 16 10 16C4 16 1 10 1 10Z" stroke={color} strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="3" stroke={color} strokeWidth="1.5"/>
  </svg>
);

const IconEyeOff = ({ color = tokens.colors.content.tertiary, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M2 2L18 18M8.5 8.5C7.84 9.16 7.5 10.04 7.5 11C7.5 12.93 9.07 14.5 11 14.5C11.96 14.5 12.84 14.16 13.5 13.5M14.5 12C15.14 11.16 15.5 10.12 15.5 9C15.5 6.24 13.26 4 10.5 4C9.38 4 8.34 4.36 7.5 5M1 10C1 10 4 4 10 4M19 10C19 10 16 16 10 16C8.9 16 7.84 15.8 6.86 15.4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconChevronDown = ({ color = tokens.colors.content.primary, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ==================== SHARED COMPONENTS ====================

// iPhone Frame (390px standard viewport)
const IPhoneFrame = ({ children, showStatusBar = true }) => (
  <div style={{
    width: '390px',
    minHeight: '844px',
    backgroundColor: tokens.colors.background.primary,
    borderRadius: '44px',
    border: `12px solid ${tokens.colors.content.primary}`,
    position: 'relative',
    overflow: 'hidden',
    fontFamily: tokens.typography.fontFamily,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  }}>
    {/* Dynamic Island */}
    <div style={{
      position: 'absolute',
      top: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '126px',
      height: '37px',
      backgroundColor: tokens.colors.content.primary,
      borderRadius: '20px',
      zIndex: 100,
    }} />
    
    {/* Status Bar */}
    {showStatusBar && (
      <div style={{
        padding: '16px 24px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '54px',
      }}>
        <span style={{ fontSize: '14px', fontWeight: 500, color: tokens.colors.content.primary }}>9:41</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div style={{ width: '17px', height: '10px', border: `1px solid ${tokens.colors.content.primary}`, borderRadius: '2px', position: 'relative' }}>
            <div style={{ width: '60%', height: '100%', backgroundColor: tokens.colors.content.primary, borderRadius: '1px' }} />
          </div>
        </div>
      </div>
    )}
    
    {/* Content */}
    <div style={{ height: 'calc(100% - 54px)', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
    
    {/* Home Indicator */}
    <div style={{
      position: 'absolute',
      bottom: '8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '134px',
      height: '5px',
      backgroundColor: tokens.colors.content.primary,
      borderRadius: '3px',
    }} />
  </div>
);

// App Header (navigation/header-app)
const AppHeader = ({ title, onBack, rightAction, showBack = true }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    minHeight: '48px',
    backgroundColor: tokens.colors.background.primary,
  }}>
    <div style={{ width: '44px', display: 'flex', alignItems: 'center' }}>
      {showBack && (
        <button
          onClick={onBack}
          aria-label="Go back"
          style={{
            background: 'none',
            border: 'none',
            padding: '10px',
            margin: '-10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            minWidth: '44px',
            minHeight: '44px',
            justifyContent: 'center',
          }}
        >
          <IconChevronLeft />
        </button>
      )}
    </div>
    <span style={{
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px',
      color: tokens.colors.content.primary,
    }}>
      {title}
    </span>
    <div style={{ width: '44px', display: 'flex', justifyContent: 'flex-end' }}>
      {rightAction}
    </div>
  </div>
);

// Progress Indicator
const ProgressIndicator = ({ currentStep, totalSteps }) => (
  <div style={{ marginBottom: '24px' }}>
    <p style={{
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: 400,
      color: tokens.colors.content.tertiary,
      marginBottom: '8px',
    }}>
      Step {currentStep} of {totalSteps}
    </p>
    <div style={{ display: 'flex', gap: '8px' }}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: i < currentStep ? tokens.colors.content.primary : tokens.colors.border.tertiary,
          }}
        />
      ))}
    </div>
  </div>
);

// Primary Button (button/main - Primary variant, Large size)
const PrimaryButton = ({ label, onClick, disabled, loading, fullWidth = true, iconRight }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    style={{
      width: fullWidth ? '100%' : 'auto',
      height: '48px',
      padding: '12px 16px',
      backgroundColor: disabled ? tokens.colors.background.quaternary : tokens.colors.content.primary,
      color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.reverse,
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      fontFamily: tokens.typography.fontFamily,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background-color 150ms ease',
    }}
  >
    {loading ? (
      <div style={{
        width: '20px',
        height: '20px',
        border: `2px solid ${tokens.colors.content.reverse}`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    ) : (
      <>
        {label}
        {iconRight && <span style={{ marginLeft: '4px' }}>→</span>}
      </>
    )}
  </button>
);

// Secondary Button (button/main - Secondary variant)
const SecondaryButton = ({ label, onClick, disabled, fullWidth = true }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: fullWidth ? '100%' : 'auto',
      height: '48px',
      padding: '12px 16px',
      backgroundColor: disabled ? tokens.colors.background.quaternary : 'transparent',
      color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
      border: `1px solid ${disabled ? tokens.colors.border.tertiary : tokens.colors.border.secondary}`,
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      fontFamily: tokens.typography.fontFamily,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 150ms ease',
    }}
  >
    {label}
  </button>
);

// Text Link (button/main - Tertiary variant)
const TextLink = ({ label, onClick, disabled, color }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: 'none',
      border: 'none',
      padding: 0,
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '21px',
      color: disabled ? tokens.colors.content.quaternary : (color || tokens.colors.content.primary),
      textDecoration: 'underline',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: tokens.typography.fontFamily,
    }}
  >
    {label}
  </button>
);

// Text Input Field (inputs/text-field)
const TextField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  helperText,
  disabled,
  trailingIcon,
  onTrailingIconClick,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const hasValue = value && value.length > 0;
  
  const getBorderColor = () => {
    if (error) return tokens.colors.border.alert;
    if (focused) return tokens.colors.border.secondary;
    return tokens.colors.border.tertiary;
  };
  
  const getBorderWidth = () => {
    if (error || focused) return '2px';
    return '1px';
  };
  
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {label && (
        <label style={{
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          color: error ? tokens.colors.content.alert : tokens.colors.content.primary,
          fontFamily: tokens.typography.fontFamily,
          marginBottom: '8px',
        }}>
          {label}
        </label>
      )}
      <div style={{
        height: '40px',
        padding: `10px ${tokens.spacing[4]}`,
        backgroundColor: disabled ? tokens.colors.background.secondary : tokens.colors.background.tertiary,
        border: `${getBorderWidth()} solid ${getBorderColor()}`,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxSizing: 'border-box',
      }}>
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: error && hasValue ? tokens.colors.content.tertiary : tokens.colors.content.primary,
            fontFamily: tokens.typography.fontFamily,
          }}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {showPassword ? <IconEyeOff /> : <IconEye />}
          </button>
        )}
        {trailingIcon && (
          <button
            type="button"
            onClick={onTrailingIconClick}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            {trailingIcon}
          </button>
        )}
      </div>
      {helperText && (
        <p style={{
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '18px',
          color: error ? tokens.colors.content.alert : tokens.colors.content.tertiary,
          fontFamily: tokens.typography.fontFamily,
          margin: 0,
          marginTop: '4px',
        }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

// Phone Input with Country Selector
const PhoneInput = ({ value, onChange, countryCode, onCountryCodeChange, error, helperText }) => {
  const [focused, setFocused] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  
  const countries = [
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+48', flag: '🇵🇱', name: 'Poland' },
  ];
  
  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];
  
  const getBorderColor = () => {
    if (error) return tokens.colors.border.alert;
    if (focused) return tokens.colors.border.secondary;
    return tokens.colors.border.tertiary;
  };
  
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        color: error ? tokens.colors.content.alert : tokens.colors.content.primary,
        fontFamily: tokens.typography.fontFamily,
      }}>
        Phone number
      </label>
      <div style={{
        height: '40px',
        backgroundColor: tokens.colors.background.tertiary,
        border: `${error || focused ? '2px' : '1px'} solid ${getBorderColor()}`,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
        {/* Country Selector */}
        <button
          type="button"
          onClick={() => setShowCountryPicker(!showCountryPicker)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '0 12px',
            height: '100%',
            borderRight: `1px solid ${tokens.colors.border.tertiary}`,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          <span style={{ fontSize: '16px' }}>{selectedCountry.flag}</span>
          <span style={{ fontSize: '14px', color: tokens.colors.content.primary }}>{selectedCountry.code}</span>
          <IconChevronDown size={12} />
        </button>
        
        {/* Phone Input */}
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d\s]/g, ''))}
          placeholder="170 1234567"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: tokens.colors.content.primary,
            fontFamily: tokens.typography.fontFamily,
            padding: '0 16px',
          }}
        />
        
        {/* Country Picker Dropdown */}
        {showCountryPicker && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            backgroundColor: tokens.colors.background.tertiary,
            border: `1px solid ${tokens.colors.border.tertiary}`,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxHeight: '240px',
            overflowY: 'auto',
            zIndex: 1000,
          }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: `1px solid ${tokens.colors.border.tertiary}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: tokens.colors.content.primary }}>
                Select country
              </span>
              <button
                onClick={() => setShowCountryPicker(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: tokens.colors.content.primary,
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
            </div>
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  onCountryCodeChange(country.code);
                  setShowCountryPicker(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  border: 'none',
                  background: country.code === countryCode ? tokens.colors.background.secondary : 'none',
                  cursor: 'pointer',
                  fontFamily: tokens.typography.fontFamily,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{country.flag}</span>
                  <span style={{ fontSize: '14px', color: tokens.colors.content.primary }}>{country.name}</span>
                  <span style={{ fontSize: '14px', color: tokens.colors.content.tertiary }}>({country.code})</span>
                </span>
                {country.code === countryCode && (
                  <span style={{ color: tokens.colors.content.positive }}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {helperText && (
        <p style={{
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '18px',
          color: error ? tokens.colors.content.alert : tokens.colors.content.tertiary,
          fontFamily: tokens.typography.fontFamily,
          margin: 0,
        }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

// 6-Digit Code Input
const CodeInput = ({ value, onChange, error, onComplete, disabled }) => {
  const inputRefs = useRef([]);
  const [localValues, setLocalValues] = useState(['', '', '', '', '', '']);
  
  useEffect(() => {
    if (value) {
      const chars = value.split('').slice(0, 6);
      const newValues = [...chars, ...Array(6 - chars.length).fill('')];
      setLocalValues(newValues);
    } else {
      setLocalValues(['', '', '', '', '', '']);
    }
  }, [value]);
  
  const handleChange = (index, newValue) => {
    if (disabled) return;
    
    // Only allow numeric input
    const sanitized = newValue.replace(/[^0-9]/g, '');
    
    if (sanitized.length > 1) {
      // Handle paste
      const chars = sanitized.split('').slice(0, 6);
      const newValues = [...chars, ...Array(6 - chars.length).fill('')];
      setLocalValues(newValues);
      onChange(newValues.join(''));
      
      if (chars.length === 6) {
        onComplete?.(newValues.join(''));
      } else {
        const nextIndex = Math.min(chars.length, 5);
        inputRefs.current[nextIndex]?.focus();
      }
      return;
    }
    
    const newValues = [...localValues];
    newValues[index] = sanitized;
    setLocalValues(newValues);
    onChange(newValues.join(''));
    
    // Auto-advance to next input
    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit when complete
    if (sanitized && index === 5) {
      const fullCode = newValues.join('');
      if (fullCode.length === 6) {
        onComplete?.(fullCode);
      }
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (disabled) return;
    
    if (e.key === 'Backspace' && !localValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pastedData) {
      handleChange(0, pastedData);
    }
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {localValues.map((digit, index) => (
          <input
            key={index}
            ref={(el) => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of 6`}
            style={{
              width: '48px',
              height: '56px',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 500,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.content.primary,
              backgroundColor: tokens.colors.background.tertiary,
              border: `${error ? '2px' : '1px'} solid ${error ? tokens.colors.border.alert : tokens.colors.border.tertiary}`,
              borderRadius: '6px',
              outline: 'none',
              transition: 'border-color 150ms ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = error ? tokens.colors.border.alert : tokens.colors.border.secondary;
              e.target.style.borderWidth = '2px';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? tokens.colors.border.alert : tokens.colors.border.tertiary;
              e.target.style.borderWidth = error ? '2px' : '1px';
            }}
          />
        ))}
      </div>
      {error && (
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '21px',
          color: tokens.colors.content.alert,
          margin: 0,
          fontFamily: tokens.typography.fontFamily,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
};

// Info Box (helper text at bottom)
const InfoBox = ({ children }) => (
  <div style={{
    padding: '16px',
    backgroundColor: tokens.colors.background.secondary,
    borderRadius: '8px',
    border: `1px dashed ${tokens.colors.border.quaternary}`,
  }}>
    <p style={{
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '21px',
      color: tokens.colors.content.tertiary,
      margin: 0,
      fontFamily: tokens.typography.fontFamily,
      textAlign: 'center',
    }}>
      {children}
    </p>
  </div>
);

// Verification Checklist Item
const ChecklistItem = ({ label, completed, actionLabel, onClick }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0',
  }}>
    <div style={{
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: `2px solid ${completed ? tokens.colors.content.positive : tokens.colors.border.secondary}`,
      backgroundColor: completed ? tokens.colors.background.positive : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {completed && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M10 3L4.5 8.5L2 6" stroke={tokens.colors.content.positive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
    <span style={{
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      color: completed ? tokens.colors.content.positive : tokens.colors.content.primary,
      fontFamily: tokens.typography.fontFamily,
    }}>
      {completed ? `${label} verified` : label}
    </span>
    {!completed && actionLabel && (
      <span style={{
        fontSize: '14px',
        color: tokens.colors.content.tertiary,
        marginLeft: 'auto',
      }}>
        — {actionLabel}
      </span>
    )}
  </div>
);

// Password Criteria Checklist (real-time validation)
const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: 'Make it at least 8 characters', met: password.length >= 8 },
    { label: 'Use at least one number', met: /\d/.test(password) },
    { label: 'Both upper and lower case letters', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
      {criteria.map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle
              cx="8"
              cy="8"
              r="7"
              fill={c.met ? tokens.colors.background.positive : 'transparent'}
              stroke={c.met ? tokens.colors.content.positive : tokens.colors.content.quaternary}
              strokeWidth="1.5"
            />
            {c.met && (
              <path
                d="M5 8L7 10L11 6"
                stroke={tokens.colors.content.positive}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
          <span style={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '21px',
            color: c.met ? tokens.colors.content.tertiary : tokens.colors.content.quaternary,
            fontFamily: tokens.typography.fontFamily,
          }}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// ==================== SCREEN COMPONENTS ====================

// Screen: Social Login Name Collection
const SocialNameScreen = ({ provider, prefillData, onContinue, onBack }) => {
  const [firstName, setFirstName] = useState(prefillData?.firstName || '');
  const [lastName, setLastName] = useState(prefillData?.lastName || '');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [isCommercialSeller, setIsCommercialSeller] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');

  const isValid = firstName.trim().length > 0 && lastName.trim().length > 0
    && (!isCommercialSeller || companyName.trim().length > 0);

  const handleContinue = () => {
    let valid = true;
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }
    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      valid = false;
    } else {
      setLastNameError('');
    }
    if (isCommercialSeller && !companyName.trim()) {
      setCompanyNameError('Company name is required');
      valid = false;
    } else {
      setCompanyNameError('');
    }

    if (valid) {
      onContinue({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        isCommercialSeller,
        companyName: isCommercialSeller ? companyName.trim() : '',
      });
    }
  };
  
  const providerName = provider === 'google' ? 'Google' : 'Apple';
  const providerIcon = provider === 'google' ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M19.6 10.23c0-.68-.06-1.36-.17-2.02H10v3.83h5.38a4.6 4.6 0 01-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.33z" fill="#4285F4"/>
      <path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.58-4.12H1.08v2.58A9.99 9.99 0 0010 20z" fill="#34A853"/>
      <path d="M4.42 11.9a6.02 6.02 0 010-3.8V5.52H1.08a9.99 9.99 0 000 8.96l3.34-2.58z" fill="#FBBC05"/>
      <path d="M10 3.98c1.47 0 2.78.5 3.82 1.5l2.86-2.86A9.99 9.99 0 0010 0 9.99 9.99 0 001.08 5.52l3.34 2.58C5.2 5.74 7.4 3.98 10 3.98z" fill="#EA4335"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M17.05 12.54c-.04.89-.26 1.72-.66 2.5-.6 1.17-1.4 2.1-2.4 2.78-.77.52-1.62.86-2.55 1.02-.62.1-1.25.14-1.88.1-.96-.06-1.87-.3-2.72-.73-1.33-.67-2.36-1.64-3.1-2.9-.52-.9-.85-1.87-.98-2.92-.1-.78-.1-1.56 0-2.34.16-1.17.56-2.24 1.2-3.2.84-1.27 1.96-2.22 3.36-2.85.89-.4 1.83-.62 2.82-.66.73-.03 1.45.03 2.16.18v3.84h-2.02c-.64 0-1.1.18-1.37.53-.18.23-.27.54-.27.93v1.5h3.5l-.56 3.64h-2.94v8.8c2.7-.42 4.93-1.8 6.44-3.96.93-1.33 1.5-2.83 1.7-4.5.06-.5.08-1 .06-1.5-.01-.24-.02-.47-.04-.7" fill={tokens.colors.content.primary}/>
    </svg>
  );
  
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AppHeader onBack={onBack} />
      
      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* Provider Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: tokens.colors.background.secondary,
          borderRadius: '20px',
          alignSelf: 'flex-start',
          marginBottom: '24px',
        }}>
          {providerIcon}
          <span style={{
            fontSize: '14px',
            fontWeight: 500,
            color: tokens.colors.content.secondary,
            fontFamily: tokens.typography.fontFamily,
          }}>
            Connected with {providerName}
          </span>
        </div>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '32px',
            color: tokens.colors.content.primary,
            margin: '0 0 8px 0',
            fontFamily: tokens.typography.fontFamily,
          }}>
            Complete your profile
          </h1>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: tokens.colors.content.secondary,
            margin: 0,
            fontFamily: tokens.typography.fontFamily,
          }}>
            {prefillData?.firstName 
              ? 'We found your name from your account. Please confirm or update it.'
              : 'Please enter your name to continue.'}
          </p>
        </div>
        
        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          <TextField
            label="First name"
            type="text"
            value={firstName}
            onChange={(v) => { setFirstName(v); if (firstNameError) setFirstNameError(''); }}
            placeholder="Jonas"
            error={!!firstNameError}
            helperText={firstNameError}
          />
          
          <TextField
            label="Last name"
            type="text"
            value={lastName}
            onChange={(v) => { setLastName(v); if (lastNameError) setLastNameError(''); }}
            placeholder="Schmidt"
            error={!!lastNameError}
            helperText={lastNameError}
          />

          {/* Commercial Seller */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="checkbox"
                id="commercial-seller-social"
                checked={isCommercialSeller}
                onChange={(e) => {
                  setIsCommercialSeller(e.target.checked);
                  if (!e.target.checked) { setCompanyName(''); setCompanyNameError(''); }
                }}
                style={{ width: '20px', height: '20px', accentColor: tokens.colors.content.primary, cursor: 'pointer', margin: 0 }}
              />
              <label htmlFor="commercial-seller-social" style={{
                fontSize: '16px', fontWeight: 400, lineHeight: '24px',
                color: tokens.colors.content.primary, fontFamily: tokens.typography.fontFamily, cursor: 'pointer',
              }}>
                I am a commercial seller
              </label>
            </div>
            {isCommercialSeller && (
              <TextField
                label="Company name"
                type="text"
                value={companyName}
                onChange={(v) => { setCompanyName(v); if (companyNameError) setCompanyNameError(''); }}
                placeholder="My Bike Shop GmbH"
                error={!!companyNameError}
                helperText={companyNameError}
              />
            )}
          </div>

          {/* Email confirmation - with proper spacing from form */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: tokens.colors.background.positive,
            borderRadius: '8px',
            marginTop: '24px',
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: tokens.colors.content.positive,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 3L4.5 8.5L2 6" stroke={tokens.colors.content.reverse} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{
              fontSize: '14px',
              fontWeight: 400,
              color: tokens.colors.content.positive,
              fontFamily: tokens.typography.fontFamily,
            }}>
              Email verified via {providerName}
            </span>
          </div>
        </div>
        
        <div style={{ flex: 1 }} />
      </div>
      
      {/* Bottom Actions */}
      <div style={{ padding: '16px 24px 34px' }}>
        <PrimaryButton
          label="Continue"
          iconRight
          onClick={handleContinue}
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

// Screen: Profile Name Collection (for email signup)
const ProfileNameScreen = ({ onContinue, onBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [isCommercialSeller, setIsCommercialSeller] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');

  const isValid = firstName.trim().length > 0 && lastName.trim().length > 0
    && (!isCommercialSeller || companyName.trim().length > 0);

  const handleContinue = () => {
    let valid = true;
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }
    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      valid = false;
    } else {
      setLastNameError('');
    }
    if (isCommercialSeller && !companyName.trim()) {
      setCompanyNameError('Company name is required');
      valid = false;
    } else {
      setCompanyNameError('');
    }

    if (valid) {
      onContinue({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        isCommercialSeller,
        companyName: isCommercialSeller ? companyName.trim() : '',
      });
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AppHeader onBack={onBack} />

      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
        <ProgressIndicator currentStep={2} totalSteps={4} />

        {/* Email Signup Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: tokens.colors.background.secondary,
          borderRadius: '20px',
          alignSelf: 'flex-start',
          marginBottom: '24px',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="4" width="16" height="12" rx="2" stroke={tokens.colors.content.secondary} strokeWidth="1.5"/>
            <path d="M2 6L10 11L18 6" stroke={tokens.colors.content.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{
            fontSize: '14px',
            fontWeight: 500,
            color: tokens.colors.content.secondary,
            fontFamily: tokens.typography.fontFamily,
          }}>
            Signing up with Email
          </span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '32px',
            color: tokens.colors.content.primary,
            margin: '0 0 8px 0',
            fontFamily: tokens.typography.fontFamily,
          }}>
            Complete your profile
          </h1>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: tokens.colors.content.secondary,
            margin: 0,
            fontFamily: tokens.typography.fontFamily,
          }}>
            Tell us your name to personalize your experience.
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          <TextField
            label="First name"
            type="text"
            value={firstName}
            onChange={(v) => { setFirstName(v); if (firstNameError) setFirstNameError(''); }}
            placeholder="Jonas"
            error={!!firstNameError}
            helperText={firstNameError}
          />

          <TextField
            label="Last name"
            type="text"
            value={lastName}
            onChange={(v) => { setLastName(v); if (lastNameError) setLastNameError(''); }}
            placeholder="Schmidt"
            error={!!lastNameError}
            helperText={lastNameError}
          />

          {/* Commercial Seller */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="checkbox"
                id="commercial-seller-profile"
                checked={isCommercialSeller}
                onChange={(e) => {
                  setIsCommercialSeller(e.target.checked);
                  if (!e.target.checked) { setCompanyName(''); setCompanyNameError(''); }
                }}
                style={{ width: '20px', height: '20px', accentColor: tokens.colors.content.primary, cursor: 'pointer', margin: 0 }}
              />
              <label htmlFor="commercial-seller-profile" style={{
                fontSize: '16px', fontWeight: 400, lineHeight: '24px',
                color: tokens.colors.content.primary, fontFamily: tokens.typography.fontFamily, cursor: 'pointer',
              }}>
                I am a commercial seller
              </label>
            </div>
            {isCommercialSeller && (
              <TextField
                label="Company name"
                type="text"
                value={companyName}
                onChange={(v) => { setCompanyName(v); if (companyNameError) setCompanyNameError(''); }}
                placeholder="My Bike Shop GmbH"
                error={!!companyNameError}
                helperText={companyNameError}
              />
            )}
          </div>
        </div>

        <div style={{ flex: 1 }} />
      </div>

      {/* Bottom Actions */}
      <div style={{ padding: '16px 24px 34px' }}>
        <PrimaryButton
          label="Continue"
          iconRight
          onClick={handleContinue}
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

// Screen 1.1: Account Creation
const AccountCreationScreen = ({ onContinue, onBack, onLogin, onGoogleLogin, onAppleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Password must meet all criteria
  const isPasswordValid = (pwd) =>
    pwd.length >= 8 &&
    /\d/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /[A-Z]/.test(pwd);

  const isValid = email && password && isPasswordValid(password) && !emailError;

  const handleContinue = () => {
    const emailValid = validateEmail(email);
    if (emailValid && isPasswordValid(password)) {
      onContinue({ email, password });
    }
  };
  
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AppHeader onBack={onBack} />
      
      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '32px',
            color: tokens.colors.content.primary,
            margin: '0 0 8px 0',
            fontFamily: tokens.typography.fontFamily,
          }}>
            Create your account
          </h1>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: tokens.colors.content.secondary,
            margin: 0,
            fontFamily: tokens.typography.fontFamily,
          }}>
            Join thousands of cyclists buying and selling on buycycle.
          </p>
        </div>
        
        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(v) => { setEmail(v); if (emailError) validateEmail(v); }}
            placeholder="jonas@example.com"
            error={!!emailError}
            helperText={emailError}
          />

          <div>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder=""
            />
            <PasswordCriteria password={password} />
          </div>
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div style={{ padding: '16px 24px 34px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Terms text */}
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '21px',
          color: tokens.colors.content.secondary,
          margin: 0,
          textAlign: 'center',
          fontFamily: tokens.typography.fontFamily,
        }}>
          By continuing, you agree to the{' '}
          <TextLink label="Terms of Use" onClick={() => {}} /> and the{' '}
          <TextLink label="Privacy Policy" onClick={() => {}} />
        </p>

        <PrimaryButton
          label="Continue"
          iconRight
          onClick={handleContinue}
          disabled={!isValid}
        />

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: tokens.colors.border.tertiary }} />
          <span style={{
            fontSize: '14px',
            color: tokens.colors.content.tertiary,
            fontFamily: tokens.typography.fontFamily,
          }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: tokens.colors.border.tertiary }} />
        </div>
        
        {/* Social Login Buttons */}
        <button
          onClick={onGoogleLogin}
          style={{
            width: '100%',
            height: '48px',
            padding: '12px 16px',
            backgroundColor: tokens.colors.background.tertiary,
            border: `1px solid ${tokens.colors.border.secondary}`,
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M19.6 10.23c0-.68-.06-1.36-.17-2.02H10v3.83h5.38a4.6 4.6 0 01-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.33z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.58-4.12H1.08v2.58A9.99 9.99 0 0010 20z" fill="#34A853"/>
            <path d="M4.42 11.9a6.02 6.02 0 010-3.8V5.52H1.08a9.99 9.99 0 000 8.96l3.34-2.58z" fill="#FBBC05"/>
            <path d="M10 3.98c1.47 0 2.78.5 3.82 1.5l2.86-2.86A9.99 9.99 0 0010 0 9.99 9.99 0 001.08 5.52l3.34 2.58C5.2 5.74 7.4 3.98 10 3.98z" fill="#EA4335"/>
          </svg>
          <span style={{
            fontSize: '16px',
            fontWeight: 400,
            color: tokens.colors.content.primary,
          }}>Continue with Google</span>
        </button>
        
        <button
          onClick={onAppleLogin}
          style={{
            width: '100%',
            height: '48px',
            padding: '12px 16px',
            backgroundColor: tokens.colors.content.primary,
            border: 'none',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M14.94 10.28c-.02-2.17 1.77-3.21 1.85-3.26-1.01-1.47-2.58-1.67-3.14-1.7-1.33-.14-2.61.79-3.29.79-.68 0-1.72-.77-2.83-.75-1.45.02-2.79.85-3.54 2.15-1.51 2.63-.39 6.52 1.08 8.65.72 1.04 1.58 2.21 2.71 2.17 1.09-.04 1.5-.7 2.81-.7 1.31 0 1.68.7 2.82.68 1.17-.02 1.91-1.06 2.62-2.1.83-1.2 1.17-2.37 1.19-2.43-.03-.01-2.28-.87-2.3-3.47l.02-.03zM12.84 3.82c.6-.72.99-1.73.89-2.73-.86.03-1.9.57-2.52 1.3-.55.64-1.04 1.66-.91 2.64.96.07 1.94-.49 2.54-1.21z" fill={tokens.colors.content.reverse}/>
          </svg>
          <span style={{
            fontSize: '16px',
            fontWeight: 400,
            color: tokens.colors.content.reverse,
          }}>Continue with Apple</span>
        </button>
        
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '21px',
          color: tokens.colors.content.secondary,
          margin: 0,
          textAlign: 'center',
          fontFamily: tokens.typography.fontFamily,
        }}>
          Already have an account?{' '}
          <TextLink label="Log in" onClick={onLogin} />
        </p>
      </div>
    </div>
  );
};

// Screen 1.2: Email Verification - Code Entry
const EmailVerificationScreen = ({ email, onVerify, onBack, onResend, onWrongEmail }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);
  
  const handleComplete = async (fullCode) => {
    setIsVerifying(true);
    setError('');
    
    // Simulate API call - in real app, verify with backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo: any 6-digit code works, but "000000" shows error
    if (fullCode === '000000') {
      setError('Invalid code. Please try again.');
      setCode('');
      setIsVerifying(false);
    } else {
      onVerify(fullCode);
    }
  };
  
  const handleResend = async () => {
    setIsResending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsResending(false);
    setResendTimer(30);
    onResend?.();
  };
  
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AppHeader onBack={onBack} />
      
      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
        <ProgressIndicator currentStep={1} totalSteps={4} />
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '32px',
            color: tokens.colors.content.primary,
            margin: '0 0 8px 0',
            fontFamily: tokens.typography.fontFamily,
          }}>
            Check your inbox
          </h1>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: tokens.colors.content.secondary,
            margin: 0,
            fontFamily: tokens.typography.fontFamily,
          }}>
            We sent a 6-digit code to<br />
            <strong style={{ color: tokens.colors.content.primary }}>{email}</strong>
          </p>
        </div>
        
        {/* Code Input */}
        <div style={{ marginBottom: '24px' }}>
          <CodeInput
            value={code}
            onChange={setCode}
            error={error}
            onComplete={handleComplete}
            disabled={isVerifying}
          />
          {isVerifying && (
            <p style={{
              fontSize: '14px',
              color: tokens.colors.content.tertiary,
              textAlign: 'center',
              marginTop: '12px',
              fontFamily: tokens.typography.fontFamily,
            }}>
              Verifying...
            </p>
          )}
        </div>
        
        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          {resendTimer > 0 ? (
            <p style={{
              fontSize: '14px',
              color: tokens.colors.content.tertiary,
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
            }}>
              Resend code (available in 0:{resendTimer.toString().padStart(2, '0')})
            </p>
          ) : (
            <TextLink
              label={isResending ? 'Sending...' : 'Resend code'}
              onClick={handleResend}
              disabled={isResending}
            />
          )}
          <TextLink label="Wrong email? Go back" onClick={onWrongEmail} />
        </div>
        
        <div style={{ flex: 1 }} />
        
        {/* Info Box */}
        <InfoBox>
          Check spam folder if you don't see the email within 2 minutes.
        </InfoBox>
      </div>
    </div>
  );
};

// Screen 1.3: Phone Verification - Number Entry
const PhoneNumberScreen = ({ onSendCode, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+49');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const isValid = phoneNumber.length >= 6;
  
  const handleSendCode = async () => {
    if (!isValid) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
    
    onSendCode({ countryCode, phoneNumber });
  };
  
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AppHeader onBack={onBack} />
      
      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
        <ProgressIndicator currentStep={3} totalSteps={4} />

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '32px',
            color: tokens.colors.content.primary,
            margin: '0 0 8px 0',
            fontFamily: tokens.typography.fontFamily,
          }}>
            Verify your phone
          </h1>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: tokens.colors.content.secondary,
            margin: 0,
            fontFamily: tokens.typography.fontFamily,
          }}>
            We'll send a code via SMS to verify your number.
          </p>
        </div>
        
        {/* Phone Input */}
        <PhoneInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          countryCode={countryCode}
          onCountryCodeChange={setCountryCode}
          error={!!error}
          helperText={error}
        />
        
        {/* Info Box - with proper spacing from input */}
        <div style={{ marginTop: '24px' }}>
          <InfoBox>
            This keeps our marketplace safe for buyers and sellers.
          </InfoBox>
        </div>
        
        <div style={{ flex: 1 }} />
      </div>
      
      {/* Bottom Actions */}
      <div style={{ padding: '16px 24px 34px' }}>
        <PrimaryButton
          label="Send verification code"
          iconRight
          onClick={handleSendCode}
          disabled={!isValid}
          loading={isSending}
        />
      </div>
    </div>
  );
};

// Screen 1.4: Phone Verification - Code Entry
const PhoneCodeScreen = ({ phoneNumber, countryCode, onVerify, onBack, onResend, onChangeNumber }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Mask phone number for display
  const maskedPhone = `${countryCode} ${phoneNumber.slice(0, 3)} •••• ${phoneNumber.slice(-3)}`;
  
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);
  
  const handleComplete = async (fullCode) => {
    setIsVerifying(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo: any code works except "000000"
    if (fullCode === '000000') {
      setError('Invalid code. Please try again.');
      setCode('');
      setIsVerifying(false);
    } else {
      onVerify(fullCode);
    }
  };
  
  const handleResend = () => {
    setResendTimer(30);
    onResend?.();
  };
  
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AppHeader onBack={onBack} />
      
      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
        <ProgressIndicator currentStep={3} totalSteps={4} />

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '32px',
            color: tokens.colors.content.primary,
            margin: '0 0 8px 0',
            fontFamily: tokens.typography.fontFamily,
          }}>
            Enter the code
          </h1>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: tokens.colors.content.secondary,
            margin: 0,
            fontFamily: tokens.typography.fontFamily,
          }}>
            Sent via SMS to<br />
            <strong style={{ color: tokens.colors.content.primary }}>{maskedPhone}</strong>
          </p>
        </div>
        
        {/* Code Input */}
        <div style={{ marginBottom: '24px' }}>
          <CodeInput
            value={code}
            onChange={setCode}
            error={error}
            onComplete={handleComplete}
            disabled={isVerifying}
          />
          {isVerifying && (
            <p style={{
              fontSize: '14px',
              color: tokens.colors.content.tertiary,
              textAlign: 'center',
              marginTop: '12px',
              fontFamily: tokens.typography.fontFamily,
            }}>
              Verifying...
            </p>
          )}
        </div>
        
        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
          {resendTimer > 0 ? (
            <span style={{
              fontSize: '14px',
              color: tokens.colors.content.tertiary,
              fontFamily: tokens.typography.fontFamily,
            }}>
              Resend code ({resendTimer}s)
            </span>
          ) : (
            <TextLink label="Resend code" onClick={handleResend} />
          )}
          <span style={{ color: tokens.colors.content.tertiary }}>·</span>
          <TextLink label="Change number" onClick={onChangeNumber} />
        </div>
        
        {/* Info Box - with proper spacing */}
        <div style={{ marginTop: '24px' }}>
          <InfoBox>
            Didn't receive it?<br />
          • Check SMS isn't blocked<br />
          • Wait 1-2 minutes
        </InfoBox>
        </div>
        
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
};

// Screen: Acquisition Source - "How did you hear about us?"
const AcquisitionSourceScreen = ({ onComplete, onBack, onSkip }) => {
  const [source, setSource] = useState('');

  const handleContinue = () => {
    onComplete({ source: source.trim() });
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AppHeader onBack={onBack} />

      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
        <ProgressIndicator currentStep={4} totalSteps={4} />

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '32px',
            color: tokens.colors.content.primary,
            margin: '0 0 8px 0',
            fontFamily: tokens.typography.fontFamily,
          }}>
            How did you hear about us?
          </h1>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: tokens.colors.content.secondary,
            margin: 0,
            fontFamily: tokens.typography.fontFamily,
          }}>
            This helps us improve buycycle for everyone.
          </p>
        </div>

        {/* Input */}
        <TextField
          label="Your answer (optional)"
          type="text"
          value={source}
          onChange={setSource}
          placeholder="e.g. Google, friend recommendation, Instagram..."
        />

        <div style={{ flex: 1 }} />
      </div>

      {/* Bottom Actions */}
      <div style={{ padding: '16px 24px 34px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <PrimaryButton
          label="Continue"
          iconRight
          onClick={handleContinue}
          disabled={!source.trim()}
        />
        <SecondaryButton
          label="Skip"
          onClick={onSkip}
        />
      </div>
    </div>
  );
};

// Screen 1.5: Verification Complete
const VerificationCompleteScreen = ({ onBrowse, onCreateListing }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}>
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: tokens.colors.background.positive,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          transform: showAnimation ? 'scale(0)' : 'scale(1)',
          transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          <IconCheck />
        </div>
        
        {/* Text */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 700,
          lineHeight: '32px',
          color: tokens.colors.content.primary,
          margin: '0 0 8px 0',
          textAlign: 'center',
          fontFamily: tokens.typography.fontFamily,
        }}>
          You're all set!
        </h1>
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          color: tokens.colors.content.secondary,
          margin: 0,
          textAlign: 'center',
          fontFamily: tokens.typography.fontFamily,
        }}>
          Your account is verified and ready to use.
        </p>
      </div>
      
      {/* Bottom Actions */}
      <div style={{ padding: '16px 24px 34px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <PrimaryButton label="Start browsing" iconRight onClick={onBrowse} />
        <SecondaryButton label="Create your first listing" onClick={onCreateListing} />
      </div>
    </div>
  );
};

// Screen 2: Hard Block (Unverified User)
const HardBlockScreen = ({ emailVerified, phoneVerified, onContinue, onLogout }) => {
  const bothPending = !emailVerified && !phoneVerified;
  
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}>
        {/* Lock Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: tokens.colors.background.secondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}>
          <IconLock />
        </div>
        
        {/* Text */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 700,
          lineHeight: '32px',
          color: tokens.colors.content.primary,
          margin: '0 0 8px 0',
          textAlign: 'center',
          fontFamily: tokens.typography.fontFamily,
        }}>
          {bothPending ? 'Complete your account setup' : 'One more step'}
        </h1>
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          color: tokens.colors.content.secondary,
          margin: '0 0 24px 0',
          textAlign: 'center',
          fontFamily: tokens.typography.fontFamily,
        }}>
          {bothPending 
            ? 'To use buycycle, please verify your email and phone number.'
            : emailVerified 
              ? 'Verify your phone number to start using buycycle.'
              : 'Verify your email address to start using buycycle.'}
        </p>
        
        {/* Checklist */}
        <div style={{ width: '100%', maxWidth: '280px' }}>
          <ChecklistItem
            label="Email"
            completed={emailVerified}
            actionLabel={!emailVerified ? 'verify now' : undefined}
          />
          <ChecklistItem
            label="Phone"
            completed={phoneVerified}
            actionLabel={!phoneVerified ? 'verify now' : undefined}
          />
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <PrimaryButton
          label={emailVerified ? 'Verify phone' : phoneVerified ? 'Verify email' : 'Continue setup'}
          iconRight
          onClick={onContinue}
        />
        
        <div style={{
          width: '100%',
          height: '1px',
          backgroundColor: tokens.colors.border.tertiary,
        }} />
        
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '21px',
          color: tokens.colors.content.tertiary,
          margin: 0,
          textAlign: 'center',
          fontFamily: tokens.typography.fontFamily,
        }}>
          This keeps our marketplace safe for buyers and sellers.
        </p>
        
        <div style={{ textAlign: 'center' }}>
          <TextLink label="Log out" onClick={onLogout} />
        </div>
      </div>
      
      {/* Home Indicator Space */}
      <div style={{ height: '34px' }} />
    </div>
  );
};

// ==================== MAIN APP COMPONENT ====================
const BuycycleVerificationPrototype = () => {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    isCommercialSeller: false,
    companyName: '',
    countryCode: '+49',
    phoneNumber: '',
    emailVerified: false,
    phoneVerified: false,
    loginProvider: null, // 'email', 'google', or 'apple'
    acquisitionSource: null,
  });
  
  // Navigation helpers
  const goToScreen = (screen) => setCurrentScreen(screen);
  
  const handleAccountCreated = (data) => {
    setUserData(prev => ({ ...prev, ...data, loginProvider: 'email' }));
    goToScreen('emailVerification');
  };
  
  const handleGoogleLogin = () => {
    // Simulate Google OAuth - sometimes returns name, sometimes doesn't
    const hasName = Math.random() > 0.3; // 70% chance to have name
    setUserData(prev => ({ 
      ...prev, 
      email: 'jonas.schmidt@gmail.com',
      emailVerified: true,
      loginProvider: 'google',
      firstName: hasName ? 'Jonas' : '',
      lastName: hasName ? 'Schmidt' : '',
    }));
    goToScreen('socialName');
  };
  
  const handleAppleLogin = () => {
    // Simulate Apple Sign In - often hides email and name
    const hasName = Math.random() > 0.5; // 50% chance to have name
    setUserData(prev => ({ 
      ...prev, 
      email: 'jonas.s@privaterelay.appleid.com',
      emailVerified: true,
      loginProvider: 'apple',
      firstName: hasName ? 'Jonas' : '',
      lastName: hasName ? 'S.' : '',
    }));
    goToScreen('socialName');
  };
  
  const handleSocialNameComplete = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
    goToScreen('phoneNumber');
  };
  
  const handleEmailVerified = () => {
    setUserData(prev => ({ ...prev, emailVerified: true }));
    goToScreen('profileName');
  };

  const handleProfileNameComplete = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
    goToScreen('phoneNumber');
  };

  const handlePhoneCodeSent = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
    goToScreen('phoneCode');
  };
  
  const handlePhoneVerified = () => {
    setUserData(prev => ({ ...prev, phoneVerified: true }));
    goToScreen('acquisitionSource');
  };

  const handleAcquisitionComplete = (data) => {
    setUserData(prev => ({ ...prev, acquisitionSource: data.source }));
    goToScreen('complete');
  };

  const handleSkipAcquisition = () => {
    goToScreen('complete');
  };
  
  const resetFlow = () => {
    setUserData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      isCommercialSeller: false,
      companyName: '',
      countryCode: '+49',
      phoneNumber: '',
      emailVerified: false,
      phoneVerified: false,
      loginProvider: null,
      acquisitionSource: null,
    });
    goToScreen('menu');
  };
  
  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              flex: 1, 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              {/* Logo */}
              <div style={{ 
                marginBottom: '32px',
                textAlign: 'center',
              }}>
                <h1 style={{
                  fontSize: '30px',
                  fontWeight: 700,
                  color: tokens.colors.content.primary,
                  fontFamily: tokens.typography.fontFamily,
                  letterSpacing: '-0.5px',
                  margin: 0,
                }}>
                  buycycle
                </h1>
                <p style={{
                  fontSize: '14px',
                  color: tokens.colors.content.tertiary,
                  marginTop: '8px',
                  fontFamily: tokens.typography.fontFamily,
                }}>
                  Verification Flow Prototype
                </p>
              </div>
              
              {/* Flow Selection */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: tokens.colors.content.tertiary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px',
                  fontFamily: tokens.typography.fontFamily,
                }}>
                  Select a flow to test
                </p>
                
                <PrimaryButton
                  label="New User Signup"
                  onClick={() => goToScreen('accountCreation')}
                />
                
                <SecondaryButton
                  label="Google Sign-In"
                  onClick={() => {
                    setUserData(prev => ({ 
                      ...prev, 
                      email: 'jonas.schmidt@gmail.com',
                      emailVerified: true,
                      loginProvider: 'google',
                      firstName: 'Jonas',
                      lastName: 'Schmidt',
                    }));
                    goToScreen('socialName');
                  }}
                />
                
                <SecondaryButton
                  label="Apple Sign-In (No Name)"
                  onClick={() => {
                    setUserData(prev => ({ 
                      ...prev, 
                      email: 'jonas.s@privaterelay.appleid.com',
                      emailVerified: true,
                      loginProvider: 'apple',
                      firstName: '',
                      lastName: '',
                    }));
                    goToScreen('socialName');
                  }}
                />
                
                <SecondaryButton
                  label="Hard Block (Both Pending)"
                  onClick={() => {
                    setUserData(prev => ({ ...prev, emailVerified: false, phoneVerified: false }));
                    goToScreen('hardBlock');
                  }}
                />
                
                <SecondaryButton
                  label="Hard Block (Email Done)"
                  onClick={() => {
                    setUserData(prev => ({ ...prev, emailVerified: true, phoneVerified: false }));
                    goToScreen('hardBlock');
                  }}
                />
                
              </div>
              
              {/* Instructions */}
              <div style={{
                marginTop: '32px',
                padding: '16px',
                backgroundColor: tokens.colors.background.information,
                borderRadius: '8px',
              }}>
                <p style={{
                  fontSize: '14px',
                  color: tokens.colors.content.information,
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  lineHeight: '21px',
                }}>
                  <strong>Testing Tips:</strong><br />
                  • Enter any 6-digit code to verify<br />
                  • Enter "000000" to see error state<br />
                  • Google: pre-fills name from account<br />
                  • Apple: often no name (user fills in)
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'accountCreation':
        return (
          <AccountCreationScreen
            onContinue={handleAccountCreated}
            onBack={() => goToScreen('menu')}
            onLogin={() => goToScreen('menu')}
            onGoogleLogin={handleGoogleLogin}
            onAppleLogin={handleAppleLogin}
          />
        );
        
      case 'socialName':
        return (
          <SocialNameScreen
            provider={userData.loginProvider}
            prefillData={{ firstName: userData.firstName, lastName: userData.lastName }}
            onContinue={handleSocialNameComplete}
            onBack={() => {
              // Reset social login state and go back to account creation
              setUserData(prev => ({ 
                ...prev, 
                emailVerified: false, 
                loginProvider: null,
                firstName: '',
                lastName: '',
              }));
              goToScreen('accountCreation');
            }}
          />
        );
        
      case 'emailVerification':
        return (
          <EmailVerificationScreen
            email={userData.email || 'jonas@example.com'}
            onVerify={handleEmailVerified}
            onBack={() => goToScreen('accountCreation')}
            onResend={() => console.log('Resending email...')}
            onWrongEmail={() => goToScreen('accountCreation')}
          />
        );

      case 'profileName':
        return (
          <ProfileNameScreen
            onContinue={handleProfileNameComplete}
            onBack={() => goToScreen('emailVerification')}
          />
        );

      case 'phoneNumber':
        return (
          <PhoneNumberScreen
            onSendCode={handlePhoneCodeSent}
            onBack={() => {
              // If email is already verified, go to hard block instead of email verification
              if (userData.emailVerified) {
                goToScreen('hardBlock');
              } else {
                goToScreen('emailVerification');
              }
            }}
          />
        );
        
      case 'phoneCode':
        return (
          <PhoneCodeScreen
            phoneNumber={userData.phoneNumber || '1701234567'}
            countryCode={userData.countryCode}
            onVerify={handlePhoneVerified}
            onBack={() => goToScreen('phoneNumber')}
            onResend={() => console.log('Resending SMS...')}
            onChangeNumber={() => goToScreen('phoneNumber')}
          />
        );
        
      case 'acquisitionSource':
        return (
          <AcquisitionSourceScreen
            onComplete={handleAcquisitionComplete}
            onBack={() => goToScreen('phoneCode')}
            onSkip={handleSkipAcquisition}
          />
        );

      case 'complete':
        return (
          <VerificationCompleteScreen
            onBrowse={resetFlow}
            onCreateListing={resetFlow}
          />
        );
        
      case 'hardBlock':
        return (
          <HardBlockScreen
            emailVerified={userData.emailVerified}
            phoneVerified={userData.phoneVerified}
            onContinue={() => {
              if (!userData.emailVerified) {
                setUserData(prev => ({ ...prev, email: 'blocked@example.com' }));
                goToScreen('emailVerification');
              } else if (!userData.phoneVerified) {
                goToScreen('phoneNumber');
              }
            }}
            onLogout={resetFlow}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: tokens.typography.fontFamily,
    }}>
      {/* CSS Keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        * {
          box-sizing: border-box;
        }

        input::placeholder {
          color: ${tokens.colors.content.quaternary};
        }

        button:hover:not(:disabled) {
          opacity: 0.9;
        }

        button:active:not(:disabled) {
          transform: scale(0.98);
        }

        /* Focus visible states for accessibility */
        button:focus-visible {
          outline: 2px solid ${tokens.colors.content.primary};
          outline-offset: 2px;
        }

        input:focus-visible {
          outline: none;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      <IPhoneFrame>
        {renderScreen()}
      </IPhoneFrame>
    </div>
  );
};

export default BuycycleVerificationPrototype;
