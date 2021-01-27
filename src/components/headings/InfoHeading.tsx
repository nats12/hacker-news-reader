import React, { ReactNode } from "react";
import styled from "styled-components";

const InfoHeadingContainer = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.colour ?? "black"};
`;
interface IInfoHeading {
  props?: { children?: ReactNode };
  context?: any;
  colour?: string;
}

/**
 * InfoHeading
 * A styled h1
 * @param props
 */
const InfoHeading: React.FC<IInfoHeading> = (props) => {
  return (
    <InfoHeadingContainer colour={props.colour}>
      <h1>{props.children}</h1>
    </InfoHeadingContainer>
  );
};

export default InfoHeading;
