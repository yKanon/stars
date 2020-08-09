import React, { FC, useRef, ChangeEvent } from "react";
import axios from "axios";
import Button from "../Button/button";

interface IUploadProps {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
}

const Upload: FC<IUploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError } = props;
  const fileInput = useRef<HTMLInputElement>(null);

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

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      const formData = new FormData();
      formData.append(file.name, file);
      axios
        .post(action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress(e) {
            let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100) {
              if (onProgress) {
                onProgress(percentage, file);
              }
            }
          },
        })
        .then((res) => {
          console.log(res);

          if (onSuccess) {
            onSuccess(res.data, file);
          }
        })
        .catch((err) => {
          console.error(err);

          if (onError) {
            onError(err, file);
          }
        });
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
    </div>
  );
};

export default Upload;
