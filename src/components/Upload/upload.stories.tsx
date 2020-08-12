import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload, { IUploadFile } from "./upload";

// const defaultFileList: IUploadFile[] = [
//   {
//     uid: "123",
//     size: 1234,
//     name: "hello.md",
//     status: "uploading",
//     percent: 30,
//   },
//   { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
//   { uid: "121", size: 1234, name: "abc.md", status: "error", percent: 30 },
// ];

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
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("changed")}
      onRemove={action("removed")}
      name="fileName"
      data={{ key: "value" }}
      headers={{ "X-Powered-By": "stars" }}
      accept=".jpg"
      multiple
    ></Upload>
  </div>
);

storiesOf("Upload", module).add("默认", defaultUpload);
