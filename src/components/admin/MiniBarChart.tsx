import type { ChartPoint } from "../../types/admin.type";

interface MiniBarChartProps {
  data: ChartPoint[];
  color?: string;
  valueSuffix?: string;
}

const MiniBarChart = ({
  data,
  color = "bg-blue-500",
  valueSuffix = "",
}: MiniBarChartProps) => {
  const max = Math.max(...data.map((point) => point.value));

  return (
    <div className="flex h-40 items-end justify-between gap-x-2">
      {data.map((point) => (
        <div
          key={point.label}
          className="flex flex-1 flex-col items-center gap-y-2"
        >
          <span className="text-[11px] font-medium text-gray-500">
            {point.value}
            {valueSuffix}
          </span>
          <div className="flex h-28 w-full items-end overflow-hidden rounded-md bg-gray-50">
            <div
              className={`w-full rounded-md ${color} transition-all`}
              style={{ height: `${(point.value / max) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">{point.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MiniBarChart;
