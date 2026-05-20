export const SVG_W = 320;
const SVG_H = 120;
const X1 = 10;
const X2 = 310;
const Y_BOT = 90;
const Y_TOP = 10;
const CHART_H = Y_BOT - Y_TOP;
const D_MIN = 65;
const D_MAX = 82;
const D_RANGE = D_MAX - D_MIN;

const TREND_DATA = [68, 70, 69, 71, 73, 72, 74, 73, 75, 74, 76, 76];
const MONTH_LABELS = ['May', 'Jul', 'Sep', 'Nov', 'Jan', 'Apr'];

function px(i: number): number {
  return X1 + (i / (TREND_DATA.length - 1)) * (X2 - X1);
}
function py(value: number): number {
  return Y_BOT - ((value - D_MIN) / D_RANGE) * CHART_H;
}

export default function TrendChart({ target }: { target: number }) {
  const n = TREND_DATA.length;
  const pts = TREND_DATA.map(
    (v, i) => `${px(i).toFixed(2)},${py(v).toFixed(2)}`,
  ).join(' ');
  const targetY = py(target);

  const areaPath = [
    `M${px(0).toFixed(2)},${Y_BOT}`,
    ...TREND_DATA.map((v, i) => `L${px(i).toFixed(2)},${py(v).toFixed(2)}`),
    `L${px(n - 1).toFixed(2)},${Y_BOT}`,
    'Z',
  ].join(' ');

  return (
    <>
      <svg
        width={SVG_W}
        height={SVG_H}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="fc-trend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line
          x1={X1}
          y1={targetY}
          x2={X2}
          y2={targetY}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <text
          x={X2}
          y={targetY - 6}
          textAnchor="end"
          fill="rgba(255,255,255,0.7)"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Target {target}%
        </text>

        <path d={areaPath} fill="url(#fc-trend-fill)" />

        <polyline
          points={pts}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {TREND_DATA.map((v, i) => (
          <circle
            key={i}
            cx={px(i)}
            cy={py(v)}
            r={i === n - 1 ? 4 : 0}
            fill="white"
            stroke="#02474E"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="flex justify-between px-[10px] text-[10px] text-white/60">
        {MONTH_LABELS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </>
  );
}
