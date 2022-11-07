import ForgetPasswordForm from "../ForgetPasswordForm";
import FormLayout from "../layouts/FormLayout";

export const ForgetPasswordPage = () => {
  return (
    <FormLayout
      title="Forget Password"
      form={<ForgetPasswordForm loginLink="/login" />}
    />
  );
};

export default ForgetPasswordPage;
