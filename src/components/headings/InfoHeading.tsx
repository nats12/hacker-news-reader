import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const InfoHeadingContainer = styled.div<IInfoHeading>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.colour ?? "black"};
`;

interface IInfoHeading {
  props?: { children?: ReactNode };
  children: ReactElement;
  context?: any;
  colour?: string;
}

/**
 * InfoHeading
 *
 * Dynamic and resuable styled h1 header to display information.
 *
 * @param {IInfoHeading} props
 * @returns {ReactElement} InfoHeadingContainer
 */
const InfoHeading: React.ElementType = (props: IInfoHeading): ReactElement => {
  return (
    <InfoHeadingContainer colour={props.colour}>
      <h1>{props.children}</h1>
    </InfoHeadingContainer>
  );
};

export default InfoHeading;
