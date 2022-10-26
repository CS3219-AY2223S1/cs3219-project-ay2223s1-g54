import RegisterForm from "../components/RegisterForm";
import FormLayout from "../components/layouts/FormLayout";

export const RegisterPage = () => {
  return (
    <FormLayout
      title="Registration"
      form={<RegisterForm loginLink="/login" />}
    />
  );
};

export default RegisterPage;
