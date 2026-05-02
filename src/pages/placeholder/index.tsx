import { AppShell } from '@/common-components/AppShell';

type Props = {
  title: string;
};

export default function PlaceholderPage({ title }: Props) {
  return (
    <AppShell breadcrumbs={['Home', title]}>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
        <div className="text-[15px] font-semibold text-ink-800">{title}</div>
        <div className="text-[13px] text-ink-400">
          This page is coming soon.
        </div>
      </div>
    </AppShell>
  );
}
