
import React from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <label className="block text-white font-semibold mb-2 flex items-center space-x-2">
        <span className="text-xl">🔍</span>
        <span>Search Teams</span>
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Search by team name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-3 pl-12 rounded-xl shadow-lg focus:ring-4 focus:ring-green-400/50 focus:border-green-400 transition-all duration-200 placeholder-white/50"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <span className="text-white/70 text-lg">🔍</span>
        </div>
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/70 hover:text-white transition-colors"
          >
            <span className="text-lg">✕</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
