import { TabButton } from '@/atoms';
import { CONFIG_TABS, type ConfigTab } from '../configurationHelpers';

type Props = {
  active: ConfigTab;
  onChange: (tab: ConfigTab) => void;
};

export function ConfigurationTabs({ active, onChange }: Props) {
  return (
    <div className="flex border-b border-ink-200">
      {CONFIG_TABS.map((tab) => (
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
