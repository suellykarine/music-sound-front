import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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

  const onSubmit = (data: FormData) => {
    console.log("Dados do login:", data);
    onClose();
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
      </ModalContent>
    </ModalOverlay>
  );
};
