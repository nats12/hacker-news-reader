import React from "react";
import styled from "styled-components";
import { colours } from "../theme/colours";

const HeaderContainer = styled.header`
  height: 80px;
  width: 100%;
  padding: 40px 0;
  text-align: center;
  background-color: ${colours.orange};
`;
const HeaderTitle = styled.h1`
  margin: 0;
`;

/**
 * Header component - displaying the header
 */
const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Hacker News Reader</HeaderTitle>
      <small>You heard it here first.</small>
    </HeaderContainer>
  );
};

export default Header;
