import React from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

/**
 * Date input using react-date-picker. Uses YYYY-MM-DD string for value/onChange.
 * defaultMonth: when value is empty, calendar opens showing this month (YYYY-MM-DD string)
 */
export default function DateInput({ value, onChange, minDate, maxDate, defaultMonth, className = '', ...props }) {
  const dateValue = value ? new Date(value + 'T12:00:00') : null;
  const min = minDate ? new Date(minDate + 'T12:00:00') : undefined;
  const max = maxDate ? new Date(maxDate + 'T12:00:00') : undefined;
  const defaultActiveStart = (defaultMonth || minDate) ? new Date((defaultMonth || minDate) + 'T12:00:00') : undefined;

  const handleChange = (d) => {
    if (!d) {
      onChange?.('');
      return;
    }
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onChange?.(`${y}-${m}-${day}`);
  };

  return (
    <DatePicker
      value={dateValue}
      onChange={handleChange}
      minDate={min}
      maxDate={max}
      format="MMM d, yyyy"
      clearIcon={null}
      calendarIcon={<CalendarIcon />}
      className={`date-input-wrapper ${className}`}
      calendarClassName="date-input-calendar"
      portalContainer={typeof document !== 'undefined' ? document.body : undefined}
      calendarProps={defaultActiveStart ? { defaultActiveStartDate: defaultActiveStart } : undefined}
      {...props}
    />
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
