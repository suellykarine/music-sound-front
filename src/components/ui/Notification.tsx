import styled from "styled-components";

export interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Notification = ({ message, type, onClose }: NotificationProps) => {
  return (
    <NotificationContainer type={type}>
      <span>{message}</span>
      <CloseButton onClick={onClose}>✕</CloseButton>
    </NotificationContainer>
  );
};

const NotificationContainer = styled.div<{ type: "success" | "error" }>`
  background-color: ${({ type }) =>
    type === "success" ? "#4caf50" : "#f44336"};
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 250px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
`;
