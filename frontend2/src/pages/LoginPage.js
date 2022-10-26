import LoginForm from "../components/LoginForm";
import FormLayout from "../components/layouts/FormLayout";

export const LoginPage = () => {
  return (
    <FormLayout
      title="Login Portal"
      form={<LoginForm registerLink="/register" />}
    />
  );
};

export default LoginPage;
