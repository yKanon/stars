import React, {
  useEffect,
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  KeyboardEvent,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../icon/icon";
import useDebounce from "../hooks/useDebounce";
import classNames from "classnames";

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

  const [input, setInput] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  // // const [focus, setFocus] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const debounceValue = useDebounce(input, 500);
  useEffect(() => {
    if (debounceValue) {
      const result = fetchSuggestion(debounceValue);

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

    setHighlightIndex(-1);
  }, [debounceValue, fetchSuggestion]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);
  };

  const handleSelect = (item: DataSourceType) => {
    setInput(item.value);
    setSuggestions([]);

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
    console.log(e);
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
      // TODO esc 在 input 框中按 esc 会退出 input 聚焦，无法触发 handleKeydown 事件
      // 目前似乎没有解决方案。在百度、谷歌中也存在这个问题
      // 可能时系统的原因。mac 系统似乎是可以又这个功能
      case 27:
        setSuggestions([]);
        console.log(1);

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
      <ul>
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
      </ul>
    );
  };

  return (
    <div className="stars-auto-complete">
      <Input
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
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
