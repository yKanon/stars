import React, { FC, useRef, ChangeEvent, useState } from "react";
import axios from "axios";
import Button from "../Button/button";
import UploadList from "./uploadList";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface IUploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface IUploadProps {
  action: string;
  defaultFileList?: IUploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: IUploadFile) => void;
  onSuccess?: (data: any, file: IUploadFile) => void;
  onError?: (err: any, file: IUploadFile) => void;
  onChange?: (file: IUploadFile) => void;
  onRemove?: (file: IUploadFile) => void;
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
}

export const Upload: FC<IUploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<IUploadFile[]>(
    defaultFileList || []
  );
  const updateFileList = (
    updateFile: IUploadFile,
    updateObj: Partial<IUploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);

    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleRemove = (file: IUploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });

    if (onRemove) {
      onRemove(file);
    }
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(file);
          });
        } else if (!!result) {
          post(file);
        }
      }
    });
  };

  const post = (file: File) => {
    const formData = new FormData();
    const _file: IUploadFile = {
      uid: `${Date.now()}upload-file`,
      name: file.name,
      size: file.size,
      percent: 0,
      status: `ready`,
      raw: file,
    };
    // setFileList([_file, ...fileList]);
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e: ProgressEvent) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;

          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });

            if (onProgress) {
              onProgress(percentage, _file);
            }
          }
        },
      })
      .then((res) => {
        console.log(res);
        updateFileList(_file, { status: "success", response: res.data });
        if (onSuccess) {
          onSuccess(res.data, _file);
        }

        if (onChange) {
          onChange(_file);
        }
      })
      .catch((err) => {
        console.error(err);
        updateFileList(_file, { status: "error", error: err });

        if (onError) {
          onError(err, _file);
        }

        if (onChange) {
          onChange(_file);
        }
      });
  };

  return (
    <div className="stars-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input
        className="stars-file-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
        type="file"
        ref={fileInput}
        accept={accept}
        multiple={multiple}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
};

export default Upload;
