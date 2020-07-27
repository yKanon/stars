import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonType, ButtonSize } from "./button";

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "custom",
};

const defaultProps = {
  onClick: jest.fn(),
};

const disabledProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test button component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>按钮</Button>);
    const element = wrapper.queryByText("按钮") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render the correct component based on different props", () => {
    const wrapper = render(<Button {...testProps}>按钮</Button>);
    const element = wrapper.getByText("按钮");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-primary btn-lg");
  });
  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(
      <Button btnType="link" href="http://www.baidu.com">
        Link
      </Button>
    );
    const element = wrapper.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });
  it('should render disabled button when attribute "disabled" is setted true', () => {
    const wrapper = render(<Button {...disabledProps}>按钮</Button>);
    const element = wrapper.getByText("按钮") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
  it('should render disabled link-button when attribute "disabled" is setted to true and attribute "href" exits', () => {
    const wrapper = render(
      <Button btnType="link" href="http://www.baidu.com" {...disabledProps}>
        hi
      </Button>
    );
    const element = wrapper.getByText("hi") as HTMLAnchorElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-link disabled");
    expect(element).not.toHaveAttribute("href");
    // TODO link button has class .disabled, has css `pointer-events: none;`.It should prevent callback be called.
    // fireEvent.click(element)
    // expect(disabledProps.onClick).not.toHaveBeenCalled()
  });
});
