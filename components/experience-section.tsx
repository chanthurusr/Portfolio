"use client"

import { useState } from "react"
import { Calendar, MapPin, Award, GraduationCap, Briefcase, Users, Trophy } from "lucide-react"
import { LeetCodeWidget } from "./leetcode-widget"

const experiences = [
  {
    id: 1,
    type: "education",
    title: "B.E(CSE)",
    organization: "Nandha Engineering College",
    location: "Erode, Tamil Nadu",
    period: "2022 - Present",
    description:
      "Bachelor of Engineering in Computer Science and Engineering with specialization in full-stack development and AI/ML technologies.",
    achievements: ["CGPA: 7.8 (Up to 4th Semester)", "Office Bearer (2023-2025)", "Core Member (2025-2026)"],
    icon: GraduationCap,
    color: "from-electric-teal to-cyan-400",
  },
  {
    id: 2,
    type: "education",
    title: "HSC",
    organization: "Vijay Vikas Matric Higher Secondary School",
    location: "Tamil Nadu",
    period: "2020 - 2022",
    description: "Higher Secondary Certificate with focus on Science stream.",
    achievements: ["Percentage: 70.1%"],
    icon: GraduationCap,
    color: "from-neon-blue to-blue-400",
  },
  {
    id: 3,
    type: "education",
    title: "SSLC",
    organization: "Vijay Vikas Matric Higher Secondary School",
    location: "Tamil Nadu",
    period: "2019 - 2020",
    description: "Secondary School Leaving Certificate.",
    achievements: ["Percentage: 70.8%"],
    icon: GraduationCap,
    color: "from-neon-blue to-blue-400",
  },
]

const internships = [
  {
    id: 1,
    title: "AR/VR Intern",
    organization: "All Real Company",
    location: "Remote",
    period: "2025",
    description: "Developed immersive AR/VR applications using Unity and Blender with Meta Quest 2 integration.",
    achievements: [
      "Developed Gun Assembly Game using Unity and Blender",
      "Created realistic AR/VR environment with animations",
      "Implemented health mechanics and death animations",
      "Integrated with Meta Quest 2 via Developer Hub",
      "Gained expertise in VR game development and interaction mechanics",
    ],
    icon: Briefcase,
    color: "from-purple-400 to-pink-400",
  },
]

const events = [
  {
    id: 1,
    title: "BRAINIACS",
    description:
      "Organized and hosted a team-based quiz and coding challenge, testing participants' computer science knowledge, teamwork, and problem-solving skills.",
    achievements: [
      "Successfully organized team-based quiz competition",
      "Designed computer science knowledge challenges",
      "Enhanced participants' teamwork and problem-solving skills",
      "Managed event logistics and coordination",
    ],
    icon: Users,
    color: "from-yellow-400 to-orange-400",
  },
  {
    id: 2,
    title: "Codebreaker",
    description:
      "Conducted the first round, where participants identified technology names based on given images, followed by a coding challenge in the second round. Led the event coordination and hosting, enhancing participants' engagement and learning experience.",
    achievements: [
      "Designed innovative technology identification challenges",
      "Conducted multi-round coding competitions",
      "Led event coordination and hosting",
      "Enhanced participants' engagement and learning experience",
    ],
    icon: Trophy,
    color: "from-green-400 to-emerald-400",
  },
]

