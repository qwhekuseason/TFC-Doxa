import React from 'react';
import { Loader2, ChevronRight, ArrowUpRight, Bell, Sun, Moon } from 'lucide-react';

export const SkeletonCard: React.FC<{ height?: string }> = ({ height = "h-48" }) => (
  <div className={`bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse ${height} w-full shadow-sm`}></div>
);

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center p-12">
    <Loader2 className="animate-spin text-blue-500" size={40} />
  </div>
);

export const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
  loading?: boolean;
  onClick?: () => void;
}> = ({ title, value, icon, trend, color, loading, onClick }) => {
  const colorBase = color.split('-')[1];

  if (loading) return <SkeletonCard height="h-32" />;

  return (
    <div onClick={onClick} className={`group relative bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}>
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${colorBase}-500/10 rounded-full blur-2xl -mr-6 -mt-6 transition-all group-hover:bg-${colorBase}-500/20`}></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3.5 rounded-2xl ${color} bg-opacity-10 dark:bg-opacity-20 text-${colorBase}-600 dark:text-${colorBase}-400 group-hover:scale-110 transition-transform duration-300`}>
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<any>, { size: 22 })
              : icon
            }
          </div>
          {trend && (
            <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 dark:bg-green-500/20 dark:text-green-400 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={12} /> {trend}
            </span>
          )}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{value}</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export const SidebarItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
      active
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400'
    }`}
  >
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-100 z-0"></div>
    )}
    <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-white' : 'text-gray-500 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-blue-400'}`}>
      {icon}
    </div>
    <span className="relative z-10 font-medium tracking-wide text-sm">{label}</span>
    {active && <ChevronRight size={16} className="relative z-10 ml-auto opacity-70 animate-pulse" />}
  </button>
);

export const NotificationPopover: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 animate-fade-in-up overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {/* Sample notifications */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
          <p className="font-bold text-sm text-gray-900 dark:text-white">New Sermon Available</p>
          <p className="text-xs text-gray-500 mt-1">Sunday Worship - 2 hours ago</p>
        </div>
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
          <p className="font-bold text-sm text-gray-900 dark:text-white">Event Reminder</p>
          <p className="text-xs text-gray-500 mt-1">Youth Fellowship - Tomorrow 6 PM</p>
        </div>
        <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
          <p className="font-bold text-sm text-gray-900 dark:text-white">Prayer Request Approved</p>
          <p className="text-xs text-gray-500 mt-1">Your prayer was approved - 5 hours ago</p>
        </div>
      </div>
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
        <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">View All</button>
      </div>
    </div>
  );
};

export const GlobalAudioPlayer: React.FC<{ sermon: any; onClose: () => void }> = ({ sermon, onClose }) => {
  if (!sermon) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-2xl z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img src={sermon.coverUrl} alt={sermon.title} className="w-16 h-16 rounded-lg object-cover" />
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">{sermon.title}</p>
            <p className="text-sm opacity-75 truncate">{sermon.preacher}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">▶</button>
          <input type="range" min="0" max="100" className="w-32 h-1 rounded-full" />
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">✕</button>
        </div>
      </div>
    </div>
  );
};

