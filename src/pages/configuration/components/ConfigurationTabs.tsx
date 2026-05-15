import { TabButton } from '@/atoms';
import type { ConfigTab } from '@/types/configuration';

type Props = {
  tabs: { id: ConfigTab; label: string }[];
  active: ConfigTab;
  onChange: (tab: ConfigTab) => void;
};

export function ConfigurationTabs({ tabs, active, onChange }: Props) {
  return (
    <div className="flex border-b border-ink-200">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          active={tab.id === active}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
}
