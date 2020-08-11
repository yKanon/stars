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
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: IUploadFile) => void;
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
    setFileList([_file, ...fileList]);
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e: ProgressEvent) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;

          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });

            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        console.log(res);
        updateFileList(_file, { status: "success", response: res.data });
        if (onSuccess) {
          onSuccess(res.data, file);
        }

        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        console.error(err);
        updateFileList(_file, { status: "error", error: err });

        if (onError) {
          onError(err, file);
        }

        if (onChange) {
          onChange(file);
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
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
