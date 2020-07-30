import React, { FC, useState, ChangeEvent } from "react";
import Input, { InputProps } from "../Input/input";

export interface IAutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestion: (word: string) => string[];
  onSelect?: (item: string) => void;
  initValue?: string;
}

export const AutoComplete: FC<IAutoCompleteProps> = (props) => {
  const { fetchSuggestion, onSelect, initValue, ...restProps } = props;

  const [input, setInput] = useState(initValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  console.log("suggestions", suggestions);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);

    if (value) {
      const result = fetchSuggestion(value);
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: string) => {
    setInput(item);
    setSuggestions([]);

    if (onSelect) {
      onSelect(item);
    }
  };

  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="stars-auto-complete">
      <Input value={input} onChange={handleChange} {...restProps} />
      {suggestions && generateDropDown()}
    </div>
  );
};

export default AutoComplete;
