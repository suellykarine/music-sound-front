import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
`;

export const Content = styled.div`
  max-width: 800px;
  padding: 20px;
`;

export const Logo = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Illustration = styled.div`
  width: 300px;
  margin: 20px auto;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

export const Button = styled.button`
  padding: 12px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1em;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

export const LoginButton = styled(Button)`
  background-color: #00dbde;
  color: #16213e;
`;

export const RegisterButton = styled(Button)`
  background-color: #fc00ff;
  color: white;
`;
