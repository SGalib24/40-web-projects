import React from 'react';
import { 
  Clock, 
  ExternalLink, 
  Code2, 
  Folder, 
  Sparkles, 
  CheckCircle2, 
  Hammer 
} from 'lucide-react';
import { ProjectMetadata } from '../types/project';

interface ProjectCardProps {
  project: ProjectMetadata;
  onSelect: (project: ProjectMetadata) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const isInProgress = project.status === 'in-progress';
  const isCompleted = project.status === 'completed';

  const getStatusBadge = () => {
    if (isInProgress) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <Hammer className="w-3 h-3" />
          In Progress
        </span>
      );
    }
    if (isCompleted) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-400 border border-slate-700/60">
        <Clock className="w-3 h-3" />
        Coming Soon
      </span>
    );
  };

  const getDifficultyBadge = () => {
    const colors = {
      Beginner: 'text-emerald-400/90 bg-emerald-500/10 border-emerald-500/20',
      Intermediate: 'text-sky-400/90 bg-sky-500/10 border-sky-500/20',
      Advanced: 'text-purple-400/90 bg-purple-500/10 border-purple-500/20',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${colors[project.difficulty]}`}>
        {project.difficulty}
      </span>
    );
  };

  return (
    <div
      onClick={() => onSelect(project)}
      className={`group relative flex flex-col justify-between rounded-2xl bg-slate-900/70 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden backdrop-blur-sm ${
        isInProgress
          ? 'border-amber-500/40 hover:border-amber-400/70 shadow-amber-950/20'
          : 'border-slate-800/80 hover:border-slate-700 shadow-black/40'
      }`}
    >
      {/* Top ambient highlight gradient */}
      <div 
        className={`absolute top-0 inset-x-0 h-1 transition-opacity ${
          isInProgress 
            ? 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600 opacity-100' 
            : isCompleted
            ? 'bg-gradient-to-r from-emerald-400 to-teal-500 opacity-100'
            : 'bg-gradient-to-r from-slate-700 to-slate-800 opacity-0 group-hover:opacity-100'
        }`}
      />

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Card Header: Number + Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-sky-400 border border-slate-700/60 shadow-sm">
              #{project.id}
            </span>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <div>{getStatusBadge()}</div>
        </div>

        {/* Project Name */}
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors flex items-center justify-between">
          <span>{project.name}</span>
          {isInProgress && (
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          )}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm text-slate-400 line-clamp-3 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Metadata info: difficulty + directory */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors">
            <Folder className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[160px]">{project.path}</span>
          </div>
          {getDifficultyBadge()}
        </div>

        {/* Technology Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700/50"
            >
              <Code2 className="w-3 h-3 text-sky-400" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Button for opening the project */}
      <div className="p-4 sm:px-6 bg-slate-950/50 border-t border-slate-800/60 flex items-center justify-between">
        {isCompleted ? (
          <a
            href={project.demoUrl || '#'}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-md shadow-emerald-900/20 active:scale-[0.98]"
          >
            <span>Launch App</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : isInProgress ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-amber-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 transition-all shadow-md shadow-amber-500/10 active:scale-[0.98]"
          >
            <Hammer className="w-4 h-4 text-amber-900" />
            <span className="font-semibold">Open Project (In Progress)</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-400 bg-slate-800/60 hover:bg-slate-800 hover:text-slate-300 transition-colors border border-slate-700/50 active:scale-[0.98]"
          >
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Coming Soon</span>
          </button>
        )}
      </div>
    </div>
  );
};
