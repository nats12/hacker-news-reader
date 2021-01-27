import React, { ReactNode } from "react";
import styled from "styled-components";
import { colours } from "../../theme/colours";

const ToastNotificationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Toast = styled.div`
  background: ${colours.info_blue};
  color: white;
  position: absolute;
  bottom: 20px;
  z-index: 5000;
  width: 95%;
  padding: 15px;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

interface IToast {
  props?: { children?: ReactNode };
  context?: any;
  colour?: string;
}

const ToastNotification: React.ElementType<IToast> = (props) => {
  return (
    <ToastNotificationContainer>
      <Toast>{props.children}</Toast>
    </ToastNotificationContainer>
  );
};

export default ToastNotification;
