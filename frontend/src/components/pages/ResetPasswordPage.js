import ResetPasswordForm from "../ResetPasswordForm";
import FormLayout from "../layouts/FormLayout";

export const ResetPasswordPage = () => {
  return (
    <FormLayout
      title="Reset Password"
      form={<ResetPasswordForm loginLink="/login" />}
    />
  );
};

export default ResetPasswordPage;
