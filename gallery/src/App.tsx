import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { FilterBar } from './components/FilterBar';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { projectsData } from './data/projects';
import { ProjectCategory, ProjectMetadata, ProjectStatus } from './types/project';
import { SearchX } from 'lucide-react';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | ProjectStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectMetadata | null>(null);

  // Compute stats across the whole dataset
  const stats = useMemo(() => {
    let inProgress = 0;
    let comingSoon = 0;
    let completed = 0;

    projectsData.forEach((p) => {
      if (p.status === 'in-progress') inProgress++;
      else if (p.status === 'completed') completed++;
      else comingSoon++;
    });

    return {
      total: projectsData.length,
      inProgress,
      comingSoon,
      completed,
    };
  }, []);

  // Filter projects based on search query, status, and category
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Status filter
      if (selectedStatus !== 'all' && project.status !== selectedStatus) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }

      // Search query filter (matches name, description, technologies, id, slug)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = project.name.toLowerCase().includes(query);
        const matchesDesc = project.description.toLowerCase().includes(query);
        const matchesId = project.id.toLowerCase().includes(query) || `#${project.id}`.toLowerCase().includes(query);
        const matchesTech = project.technologies.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = project.category.toLowerCase().includes(query);

        return matchesName || matchesDesc || matchesId || matchesTech || matchesCategory;
      }

      return true;
    });
  }, [searchQuery, selectedStatus, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Statistics Bar */}
        <StatsBar
          total={stats.total}
          inProgress={stats.inProgress}
          comingSoon={stats.comingSoon}
          completed={stats.completed}
        />

        {/* Filter and Search Controls */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          totalFiltered={filteredProjects.length}
          totalCount={projectsData.length}
        />

        {/* Project Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setActiveModalProject(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-slate-900/40 rounded-2xl border border-slate-800/80 my-8">
              <SearchX className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-200">No projects found</h3>
              <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
                No matching applications match your current search query or filter selections.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('all');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold hover:bg-sky-500/20 transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
