import LoginForm from "../LoginForm";
import FormLayout from "../layouts/FormLayout";

export const LoginPage = () => {
  return (
    <FormLayout
      title="Login Portal"
      form={
        <LoginForm
          registerLink="/register"
          forgetPasswordLink="/forgetPassword"
        />
      }
    />
  );
};

export default LoginPage;
