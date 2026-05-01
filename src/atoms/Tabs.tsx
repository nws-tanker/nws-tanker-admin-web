import { cn } from '@/utils';

type Tab<T extends string> = {
  key: T;
  label: string;
};

type TabsProps<T extends string> = {
  tabs: Tab<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
  className?: string;
};

export function Tabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  className,
}: TabsProps<T>) {
  return (
    <div className={cn('flex bg-gray-50 rounded-xl px-2 py-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={cn(
            'flex-1 py-1 rounded-md text-sm transition-all',
            activeTab === tab.key
              ? 'bg-white shadow-sm text-gray-900 font-semibold'
              : 'text-gray-500 font-normal hover:text-gray-700',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
