import React, { ReactElement } from "react";
import styled from "styled-components";
import { colours } from "../theme/colours";
import { devices } from "../theme/devices";

const HeaderContainer = styled.header`
  min-height: 80px;
  width: 100%;
  padding: 40px 15px;
  text-align: left;
  background-color: ${colours.orange};
  color: ${colours.dark_grey};
  box-sizing: border-box;

  @media ${devices.laptop} {
    padding: 40px 200px;
  }
`;
const HeaderTitle = styled.h1`
  margin: 0;
`;

const StrapLine = styled.small`
  font-style: italic;
  color: black;
  font-size: 0.9em;
`;
/**
 * Header
 *
 * Displays the web app's header containing its title and strapline
 *
 * @returns {ReactElement} HeaderContainer
 */
const Header: React.ElementType = (): ReactElement => {
  return (
    <HeaderContainer>
      <HeaderTitle>Hacker News Reader</HeaderTitle>
      <StrapLine>You heard it here first.</StrapLine>
    </HeaderContainer>
  );
};

export default Header;
