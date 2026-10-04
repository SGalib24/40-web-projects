import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { ProjectCategory, ProjectStatus } from '../types/project';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedStatus: 'all' | ProjectStatus;
  onStatusChange: (status: 'all' | ProjectStatus) => void;
  selectedCategory: 'all' | ProjectCategory;
  onCategoryChange: (cat: 'all' | ProjectCategory) => void;
  totalFiltered: number;
  totalCount: number;
}

const CATEGORIES: ProjectCategory[] = [
  'Utility',
  'Game',
  'Productivity',
  'Creative',
  'Commerce',
  'Media',
  'Social',
  'Finance',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedCategory,
  onCategoryChange,
  totalFiltered,
  totalCount,
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedStatus !== 'all' || selectedCategory !== 'all';

  const clearFilters = () => {
    onSearchChange('');
    onStatusChange('all');
    onCategoryChange('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
      {/* Top Search & Status Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by project name, tech (e.g. React), #01..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
          {(
            [
              { key: 'all', label: 'All Projects' },
              { key: 'in-progress', label: 'In Progress' },
              { key: 'coming-soon', label: 'Coming Soon' },
              { key: 'completed', label: 'Completed' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => onStatusChange(item.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedStatus === item.key
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills & Results Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs">
          <span className="flex items-center gap-1 text-slate-400 font-medium mr-1">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              selectedCategory === 'all'
                ? 'bg-slate-800 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>
            Showing <strong className="text-slate-200 font-semibold">{totalFiltered}</strong> of {totalCount} projects
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium underline-offset-4 hover:underline"
            >
              <X className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
