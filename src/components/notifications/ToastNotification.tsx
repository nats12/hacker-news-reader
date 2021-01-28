import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { colours } from "../../theme/colours";

const Toast = styled.div<IToast>`
  background: ${colours.info_blue};
  color: white;
  position: absolute;
  bottom: ${(props) => props.position.bottom ?? "inherit"};
  top: ${(props) => props.position.top ?? "inherit"};
  z-index: 5000;
  width: 95%;
  padding: 15px;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  visibility: hidden;
`;

const ToastNotificationContainer = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${Toast} {
    visibility: hidden;
    opacity: 0;
    animation: autoHide ease-in 4s;
  }

  @keyframes autoHide {
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
    <ToastNotificationContainer>
      <Toast {...props}>{props.children}</Toast>
    </ToastNotificationContainer>
  );
};

export default ToastNotification;
