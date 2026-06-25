interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string; // e.g. "+3.2%" or "-1.5%"
  onClick?: () => void;
  active?: boolean;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  trend,
  onClick,
  active = false,
}: Props) {
  const trendColor =
    trend?.startsWith("+") ? "text-green-600" : "text-red-500";

  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl p-4 shadow-sm transition-all duration-200
        ${onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : ""}
        ${active ? "bg-blue-50 border-2 border-blue-500" : "bg-white border border-gray-100"}
      `}
    >
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </p>
      <h2 className="mt-1 text-2xl font-bold text-gray-800 leading-tight">
        {value}
      </h2>
      {(subtitle || trend) && (
        <div className="mt-1 flex items-center gap-2">
          {subtitle && (
            <span className="text-sm text-gray-500">{subtitle}</span>
          )}
          {trend && (
            <span className={`text-xs font-semibold ${trendColor}`}>
              {trend} MoM
            </span>
          )}
        </div>
      )}
    </div>
  );
}