const certifications = [
  {
    name: "NPTEL - Cyber Security and Privacy",
    issuer: "NPTEL",
    type: "certificate",
    icon: "🔒",
    link: "https://drive.google.com/file/d/1fvqNh7u2rqSpRx278nGiXz5qncNI0ZRH/view",
  },
  {
    name: "Cyber Crimes in Electronic Payment",
    issuer: "Workshop",
    type: "certificate",
    icon: "💳",
    link: "https://drive.google.com/file/d/1VOqUXJYJxmqm1-x1LpLs-bKs0nbZTphW/view",
  },
  {
    name: "AR/VR Workshop",
    issuer: "Machenn Innovations",
    type: "certificate",
    icon: "🥽",
    link: "#",
  },
  {
    name: "Java (Basic)",
    issuer: "HackerRank",
    type: "certificate",
    icon: "☕",
    link: "https://www.hackerrank.com/certificates/iframe/c0b021c55f64",
  },
  {
    name: "SQL (Basic)",
    issuer: "HackerRank",
    type: "certificate",
    icon: "🗄️",
    link: "https://www.hackerrank.com/certificates/iframe/9d6432af447f",
  },
  {
    name: "Poster Making - FIRST PRIZE",
    issuer: "IRTT, Erode",
    type: "award",
    icon: "🏆",
    link: "https://drive.google.com/file/d/16ovalE1oOh-CGbwJvHDWdlr9mfXsp4af/view",
  },
  {
    name: "Office Bearer",
    issuer: "Nandha Engineering College (2023–2025)",
    type: "position",
    icon: "👔",
    link: "#",
  },
  {
    name: "Core Member",
    issuer: "Nandha Engineering College (2025–2026)",
    type: "position",
    icon: "⭐",
    link: "#",
  },
]

