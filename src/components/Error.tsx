import React, { ReactNode } from "react";

interface IError {
  props?: { children?: ReactNode };
  context?: any;
}

const ErrorComponent: React.FC<IError> = (props) => {
  return <h1>{props.children}</h1>;
};

export default ErrorComponent;
