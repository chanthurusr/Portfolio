"use client"

import { useState } from "react"
import { ExternalLink, Github, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Smart Urban Development",
    year: "2024",
    description:
      "AI-powered urban planning solution with real-time analytics and predictive modeling for sustainable city development.",
    tech: ["React", "Node.js", "Python", "TensorFlow", "MongoDB"],
    features: [
      "Real-time data visualization",
      "Predictive analytics",
      "Interactive mapping",
      "Performance optimization",
    ],
    image: "/placeholder.svg?height=300&width=500",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Milk Delivery App",
    year: "2024",
    description: "Full-stack delivery management system with route optimization and real-time tracking capabilities.",
    tech: ["React Native", "Express.js", "PostgreSQL", "Socket.io"],
    features: ["Route optimization", "Real-time tracking", "Payment integration", "Admin dashboard"],
    image: "/placeholder.svg?height=300&width=500",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 3,
    title: "EMO Platform",
    year: "2023",
    description: "Emotion recognition system using computer vision with 95% accuracy for real-time emotion detection.",
    tech: ["OpenCV", "Python", "TensorFlow", "React", "Flask"],
    features: ["Real-time processing", "95% accuracy", "Multi-face detection", "Emotion analytics"],
    image: "/placeholder.svg?height=300&width=500",
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Garbage Detection System",
    year: "2023",
    description: "Computer vision-based waste management solution for automated garbage detection and classification.",
    tech: ["OpenCV", "YOLO", "React", "Python", "AWS"],
    features: ["Automated detection", "Classification system", "Environmental impact tracking", "Mobile app"],
    image: "/placeholder.svg?height=300&width=500",
    github: "#",
    demo: "#",
    featured: false,
  },
]

export function ProjectsShowcase() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing innovative solutions built with cutting-edge technologies. Each project represents a unique
            challenge solved with creativity and technical expertise.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isHovered={hoveredProject === project.id}
                isAdjacent={hoveredProject !== null && hoveredProject !== project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project.id)}
                index={index}
              />
            ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isHovered={hoveredProject === project.id}
                isAdjacent={hoveredProject !== null && hoveredProject !== project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project.id)}
                index={index}
                compact
              />
            ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={projects.find((p) => p.id === selectedProject)!}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

function ProjectCard({
  project,
  isHovered,
  isAdjacent,
  onHover,
  onLeave,
  onClick,
  index,
  compact = false,
}: {
  project: (typeof projects)[0]
  isHovered: boolean
  isAdjacent: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  index: number
  compact?: boolean
}) {
  return (
    <div
      className={`group relative cursor-pointer transition-all duration-500 ${
        isAdjacent ? "opacity-30 scale-95" : "opacity-100 scale-100"
      } ${isHovered ? "z-10" : "z-0"}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-teal-500/50 transition-all duration-300 ${
          compact ? "h-80" : "h-96"
        }`}
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

          {/* Year Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-teal-500/20 backdrop-blur-sm rounded-full text-teal-400 text-sm font-semibold">
            {project.year}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">{project.title}</h3>

          <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, compact ? 3 : 5).map((tech) => (
              <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                {tech}
              </span>
            ))}
            {project.tech.length > (compact ? 3 : 5) && (
              <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                +{project.tech.length - (compact ? 3 : 5)} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors">
              <span className="text-sm font-medium">Learn More</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex space-x-3">
              <a
                href={project.github}
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.demo}
                className="p-2 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-white">{project.title}</h3>
            <button onClick={onClose} className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-teal-400">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-300">
                      <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-teal-400 mb-4">Technology Stack</h4>
                <div className="grid grid-cols-2 gap-3">
                  {project.tech.map((tech) => (
                    <div
                      key={tech}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-center font-medium"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href={project.github}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>View Code</span>
                </a>
                <a
                  href={project.demo}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
