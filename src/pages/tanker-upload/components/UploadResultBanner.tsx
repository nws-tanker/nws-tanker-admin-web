type Props = {
  totalRows: number;
  importedCount: number;
  failedCount: number;
};

export function UploadResultBanner({
  totalRows,
  importedCount,
  failedCount,
}: Props) {
  const allImported = failedCount === 0;

  return (
    <div className="rounded-md border-l-[3px] border-green-600 bg-green-50 px-3.5 py-2.5 text-[12.5px] text-ink-700">
      {allImported ? (
        <>
          ✓ <strong>All {totalRows} tankers</strong> successfully imported and
          added to Fleet Registry.
        </>
      ) : (
        <>
          ✓ <strong>{importedCount} tankers</strong> imported to Fleet Registry
          ·{' '}
          <strong className="text-red-600">
            {failedCount} row{failedCount > 1 ? 's' : ''} need attention
          </strong>{' '}
          below.
        </>
      )}
    </div>
  );
}
