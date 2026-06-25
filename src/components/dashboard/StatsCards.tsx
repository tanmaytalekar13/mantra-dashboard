interface Props {
  title: string;
  value: string | number;
  onClick?: () => void;
  active?: boolean;
}

export default function StatsCard({
  title,
  value,
  onClick,
  active = false,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl
        p-5
        shadow-md
        transition-all
        duration-300
        cursor-pointer
        hover:shadow-xl
        hover:-translate-y-1
        ${
          active
            ? "bg-blue-50 border-2 border-blue-500"
            : "bg-white border border-transparent"
        }
      `}
    >
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-800">
        {value}
      </h2>
    </div>
  );
}