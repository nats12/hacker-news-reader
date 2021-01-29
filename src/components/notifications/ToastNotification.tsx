import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { colours } from "../../theme/colours";
import { devices } from "../../theme/devices";

const Toast = styled.div<IToast>`
  background: ${colours.info_blue};
  color: white;
  position: absolute;
  bottom: ${(props) => props.position?.bottom ?? "inherit"};
  top: ${(props) => props.position?.top ?? "inherit"};
  z-index: 5000;
  width: 95%;
  max-width: 500px;
  max-height: 80px;
  padding: 15px;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  visibility: hidden;
  position: ${(props) => (props.fixed ? "fixed" : "auto")};
  bottom: ${(props) => (props.fixed ? "30px" : "auto")};
  z-index: 9999;

  @media ${devices.laptop} {
    width: 30%;
    left: 20px;
  }
`;

const ToastNotificationContainer = styled.div<IToast>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${Toast} {
    visibility: ${(props) => (props.remainInView ? "visible" : "hidden")};
    opacity: ${(props) => (props.remainInView ? 1 : 0)};
    animation: ${(props) => (props.fadeOut ? "fadeOut ease-in 4s" : "none")};
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      visibility: visible;
      overflow: hidden;
    }
    40% {
      opacity: 1;
      visibility: visible;
      overflow: hidden;
    }
    80% {
      opacity: 1;
      visibility: visible;
      overflow: hidden;
    }
    100% {
      opacity: 0;
      visibility: hidden;
      overflow: hidden;
    }
  }
`;

interface IToast {
  props?: { children?: ReactNode };
  children: ReactElement;
  context?: any;
  colour?: string;
  className?: string;
  position: { bottom?: string | number; top?: string | number };
  fadeOut: boolean;
  remainInView: boolean;
  fixed: boolean;
}
/**
 * ToastNotification
 *
 * Toast notification used to alert the user about certain conditions.
 *
 * @param {IToast} props
 * @returns {ReactElement} ToastNotificationContainer
 */
const ToastNotification: React.ElementType = (props: IToast): ReactElement => {
  return (
    <ToastNotificationContainer {...props}>
      <Toast {...props}>{props.children}</Toast>
    </ToastNotificationContainer>
  );
};

export default ToastNotification;
