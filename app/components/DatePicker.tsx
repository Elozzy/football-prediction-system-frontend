import React from "react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
    />
  );
};

export default DatePicker;
