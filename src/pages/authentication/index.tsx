import { useState } from 'react';
import AuthLayout from './components/AuthLayout';
import RegistrationForm from './components/forms/RegistrationForm';
import LoginForm from './components/forms/LoginForm';
import AuthTabs from './components/AuthTabs';

type TabType = 'login' | 'registration';

const FORM_MAP: Record<TabType, React.ComponentType> = {
  login: LoginForm,
  registration: RegistrationForm,
};
export default function AuthenticationPage() {
  const [activeTab, setActiveTab] = useState<TabType>('login');

  const ActiveForm = FORM_MAP[activeTab];

  return (
    <AuthLayout>
      <AuthTabs activeTab={activeTab} onChange={setActiveTab} />
      <ActiveForm />
    </AuthLayout>
  );
}
