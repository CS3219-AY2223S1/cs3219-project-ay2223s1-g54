import ConfirmAccountForm from "../ConfirmAccountForm";
import FormLayout from "../layouts/FormLayout";

export const ConfirmAccountPage = () => {
  return (
    <FormLayout
      title="Account Verification"
      form={<ConfirmAccountForm loginLink="/login" />}
    />
  );
};

export default ConfirmAccountPage;
