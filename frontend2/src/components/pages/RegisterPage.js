import RegisterForm from "../RegisterForm";
import FormLayout from "../layouts/FormLayout";

export const RegisterPage = () => {
  return (
    <FormLayout
      title="Registration"
      form={<RegisterForm loginLink="/login" />}
    />
  );
};

export default RegisterPage;
