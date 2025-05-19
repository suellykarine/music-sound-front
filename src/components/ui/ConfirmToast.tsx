import { FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";

const ConfirmContainer = styled.div`
  padding: 1rem;
  min-width: 250px;
  background: #16213e;
  color: #fff;
  border-radius: 8px;

  && {
    background: #16213e;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: flex-end;
`;

const ConfirmButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;

  &:hover {
    background: #ff3333;
  }
`;

const CancelButton = styled.button`
  background: #f0f0f0;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e0e0e0;
  }
`;

export const confirmDelete = (message: string, onConfirm: () => void) => {
  const ConfirmContent = () => (
    <ConfirmContainer>
      <p>{message}</p>
      <ButtonsContainer>
        <CancelButton onClick={() => toast.dismiss()}>
          <FaTimes /> Cancelar
        </CancelButton>
        <ConfirmButton
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
        >
          <FaTrash /> Excluir
        </ConfirmButton>
      </ButtonsContainer>
    </ConfirmContainer>
  );

  toast.info(<ConfirmContent />, {
    closeButton: false,
    autoClose: false,
    closeOnClick: false,
    draggable: false,

    theme: "dark",
    style: {
      background: "#16213e",
      width: "100%",
      margin: 0,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    },
  });
};
