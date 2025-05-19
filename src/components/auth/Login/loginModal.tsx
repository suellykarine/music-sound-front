import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button } from "../../ui/Button";
import { Notification } from "../../ui/Notification";
import {
  CloseButton,
  ErrorText,
  Form,
  Input,
  InputGroup,
  ModalContent,
  ModalOverlay,
  SwitchButton,
  SwitchText,
} from "./style";

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required(),
});

type FormData = yup.InferType<typeof schema>;

export const LoginModal = ({
  onClose,
  onSwitchToRegister,
}: {
  onClose: () => void;
  onSwitchToRegister: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [notification, setNotification] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/usuario/login/",
        {
          email: data.email,
          senha: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      setNotification("Login realizado com sucesso!");
      setTimeout(() => {
        setNotification("");
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        setErrorMessage(
          errorResponse?.error || "Erro no login. Verifique suas credenciais."
        );
      } else {
        setErrorMessage("Erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <h2>Login</h2>

        {notification && (
          <Notification
            message={notification}
            type="success"
            onClose={() => setNotification("")}
          />
        )}
        {errorMessage && (
          <Notification
            message={errorMessage}
            type="error"
            onClose={() => setErrorMessage("")}
          />
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <label>E-mail</label>
            <Input
              type="email"
              {...register("email")}
              placeholder="seu@email.com"
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <label>Senha</label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </InputGroup>

          <Button type="submit" variant="primary">
            Entrar
          </Button>
        </Form>

        <SwitchText>
          Não tem uma conta?{" "}
          <SwitchButton onClick={onSwitchToRegister}>Cadastre-se</SwitchButton>
        </SwitchText>
      </ModalContent>
    </ModalOverlay>
  );
};
