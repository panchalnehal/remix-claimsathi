import React from 'react';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onBackToHome?: () => void;
  showBackButton?: boolean;
  backButtonLabel?: string;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onBackToHome,
  showBackButton = true,
  backButtonLabel = 'Back to Home',
  className = '',
}) => {
  const handleHomeClick = () => {
    if (onBackToHome) {
      onBackToHome();
    } else if (items.length > 0 && items[0].onClick) {
      items[0].onClick();
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4 ${className}`}
    >
      {/* Left side: Back button */}
      {showBackButton && (
        <button
          type="button"
          onClick={handleHomeClick}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:border-blue-300 group-hover:bg-blue-50 shadow-2xs transition-all">
            <ArrowLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-600 transition-colors" />
          </div>
          <span>{backButtonLabel}</span>
        </button>
      )}

      {/* Right side: Breadcrumb path */}
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-medium">
        {/* Home root */}
        <li className="inline-flex items-center">
          <button
            type="button"
            onClick={handleHomeClick}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-200/50 transition-all cursor-pointer font-semibold"
          >
            <Home className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600" />
            <span>Home</span>
          </button>
        </li>

        {/* Dynamic items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.active;
          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mx-0.5" />
              {isLast ? (
                <span className="px-2 py-1 font-bold text-blue-700 bg-blue-50 border border-blue-200/60 rounded-md truncate max-w-[220px] sm:max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="px-2 py-1 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-200/50 transition-all cursor-pointer font-medium"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