export function ExperienceSection() {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
  const [selectedInternship, setSelectedInternship] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-electric-teal to-neon-blue bg-clip-text text-transparent cyberpunk-glow">
              Professional Journey
            </span>
          </h2>
        </div>

        {/* Education Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-electric-teal cyberpunk-text">Education</h3>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-teal via-neon-blue to-purple-400 cyberpunk-line"></div>
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
        </div>

        {/* Internship Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-purple-400 cyberpunk-text">
            Professional Experience
          </h3>
          <div className="max-w-4xl mx-auto">
            {internships.map((internship, index) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                isSelected={selectedInternship === internship.id}
                onSelect={() => setSelectedInternship(selectedInternship === internship.id ? null : internship.id)}
              />
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-yellow-400 cyberpunk-text">Event Leadership</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                isSelected={selectedEvent === event.id}
                onSelect={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
              />
            ))}
          </div>
        </div>

        {/* LeetCode Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-orange-400 cyberpunk-text">Coding Performance</h3>
          <div className="max-w-4xl mx-auto">
            <LeetCodeWidget />
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-electric-teal cyberpunk-text">Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <a
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-gray-700 hover:border-electric-teal/50 transition-all duration-300 hover:scale-105 group cyberpunk-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform">{cert.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1 group-hover:text-electric-teal transition-colors cyberpunk-text">
                      {cert.name}
                    </h4>
                    <p className="text-gray-400 text-sm cyberpunk-text">{cert.issuer}</p>
                    <div
                      className={`mt-2 px-2 py-1 rounded text-xs font-medium inline-block ${
                        cert.type === "award"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : cert.type === "position"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-electric-teal/20 text-electric-teal"
                      }`}
                    >
                      {cert.type.toUpperCase()}
                    </div>
                  </div>
                </div>
              </a>
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
  const IconComponent = experience.icon

  return (
    <div className="relative pl-20">
      <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-r from-electric-teal to-neon-blue border-4 border-slate-dark z-10 cyberpunk-node"></div>
      <div className="absolute left-2 top-2 w-12 h-12 rounded-full bg-slate-dark border-2 border-electric-teal flex items-center justify-center z-10 cyberpunk-icon-container">
        <IconComponent className="w-6 h-6 text-electric-teal" />
      </div>

      <div
        className={`cursor-pointer transition-all duration-300 ${isSelected ? "scale-105" : "hover:scale-102"}`}
        onClick={onSelect}
      >
        <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-gray-700 hover:border-electric-teal/50 transition-all duration-300 cyberpunk-card">
          <div className="flex flex-wrap items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-1 cyberpunk-text">{experience.title}</h3>
              <p className={`text-lg font-semibold bg-gradient-to-r ${experience.color} bg-clip-text text-transparent`}>
                {experience.organization}
              </p>
            </div>
            <div className="text-right text-sm text-gray-400 mt-1">
              <div className="flex items-center space-x-1 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="cyberpunk-text">{experience.period}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="cyberpunk-text">{experience.location}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 mb-4 leading-relaxed cyberpunk-text">{experience.description}</p>

          {isSelected && (
            <div className="mt-6 pt-6 border-t border-gray-700 animate-in slide-in-from-top-2 duration-300">
              <h4 className="flex items-center space-x-2 text-lg font-semibold text-electric-teal mb-4 cyberpunk-text">
                <Award className="w-5 h-5" />
                <span>Key Achievements</span>
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-300 cyberpunk-text">
                    <span className="w-2 h-2 bg-electric-teal rounded-full mt-2 flex-shrink-0 cyberpunk-dot"></span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 text-center">
            <button className="text-electric-teal hover:text-neon-blue transition-colors text-sm font-medium cyberpunk-text">
              {isSelected ? "Hide Details ↑" : "Show More ↓"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InternshipCard({
  internship,
  isSelected,
  onSelect,
}: {
  internship: (typeof internships)[0]
  isSelected: boolean
  onSelect: () => void
}) {
  const IconComponent = internship.icon

  return (
    <div
      className={`cursor-pointer transition-all duration-300 ${isSelected ? "scale-105" : "hover:scale-102"}`}
      onClick={onSelect}
    >
      <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cyberpunk-card">
        <div className="flex items-start space-x-6">
          <div className="p-4 rounded-xl bg-purple-500/20 border border-purple-400/30">
            <IconComponent className="w-8 h-8 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 cyberpunk-text">{internship.title}</h3>
                <p
                  className={`text-xl font-semibold bg-gradient-to-r ${internship.color} bg-clip-text text-transparent`}
                >
                  {internship.organization}
                </p>
              </div>
              <div className="text-right text-sm text-gray-400">
                <div className="flex items-center space-x-1 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="cyberpunk-text">{internship.period}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span className="cyberpunk-text">{internship.location}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed cyberpunk-text">{internship.description}</p>

            {isSelected && (
              <div className="mt-6 pt-6 border-t border-purple-500/30 animate-in slide-in-from-top-2 duration-300">
                <h4 className="flex items-center space-x-2 text-lg font-semibold text-purple-400 mb-4 cyberpunk-text">
                  <Award className="w-5 h-5" />
                  <span>Key Achievements</span>
                </h4>
                <ul className="space-y-2">
                  {internship.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-300 cyberpunk-text">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0 cyberpunk-dot"></span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 text-center">
              <button className="text-purple-400 hover:text-pink-400 transition-colors text-sm font-medium cyberpunk-text">
                {isSelected ? "Hide Details ↑" : "Show More ↓"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EventCard({
  event,
  isSelected,
  onSelect,
}: {
  event: (typeof events)[0]
  isSelected: boolean
  onSelect: () => void
}) {
  const IconComponent = event.icon

  return (
    <div
      className={`cursor-pointer transition-all duration-300 ${isSelected ? "scale-105" : "hover:scale-102"}`}
      onClick={onSelect}
    >
      <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 cyberpunk-card h-full">
        <div className="flex items-start space-x-4 mb-4">
          <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-400/30">
            <IconComponent className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 cyberpunk-text">{event.title}</h3>
          </div>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed cyberpunk-text">{event.description}</p>

        {isSelected && (
          <div className="mt-6 pt-6 border-t border-yellow-500/30 animate-in slide-in-from-top-2 duration-300">
            <h4 className="flex items-center space-x-2 text-lg font-semibold text-yellow-400 mb-4 cyberpunk-text">
              <Award className="w-5 h-5" />
              <span>Key Achievements</span>
            </h4>
            <ul className="space-y-2">
              {event.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start space-x-3 text-gray-300 cyberpunk-text">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0 cyberpunk-dot"></span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 text-center">
          <button className="text-yellow-400 hover:text-orange-400 transition-colors text-sm font-medium cyberpunk-text">
            {isSelected ? "Hide Details ↑" : "Show More ↓"}
          </button>
        </div>
      </div>
    </div>
  )
}
