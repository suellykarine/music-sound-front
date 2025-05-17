import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary";
}

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  background: ${({ variant }) =>
    variant === "primary"
      ? "linear-gradient(45deg, #00dbde, #fc00ff)"
      : "#333"};
  color: white;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;
