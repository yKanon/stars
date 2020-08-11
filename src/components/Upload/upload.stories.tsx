import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload, { IUploadFile } from "./upload";

const defaultFileList: IUploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "abc.md", status: "error", percent: 30 },
];

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
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      defaultFileList={defaultFileList}
      onRemove={action("removed")}
    ></Upload>
  </div>
);

storiesOf("Upload", module).add("默认", defaultUpload);
