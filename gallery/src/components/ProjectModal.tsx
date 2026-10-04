import React from 'react';
import { 
  X, 
  Folder, 
  Code2, 
  CheckCircle2, 
  Clock, 
  Hammer, 
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProjectMetadata } from '../types/project';

interface ProjectModalProps {
  project: ProjectMetadata | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const isInProgress = project.status === 'in-progress';
  const isCompleted = project.status === 'completed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-sky-400 border border-slate-700/60">
                Project #{project.id}
              </span>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">
                {project.difficulty}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Alert Banner */}
          {isInProgress ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <Hammer className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-sm">
                <h4 className="font-bold text-amber-300">Currently In Progress</h4>
                <p className="text-amber-200/80 mt-1 leading-relaxed">
                  This project directory is set up and active for development in <code className="px-1.5 py-0.5 rounded bg-amber-950/60 font-mono text-xs text-amber-300">{project.path}</code>. Implementation will follow progressively.
                </p>
              </div>
            </div>
          ) : isCompleted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <h4 className="font-bold text-emerald-300">Project Completed & Live</h4>
                <p className="text-emerald-200/80 mt-1 leading-relaxed">
                  The application is fully implemented, verified, and ready to launch or inspect.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-slate-400 shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <h4 className="font-bold text-slate-300">Roadmap Item: Coming Soon</h4>
                <p className="text-slate-400 mt-1 leading-relaxed">
                  This application is scheduled in the 40-project roadmap. Its isolated workspace directory will be initialized as development progresses.
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Planned Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Key Planned Features</h4>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 border border-slate-700/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-sky-300 border border-slate-700/60"
                >
                  <Code2 className="w-3.5 h-3.5 text-sky-400" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Repository Location & Monorepo command */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-sky-400" />
                Monorepo Path:
              </span>
              <span className="text-slate-200">{project.path}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 pt-2 border-t border-slate-800/80">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">cd {project.path}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>Isolated Sub-project Architecture</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            {isInProgress && (
              <button
                onClick={() => {
                  alert(`Project ${project.id}: ${project.name} is currently In Progress. Isolated directory ready at ${project.path}`);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-400 text-amber-950 hover:bg-amber-300 transition-colors shadow-md shadow-amber-500/10"
              >
                <span>View Placeholder Specs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
