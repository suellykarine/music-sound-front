import { useState } from "react";

import { LoginModal } from "../../components/auth/Login/loginModal";
import { RegisterModal } from "../../components/auth/Register/registerModal";
import {
  ButtonsContainer,
  Container,
  Content,
  Illustration,
  LoginButton,
  Logo,
  RegisterButton,
} from "./styles";

export const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <Container>
      <Content>
        <Logo>SoundWave</Logo>
        <Illustration>
          <svg
            width="300"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3V21M8 7V17M16 7V17M20 11V13M4 11V13"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00dbde" />
                <stop offset="100%" stopColor="#fc00ff" />
              </linearGradient>
            </defs>
          </svg>
        </Illustration>
        <ButtonsContainer>
          <LoginButton onClick={() => setIsLoginOpen(true)}>Login</LoginButton>
          <RegisterButton onClick={() => setIsRegisterOpen(true)}>
            Cadastre-se
          </RegisterButton>
        </ButtonsContainer>

        {isLoginOpen && (
          <LoginModal
            onClose={() => setIsLoginOpen(false)}
            onSwitchToRegister={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          />
        )}

        {isRegisterOpen && (
          <RegisterModal
            onClose={() => setIsRegisterOpen(false)}
            onSwitchToLogin={() => {
              setIsRegisterOpen(false);
              setIsLoginOpen(true);
            }}
          />
        )}
      </Content>
    </Container>
  );
};
