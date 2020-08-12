import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

interface IDraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<IDraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classnames = classNames(`stars-uploader-dragger`, {
    "is-dragOver": dragOver,
  });

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };

  return (
    <div
      className={classnames}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
