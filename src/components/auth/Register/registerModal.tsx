import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { api } from "../../../services/api";
import { Button } from "../../ui/Button";
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

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/usuario/registrar/", {
        email: data.email,
        senha: data.password,
      });

      toast.success("Usuário cadastrado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error("Erro no cadastro. Verifique os dados e tente novamente.", {
        position: "top-right",
        autoClose: 3000,
      });
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

        <SwitchText>
          Já tem uma conta?{" "}
          <SwitchButton onClick={onSwitchToLogin}>Faça login</SwitchButton>
        </SwitchText>

        <ToastContainer theme="colored" />
      </ModalContent>
    </ModalOverlay>
  );
};
