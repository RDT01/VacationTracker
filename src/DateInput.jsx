import React from 'react';

/**
 * Native HTML5 date input. Uses YYYY-MM-DD string for value/onChange.
 * Simple, accessible, familiar UX on all devices.
 */
export default function DateInput({ value, onChange, minDate, maxDate, defaultMonth, className = '', ...props }) {
  return (
    <input
      type="date"
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value || '')}
      min={minDate || undefined}
      max={maxDate || undefined}
      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
      {...props}
    />
  );
}
