import React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import Upload from "./upload";

// eslint-disable-next-line
const checkFileSize = (file: File): boolean => {
  if (file.size / 1024 > 50) {
    alert(`file is too big`);
    return false;
  }
  return true;
};

// eslint-disable-next-line
const filePromise = (file: File) => {
  const newFile = new File([file], file.name, { type: file.type });
  return Promise.resolve(newFile);
};

const defaultUpload = () => (
  <div>
    <Upload action="https://jsonplaceholder.typicode.com/posts"></Upload>
  </div>
);

storiesOf("Upload", module).add("默认", defaultUpload);
