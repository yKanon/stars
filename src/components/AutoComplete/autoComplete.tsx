import React, {
  useEffect,
  FC,
  useState,
  useRef,
  ChangeEvent,
  ReactElement,
  KeyboardEvent,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../icon/icon";
import classNames from "classnames";
import Transition from "../Transition/transition";

import useDebounce from "../hooks/useDebounce";
import useClickOutside from "../hooks/useClickOutside";

// import { GithubUserProps } from "./autoComplete.stories";
interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

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

  const [input, setInput] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLElement>(null);

  const debounceValue = useDebounce(input, 500);
  const componentRef = useRef<HTMLDivElement>(null);

  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const result = fetchSuggestion(debounceValue);

      if (result instanceof Promise) {
        setLoading(true);
        result.then((data) => {
          setSuggestions(data);
          setLoading(false);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(result);
        if (result.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }

    setHighlightIndex(-1);
  }, [debounceValue, fetchSuggestion]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);
    triggerSearch.current = true;
  };

  const handleSelect = (item: DataSourceType) => {
    setInput(item.value);
    setShowDropdown(false);
    triggerSearch.current = false;

    if (onSelect) {
      onSelect(item);
    }
  };

  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }

    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }

    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestions) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      // 上
      case 38:
        highlight(highlightIndex - 1);
        break;
      // 下
      case 40:
        highlight(highlightIndex + 1);
        break;
      // 与 Vimium 插件冲突。esc 事件被插件拦截。请关闭该插件或者在无痕模式下查看
      case 27:
        setShowDropdown(false);
        break;

      default:
        break;
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropDown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        timeout={300}
        animation="zoom-in-top"
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <div className="suggestion-list">
          {loading && (
            <ul className="loading-icon">
              <Icon icon="spinner" spin />
            </ul>
          )}
          {suggestions.map((suggestion, index) => {
            // console.log("suggestion", suggestion);
            const cnames = classNames("suggestion-item", {
              "item-highlighted": index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(suggestion)}
              >
                {renderTemplate(suggestion)}
              </li>
            );
          })}
        </div>
      </Transition>
    );
  };

  return (
    <div className="stars-auto-complete" ref={componentRef}>
      <Input
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />

      {generateDropDown()}
    </div>
  );
};

export default AutoComplete;
