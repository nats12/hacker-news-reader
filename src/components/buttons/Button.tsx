import styled from "styled-components";

interface IButton {
  colour?: string;
  backgroundColour?: string;
  border?: string;
}

export const Button = styled.button<IButton>`
  color: ${(props) => props.colour ?? "white"};
  background-color: ${(props) => props.backgroundColour ?? "transparent"};
  border: ${(props) => props.border ?? "none"};

  &:hover {
    text-decoration: underline;
  }
`;
