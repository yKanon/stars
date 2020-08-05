import React, { FC, useState, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../icon/icon";

// import { GithubUserProps } from "./autoComplete.stories";
interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;
// type DataSource<T> = T;

// interface IRenderOption {
//   <T>(item: DataSourceType): ReactElement;
// }

export interface IAutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestion: (
    query: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<IAutoCompleteProps> = (props) => {
  const {
    fetchSuggestion,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [input, setInput] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);

    if (value) {
      const result = fetchSuggestion(value);

      if (result instanceof Promise) {
        setLoading(true);
        result.then((data) => {
          setSuggestions(data);
          setLoading(false);
        });
      } else {
        setSuggestions(result);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: DataSourceType) => {
    setInput(item.value);
    setSuggestions([]);

    if (onSelect) {
      onSelect(item);
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelect(suggestion)}>
            {renderTemplate(suggestion)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="stars-auto-complete">
      <Input value={input} onChange={handleChange} {...restProps} />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {suggestions && generateDropDown()}
    </div>
  );
};

export default AutoComplete;
