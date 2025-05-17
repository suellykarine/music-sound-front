import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  padding: 3rem;
  border-radius: 10px;
  width: 350px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
`;

export const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 0.875rem;
`;

export const SwitchText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.7);
`;

export const SwitchButton = styled.button`
  color: #00dbde;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  font-size: inherit;
`;

export const ModalTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
