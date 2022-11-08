import AccountSettingsForm from "../AccountSettingsForm";
import FormLayout from "../layouts/FormLayout";

export const AccountSettingsPage = () => {
  return (
    <FormLayout
      title="Account Settings"
      form={<AccountSettingsForm homeLink="/home" />}
    />
  );
};

export default AccountSettingsPage;
