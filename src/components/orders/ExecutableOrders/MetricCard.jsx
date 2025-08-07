import { LucideIcon } from 'lucide-react';

export const DarkMetricCard = ({
  icon: Icon,
  backgroundColor,
  iconColor,
  label,
  value
}) => {
  return (
    <div className={`${backgroundColor} rounded-lg p-6 shadow-lg text-white`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-80">{label}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg bg-black bg-opacity-20`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};