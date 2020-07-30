import React from "react";
import { storiesOf } from "@storybook/react";
import AutoComplete from "./autoComplete";
import { action } from "@storybook/addon-actions";

const SimpleComplete = () => {
  const ow = [
    "美",
    "麦爹",
    "法鸡",
    "安娜",
    "巴蒂",
    "毛妹",
    "老鼠",
    "源氏",
    "死神",
    "大锤",
    "西格玛",
    "天使姐姐",
  ];

  const fetchSuggestion = (query: string) => {
    return ow.filter((item) => item.includes(query));
  };

  return (
    <AutoComplete
      fetchSuggestion={fetchSuggestion}
      onSelect={action("selected")}
    ></AutoComplete>
  );
};

storiesOf("AutoComplete", module).add("默认", SimpleComplete);
