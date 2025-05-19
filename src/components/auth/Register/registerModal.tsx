import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
  ModalTitle,
  SwitchButton,
  SwitchText,
} from "./style";

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Senhas não coincidem")
    .required(),
});

type FormData = yup.InferType<typeof schema>;

export const RegisterModal = ({
  onClose,
  onSwitchToLogin,
}: {
  onClose: () => void;
  onSwitchToLogin: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://127.0.0.1:8000/usuario/registrar/", {
        email: data.email,
        senha: data.password,
      });
      setSuccessMessage("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 2000);
    } catch (error) {
      setErrorMessage(
        "Erro no cadastro. Verifique os dados e tente novamente."
      );
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <ModalTitle>Cadastre-se</ModalTitle>

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

          <InputGroup>
            <label>Confirme sua senha</label>
            <Input
              type="password"
              {...register("confirmPassword")}
              placeholder="Digite novamente"
            />
            {errors.confirmPassword && (
              <ErrorText>{errors.confirmPassword.message}</ErrorText>
            )}
          </InputGroup>

          <Button type="submit" variant="primary">
            Criar Conta
          </Button>
        </Form>
        {successMessage && (
          <Notification
            message={successMessage}
            type="success"
            onClose={() => setSuccessMessage("")}
          />
        )}

        {errorMessage && (
          <Notification
            message={errorMessage}
            type="error"
            onClose={() => setErrorMessage("")}
          />
        )}

        <SwitchText>
          Já tem uma conta?{" "}
          <SwitchButton onClick={onSwitchToLogin}>Faça login</SwitchButton>
        </SwitchText>
      </ModalContent>
    </ModalOverlay>
  );
};
