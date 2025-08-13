
import React from "react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <label className="block text-white font-semibold mb-2 flex items-center space-x-2">
        <span className="text-xl">📅</span>
        <span>Select Date</span>
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-3 rounded-xl shadow-lg focus:ring-4 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-200 placeholder-white/50"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-white/70 text-lg">📅</span>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
