import React, { FC, ReactNode } from "react";
import ErrorComponent from "./Error";

const WithError: any = (Component: React.ElementType) => {
  return function WithErrorComponent({ items, ...props }) {
    if (!items || items.length === 0) return <Component {...props} />;
    return <ErrorComponent>Error!</ErrorComponent>;
  };
};

export default WithError;
