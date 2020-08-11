import React, { FC } from "react";
import Icon from "../icon/icon";
import { IUploadFile } from "./upload";
import Progress from "../Progress";

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
          <span className="file-status">
            {item.status === "uploading" && (
              <Icon icon="spinner" theme="primary" spin />
            )}
            {item.status === "success" && (
              <Icon icon="check-circle" theme="success" />
            )}
            {item.status === "error" && (
              <Icon icon="times-circle" theme="danger" />
            )}
          </span>
          <span className="file-actions">
            <Icon icon="times" onClick={() => onRemove(item)} />
          </span>
          {item.status === "uploading" && (
            <Progress percentage={item.percent || 0} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default UploadList;
