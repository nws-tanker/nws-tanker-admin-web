type Props = {
  inspectorName: string;
};

export function AssignmentOverrideNote({ inspectorName }: Props) {
  return (
    <div className="rounded-md bg-ink-50 px-3 py-2 text-[12px] text-ink-500">
      Currently assigned to{' '}
      <strong className="text-ink-800">{inspectorName}</strong>. Saving will
      override this assignment.
    </div>
  );
}
