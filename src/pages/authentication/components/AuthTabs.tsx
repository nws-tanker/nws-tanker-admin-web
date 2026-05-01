type TabType = 'login' | 'employee' | 'contractor';

type Props = {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
};

const tabs = [
  { key: 'login', label: 'Sign in' },
  { key: 'employee', label: 'Nama Employee' },
  { key: 'contractor', label: 'Contractor' },
];

export default function AuthTabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex bg-gray-50 rounded-xl px-2 py-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key as TabType)}
          className={`flex-1 py-1 rounded-md text-sm transition-all ${
            activeTab === tab.key
              ? 'bg-white shadow-sm text-gray-900 font-semibold'
              : 'text-gray-500 font-normal hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
