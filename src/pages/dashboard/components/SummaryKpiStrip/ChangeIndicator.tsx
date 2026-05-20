export default function ChangeIndicator({ ratio }: { ratio: number }) {
  const positive = ratio >= 0;
  return (
    <span
      className={`ml-2 text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}
    >
      {positive ? '↑' : '↓'} {Math.abs(ratio)}
    </span>
  );
}
