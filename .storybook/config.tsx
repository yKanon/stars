import React from "react";
import { configure, addDecorator } from "@storybook/react";
import "../src/styles/index.scss";

configure(require.context("../src", true, /\.stories\.tsx/), module);
