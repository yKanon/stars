import React, { FC } from "react";
import Icon from "../icon/icon";
import { IUploadFile } from "./upload";

interface IUploadFileList {
  fileList: IUploadFile[];
  onRemove: (file: IUploadFile) => void;
}

export const UploadList: FC<IUploadFileList> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="stars-upload-list">
      {fileList.map((item) => (
        <li className="stars-upload-list-item" key={item.uid}>
          <span className={`file-name file-name-${item.status}`}>
            <Icon icon="file-alt" theme="secondary"></Icon>
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default UploadList;
