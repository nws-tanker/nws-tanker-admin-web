import { Tabs } from '@/atoms';

type TabType = 'login' | 'registration';

type Props = {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
};

const tabs = [
  { key: 'login' as const, label: 'Sign in' },
  { key: 'registration' as const, label: 'Registration' },
];

export default function AuthTabs({ activeTab, onChange }: Props) {
  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={onChange}
      className="mb-6"
    />
  );
}
