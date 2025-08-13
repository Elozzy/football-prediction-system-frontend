import React from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by team name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-green-300"
    />
  );
};

export default SearchBox;
