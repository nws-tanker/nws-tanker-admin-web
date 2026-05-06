import { useState } from 'react';
import AuthLayout from './components/AuthLayout';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/forms/LoginForm';
import EmployeeRegistrationForm from './components/forms/EmployeeRegistrationForm';
import ContractorRegistrationForm from './components/forms/ContractorRegistrationForm';

type TabType = 'login' | 'employee' | 'contractor';

export default function AuthenticationPage() {
  const [activeTab, setActiveTab] = useState<TabType>('login');

  return (
    <AuthLayout>
      <AuthTabs activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'login' && (
        <LoginForm
          onSwitchToEmployee={() => setActiveTab('employee')}
          onSwitchToContractor={() => setActiveTab('contractor')}
        />
      )}
      {activeTab === 'employee' && (
        <EmployeeRegistrationForm
          onSwitchToLogin={() => setActiveTab('login')}
        />
      )}
      {activeTab === 'contractor' && (
        <ContractorRegistrationForm
          onSwitchToLogin={() => setActiveTab('login')}
        />
      )}
    </AuthLayout>
  );
}
