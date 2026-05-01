import { useState } from 'react';
import AuthLayout from './components/AuthLayout';
import NamaEmployeeRegistrationForm from './components/forms/NamaEmployeeRegistrationForm';
import ContractorRegistrationForm from './components/forms/ContractorRegistrationForm';
import LoginForm from './components/forms/LoginForm';
import AuthTabs from './components/AuthTabs';
export default function AuthenticationPage() {
  type TabType = 'login' | 'contractor' | 'employee';

  const FORM_MAP: Record<TabType, React.ComponentType> = {
    login: LoginForm,
    contractor: ContractorRegistrationForm,
    employee: NamaEmployeeRegistrationForm,
  };

  const [activeTab, setActiveTab] = useState<TabType>('login');

  const ActiveForm = FORM_MAP[activeTab];

  return (
    <AuthLayout>
      <AuthTabs activeTab={activeTab} onChange={setActiveTab} />
      <ActiveForm />
    </AuthLayout>
  );
}
