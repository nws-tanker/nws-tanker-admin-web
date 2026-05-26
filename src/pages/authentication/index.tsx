import { useState } from 'react';
import AuthLayout from './components/AuthLayout';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/forms/LoginForm';
import EmployeeRegistrationForm from './components/forms/EmployeeRegistrationForm';
import ContractorRegistrationForm from './components/forms/ContractorRegistrationForm';
import ForgotPasswordForm from './components/forms/ForgotPassword';

type AuthView = 'login' | 'employee' | 'contractor' | 'forgot';

export default function AuthenticationPage() {
  const [view, setView] = useState<AuthView>('login');
  const [forgotEmail, setForgotEmail] = useState('');

  const isTabbedView = view !== 'forgot';

  return (
    <AuthLayout>
      {isTabbedView && (
        <AuthTabs activeTab={view} onChange={(t) => setView(t)} />
      )}
      {view === 'login' && (
        <LoginForm
          onSwitchToEmployee={() => setView('employee')}
          onSwitchToContractor={() => setView('contractor')}
          onForgotPassword={(email) => {
            setForgotEmail(email);
            setView('forgot');
          }}
        />
      )}
      {view === 'employee' && (
        <EmployeeRegistrationForm onSwitchToLogin={() => setView('login')} />
      )}
      {view === 'contractor' && (
        <ContractorRegistrationForm onSwitchToLogin={() => setView('login')} />
      )}
      {view === 'forgot' && (
        <ForgotPasswordForm
          initialEmail={forgotEmail}
          onBackToLogin={() => setView('login')}
        />
      )}
    </AuthLayout>
  );
}
