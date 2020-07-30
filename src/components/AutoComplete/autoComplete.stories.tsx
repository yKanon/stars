import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AutoComplete, DataSourceType } from "./autoComplete";

interface IOptionProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

// const owWithNumber = [
//   { value: "美", number: 11 },
//   { value: "麦爹", number: 1 },
//   { value: "法鸡", number: 4 },
//   { value: "安娜", number: 2 },
//   { value: "巴蒂", number: 15 },
//   { value: "毛妹", number: 23 },
//   { value: "老鼠", number: 3 },
//   { value: "源氏", number: 14 },
//   { value: "死神", number: 39 },
//   { value: "大锤", number: 12 },
//   { value: "西格玛", number: 30 },
//   { value: "天使姐姐", number: 42 },
// ];

const SimpleComplete = () => {
  // const ow = [
  //   "美",
  //   "麦爹",
  //   "法鸡",
  //   "安娜",
  //   "巴蒂",
  //   "毛妹",
  //   "老鼠",
  //   "源氏",
  //   "死神",
  //   "大锤",
  //   "西格玛",
  //   "天使姐姐",
  // ];

  // const fetchSuggestion = (query: string) => {
  //   return ow
  //     .filter((item) => item.includes(query))
  //     .map((item) => ({
  //       value: item,
  //     }));
  // };

  // const fetchSuggestion = (query: string) => {
  //   return owWithNumber.filter((item) => item.value.includes(query));
  // };

  // const renderOption = (item: DataSourceType<IOptionProps>) => (
  //   <>
  //     <h2>Name: {item.value}</h2>
  //     <p>Number: {item.number}</p>
  //   </>
  // );

  const fetchSuggestion = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        const formatItems = items.slice(0, 10).map((item) => ({
          value: item.login,
          ...item,
        }));
        return formatItems;
      });
  };

  const renderOption = (item: DataSourceType<GithubUserProps>) => (
    <>
      <h2>Name: {item.login}</h2>
      <p>Number: {item.url}</p>
    </>
  );

  return (
    <AutoComplete
      fetchSuggestion={fetchSuggestion}
      onSelect={action("selected")}
      // TODO ts2322 接口类型错误？
      renderOption={renderOption}
    ></AutoComplete>
  );
};

storiesOf("AutoComplete", module).add("默认", SimpleComplete);
