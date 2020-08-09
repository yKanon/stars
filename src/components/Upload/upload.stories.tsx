import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload from "./upload";

const defaultUpload = () => (
  <div>
    <Upload
      action="http://jsonplaceholder.typicode.com/posts"
      onProgress={action("progress")}
      onSuccess={action("success")}
      onError={action("error")}
    ></Upload>
  </div>
);

storiesOf("Upload", module).add("默认", defaultUpload);
