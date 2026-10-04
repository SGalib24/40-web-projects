export type ProjectStatus = 'in-progress' | 'coming-soon' | 'completed';

export type ProjectCategory =
  | 'Utility'
  | 'Game'
  | 'Productivity'
  | 'Creative'
  | 'Commerce'
  | 'Media'
  | 'Social'
  | 'Finance';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProjectMetadata {
  id: string; // "01", "02", ... "40"
  number: number;
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  technologies: string[];
  category: ProjectCategory;
  difficulty: DifficultyLevel;
  path: string; // Relative path inside monorepo, e.g. "projects/01-calculator"
  demoUrl?: string; // Live demo / preview URL if running
  features?: string[];
  notes?: string;
}
