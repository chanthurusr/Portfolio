"use client"

import { useState } from "react"
import { Calendar, MapPin, Award } from "lucide-react"

const experiences = [
  {
    id: 1,
    type: "education",
    title: "B.Tech Computer Science & Engineering",
    organization: "Sathyabama Institute of Science and Technology",
    location: "Chennai, Tamil Nadu",
    period: "2021 - 2025",
    description: "Specializing in Artificial Intelligence and Machine Learning with a focus on full-stack development.",
    achievements: [
      "CGPA: 8.5/10",
      "Specialized in AI/ML and Computer Vision",
      "Active member of coding club",
      "Organized multiple technical events",
    ],
    skills: ["Data Structures", "Algorithms", "AI/ML", "Software Engineering"],
    icon: "🎓",
  },
  {
    id: 2,
    type: "internship",
    title: "Software Development Intern",
    organization: "Tech Innovation Labs",
    location: "Remote",
    period: "Jun 2024 - Aug 2024",
    description:
      "Developed full-stack web applications using modern technologies and contributed to multiple client projects.",
    achievements: [
      "Built 3 production-ready applications",
      "Improved application performance by 40%",
      "Collaborated with cross-functional teams",
      "Implemented CI/CD pipelines",
    ],
    skills: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    icon: "💼",
  },
  {
    id: 3,
    type: "project",
    title: "AI Research Assistant",
    organization: "University Research Lab",
    location: "Chennai, Tamil Nadu",
    period: "Jan 2024 - May 2024",
    description: "Conducted research on computer vision applications for urban development and smart city solutions.",
    achievements: [
      "Published research findings",
      "Developed novel CV algorithms",
      "95% accuracy in emotion detection",
      "Presented at tech conferences",
    ],
    skills: ["OpenCV", "TensorFlow", "Python", "Research", "Data Analysis"],
    icon: "🔬",
  },
  {
    id: 4,
    type: "certification",
    title: "AWS Certified Developer",
    organization: "Amazon Web Services",
    location: "Online",
    period: "Mar 2024",
    description:
      "Comprehensive certification covering AWS services, deployment, and cloud architecture best practices.",
    achievements: [
      "Scored 850/1000",
      "Hands-on labs completed",
      "Real-world project implementations",
      "Cloud architecture expertise",
    ],
    skills: ["AWS", "Cloud Computing", "DevOps", "Serverless"],
    icon: "☁️",
  },
]

export function ExperienceTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Experience & Education
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My journey through education, internships, and continuous learning. Each experience has shaped my skills and
            passion for technology.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-blue-400 to-purple-400"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.id}
                experience={experience}
                isSelected={selectedExperience === experience.id}
                onSelect={() => setSelectedExperience(selectedExperience === experience.id ? null : experience.id)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-teal-400">Certifications & Achievements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "AWS Certified Developer", issuer: "Amazon", year: "2024", badge: "☁️" },
              { name: "React Professional", issuer: "Meta", year: "2024", badge: "⚛️" },
              { name: "50 Days Badge 2024", issuer: "LeetCode", year: "2024", badge: "🏆" },
              { name: "AI/ML Specialization", issuer: "Coursera", year: "2023", badge: "🤖" },
              { name: "Full Stack Developer", issuer: "FreeCodeCamp", year: "2023", badge: "💻" },
              { name: "Google Cloud Associate", issuer: "Google", year: "2023", badge: "🌐" },
            ].map((cert, index) => (
              <div
                key={cert.name}
                className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cert.badge}</div>
                <h4 className="font-bold text-white mb-2">{cert.name}</h4>
                <p className="text-teal-400 text-sm mb-1">{cert.issuer}</p>
                <p className="text-gray-400 text-xs">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  experience,
  isSelected,
  onSelect,
  index,
}: {
  experience: (typeof experiences)[0]
  isSelected: boolean
  onSelect: () => void
  index: number
}) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "education":
        return "from-green-400 to-emerald-400"
      case "internship":
        return "from-blue-400 to-cyan-400"
      case "project":
        return "from-purple-400 to-pink-400"
      case "certification":
        return "from-yellow-400 to-orange-400"
      default:
        return "from-teal-400 to-blue-400"
    }
  }

  return (
    <div className="relative pl-20">
      {/* Timeline Node */}
      <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 border-4 border-slate-900 z-10"></div>

      {/* Icon */}
      <div className="absolute left-2 top-2 w-12 h-12 rounded-full bg-slate-800 border-2 border-teal-400 flex items-center justify-center text-xl z-10">
        {experience.icon}
      </div>

      {/* Content Card */}
      <div
        className={`cursor-pointer transition-all duration-300 ${isSelected ? "scale-105" : "hover:scale-102"}`}
        onClick={onSelect}
      >
        <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-teal-500/50 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
              <p
                className={`text-lg font-semibold bg-gradient-to-r ${getTypeColor(experience.type)} bg-clip-text text-transparent`}
              >
                {experience.organization}
              </p>
            </div>
            <div className="text-right text-sm text-gray-400 mt-1">
              <div className="flex items-center space-x-1 mb-1">
                <Calendar className="w-4 h-4" />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-4 leading-relaxed">{experience.description}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>

          {/* Expandable Content */}
          {isSelected && (
            <div className="mt-6 pt-6 border-t border-slate-700 animate-in slide-in-from-top-2 duration-300">
              <h4 className="flex items-center space-x-2 text-lg font-semibold text-teal-400 mb-4">
                <Award className="w-5 h-5" />
                <span>Key Achievements</span>
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-300">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expand Indicator */}
          <div className="mt-4 text-center">
            <button className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium">
              {isSelected ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
