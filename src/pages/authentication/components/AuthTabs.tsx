import { Tabs } from '@/atoms';

type TabType = 'login' | 'employee' | 'contractor';

type Props = {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
};

const tabs = [
  { key: 'login' as const, label: 'Sign in' },
  { key: 'employee' as const, label: 'Nama Employee' },
  { key: 'contractor' as const, label: 'Contractor' },
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
