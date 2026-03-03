"use client"

import { useState } from "react"
import { Calendar, Code } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Screen Time Monitoring System",
    year: "2025",
    description:
      "A real-time monitoring system that tracks application usage, window activity, and browser behaviour on the user's system. Captured active screen duration, extracted browser URLs and domains, and securely stored data in Snowflake for analytics.",
    tech: ["Python", "Snowflake", "SQL"],
    features: [
      "Real-time application usage and window activity tracking",
      "Browser URL and domain extraction",
      "Secure data storage in Snowflake Data Cloud",
      "SQL-based reports for hourly, daily, and application-wise analysis",
      "User-wise and website usage productivity insights",
    ],
  },
  {
    id: 2,
    title: "Tech Matrix",
    year: "2025",
    description:
      "A responsive website for the Computer Science Association to display events, member profiles, and updates. Designed interactive sections for announcements and highlights, ensuring smooth accessibility across all devices.",
    tech: ["React"],
    features: [
      "Interactive event display and announcements",
      "Member profiles and association updates",
      "Responsive design across all devices",
      "Student engagement-focused UI/UX",
      "Smooth navigation and accessibility",
    ],
  },
  {
    id: 3,
    title: "Milk Delivery Management App",
    year: "2025",
    description:
      "User-friendly milk delivery management app with account creation, product selection, scheduling, real-time order tracking, and secure payments with location-based services.",
    tech: ["React Native", "Node.js", "MongoDB", "Express.js", "Google Maps API"],
    features: [
      "Account creation and product selection interface",
      "Delivery scheduling and real-time order tracking",
      "Secure payment integration",
      "Location-based route optimization",
      "Admin dashboard for logistics management",
    ],
  },
  {
    id: 4,
    title: "Hostel Management System",
    year: "2024",
    description:
      "Comprehensive hostel management system for student accommodation with room allocation, fee management, visitor tracking, and maintenance requests.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
    features: [
      "Student registration and room allocation",
      "Fee management and payment tracking",
      "Visitor management and security logs",
      "Maintenance request system",
      "Warden dashboard for hostel administration",
    ],
  },
  {
    id: 5,
    title: "Garbage Detection Using CNN",
    year: "2023",
    description:
      "CNN-based Garbage Detection System achieving 92.96% accuracy in classifying waste into categories like cardboard, glass, and metal using TensorFlow and Keras.",
    tech: ["TensorFlow", "Keras", "Python", "CNN"],
    features: [
      "92.96% accuracy in waste classification",
      "Pre-processed 2,467 images dataset",
      "Multi-category classification (cardboard, glass, metal)",
      "Model optimization using TensorFlow and Keras",
      "Published research findings on recycling efficiency",
    ],
  },
  {
    id: 6,
    title: "Smart Urban Development System",
    year: "2025",
    description:
      "Urban area development system integrating weather forecasting, air pollution monitoring, accident detection, and smart traffic management using OpenCV and real-time data processing.",
    tech: ["Node.js", "React.js", "MongoDB", "Express.js", "OpenCV"],
    features: [
      "Real-time weather forecasting with 3-day historical data",
      "Air pollution monitoring and alerts",
      "Automated accident detection with emergency alerts",
      "Smart traffic signal automation at zebra crossings",
      "AI-driven pedestrian detection and traffic flow optimization",
    ],
  },
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-electric-teal to-neon-blue bg-clip-text text-transparent cyberpunk-glow">
              Project Arsenal
            </span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isSelected={selectedProject === project.id}
              onSelect={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  isSelected,
  onSelect,
  index,
}: {
  project: (typeof projects)[0]
  isSelected: boolean
  onSelect: () => void
  index: number
}) {
  return (
    <div
      className={`group relative cursor-pointer transition-all duration-500 ${
        isSelected ? "scale-105 z-10" : "hover:scale-102"
      }`}
      onClick={onSelect}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-gray-700 hover:border-electric-teal/50 transition-all duration-300 cyberpunk-card">
        {/* Project Header */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white group-hover:text-electric-teal transition-colors cyberpunk-text">
                {project.title}
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm cyberpunk-text">{project.year}</span>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed cyberpunk-text">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm font-medium border border-neon-blue/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expandable Features */}
          {isSelected && (
            <div className="mt-6 pt-6 border-t border-gray-700 animate-in slide-in-from-top-2 duration-300">
              <h4 className="flex items-center space-x-2 text-lg font-semibold text-electric-teal mb-4 cyberpunk-text">
                <Code className="w-5 h-5" />
                <span>Key Features</span>
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-300 cyberpunk-text">
                    <span className="w-2 h-2 bg-electric-teal rounded-full mt-2 flex-shrink-0 cyberpunk-dot"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expand Indicator */}
          <div className="text-center pt-4">
            <button className="text-electric-teal hover:text-neon-blue transition-colors text-sm font-medium cyberpunk-text">
              {isSelected ? "Hide Details ↑" : "View Details ↓"}
            </button>
          </div>
        </div>

        {/* Cyberpunk Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-electric-teal/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none cyberpunk-overlay" />
      </div>
    </div>
  )
}
