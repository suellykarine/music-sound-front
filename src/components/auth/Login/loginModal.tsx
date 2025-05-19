import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post(
        "/usuario/login/",
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

      toast.success("Login efetuado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        toast.error("Erro no login. Verifique suas credenciais.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Erro no login. Tente novamente.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <h2>Login</h2>

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
        <ToastContainer theme="colored" />
      </ModalContent>
    </ModalOverlay>
  );
};
