"use client"

import { useState } from "react"
import { Calendar, MapPin, Award, GraduationCap, Briefcase, Users, Trophy, ChevronDown, ChevronUp } from "lucide-react"
import { LeetCodeWidget } from "./leetcode-widget"

const education = [
  {
    id: 1,
    title: "B.E (CSE)",
    org: "Nandha Engineering College",
    location: "Erode, Tamil Nadu",
    period: "2022 - Present",
    desc: "Bachelor of Engineering in Computer Science and Engineering with specialization in full-stack development and AI/ML technologies.",
    achievements: ["CGPA: 7.8 (Up to 4th Semester)", "Office Bearer (2023-2025)", "Core Member (2025-2026)"],
    color: "teal",
  },
  {
    id: 2,
    title: "HSC",
    org: "Vijay Vikas Matric Higher Secondary School",
    location: "Tamil Nadu",
    period: "2020 - 2022",
    desc: "Higher Secondary Certificate.",
    achievements: ["Percentage: 70.1%"],
    color: "navy",
  },
  {
    id: 3,
    title: "SSLC",
    org: "Vijay Vikas Matric Higher Secondary School",
    location: "Tamil Nadu",
    period: "2019 - 2020",
    desc: "Secondary School Leaving Certificate.",
    achievements: ["Percentage: 70.8%"],
    color: "navy",
  },
]

const events = [
  {
    id: 1,
    title: "BRAINIACS",
    desc: "Organized and hosted a team-based quiz and coding challenge, testing participants' computer science knowledge, teamwork, and problem-solving skills.",
    achievements: ["Successfully organized team-based quiz competition", "Designed computer science knowledge challenges", "Enhanced participants' teamwork and problem-solving skills", "Managed event logistics and coordination"],
  },
  {
    id: 2,
    title: "Codebreaker",
    desc: "Conducted the first round, where participants identified technology names based on given images, followed by a coding challenge in the second round. Led the event coordination and hosting.",
    achievements: ["Designed innovative technology identification challenges", "Conducted multi-round coding competitions", "Led event coordination and hosting", "Enhanced participants' engagement and learning experience"],
  },
]

const certs = [
  { name: "NPTEL - Cyber Security and Privacy", issuer: "NPTEL", type: "certificate", link: "https://drive.google.com/file/d/1fvqNh7u2rqSpRx278nGiXz5qncNI0ZRH/view" },
  { name: "Cyber Crimes in Electronic Payment", issuer: "Workshop", type: "certificate", link: "https://drive.google.com/file/d/1VOqUXJYJxmqm1-x1LpLs-bKs0nbZTphW/view" },
  { name: "AR/VR Workshop", issuer: "Machenn Innovations", type: "certificate", link: "#" },
  { name: "Java (Basic)", issuer: "HackerRank", type: "certificate", link: "https://www.hackerrank.com/certificates/iframe/c0b021c55f64" },
  { name: "SQL (Basic)", issuer: "HackerRank", type: "certificate", link: "https://www.hackerrank.com/certificates/iframe/9d6432af447f" },
  { name: "Poster Making - FIRST PRIZE", issuer: "IRTT, Erode", type: "award", link: "https://drive.google.com/file/d/16ovalE1oOh-CGbwJvHDWdlr9mfXsp4af/view" },
  { name: "Office Bearer", issuer: "Nandha Engineering College (2023-2025)", type: "position", link: "#" },
  { name: "Core Member", issuer: "Nandha Engineering College (2025-2026)", type: "position", link: "#" },
]

export function ExperienceSection() {
  const [openEdu, setOpenEdu] = useState<number | null>(null)
  const [openIntern, setOpenIntern] = useState(false)
  const [openEvent, setOpenEvent] = useState<number | null>(null)

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold heading-text tracking-tight">
            <span className="bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent">Experience</span>
          </h2>
        </div>

        {/* Education */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-8">
            <GraduationCap className="w-6 h-6 text-teal" />
            Education
          </h3>
          <div className="relative pl-8 border-l-2 border-teal/30 space-y-8">
            {education.map((e) => (
              <div key={e.id} className="relative">
                <div className="absolute -left-[25px] top-6 w-4 h-4 rounded-full bg-teal border-4 border-background" />
                <div
                  className={`p-6 rounded-2xl bg-white border border-border shadow-sm cursor-pointer card-hover ${openEdu === e.id ? "ring-2 ring-teal/30" : ""}`}
                  onClick={() => setOpenEdu(openEdu === e.id ? null : e.id)}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">{e.title}</h4>
                      <p className="font-semibold text-teal">{e.org}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{e.period}</div>
                      <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{e.location}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{e.desc}</p>
                  {openEdu === e.id && (
                    <div className="mt-4 pt-4 border-t border-border space-y-2 animate-in slide-in-from-top-2 duration-200">
                      {e.achievements.map((a, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                          {a}
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="flex items-center gap-1 text-xs font-medium text-teal mt-3 mx-auto">
                    {openEdu === e.id ? <>Hide <ChevronUp className="w-3 h-3" /></> : <>Details <ChevronDown className="w-3 h-3" /></>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Internship */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-8">
            <Briefcase className="w-6 h-6 text-violet-500" />
            Professional Experience
          </h3>
          <div
            className={`p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 cursor-pointer card-hover ${openIntern ? "ring-2 ring-violet-300" : ""}`}
            onClick={() => setOpenIntern(!openIntern)}
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h4 className="text-xl font-bold text-foreground">AR/VR Intern</h4>
                <p className="font-semibold text-violet-600">All Real Company</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />2025</div>
                <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />Remote</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Developed immersive AR/VR applications using Unity and Blender with Meta Quest 2 integration.</p>
            {openIntern && (
              <div className="mt-4 pt-4 border-t border-violet-200 space-y-2 animate-in slide-in-from-top-2 duration-200">
                {["Developed Gun Assembly Game using Unity and Blender", "Created realistic AR/VR environment with animations", "Implemented health mechanics and death animations", "Integrated with Meta Quest 2 via Developer Hub", "Gained expertise in VR game development and interaction mechanics"].map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            )}
            <button className="flex items-center gap-1 text-xs font-medium text-violet-500 mt-3 mx-auto">
              {openIntern ? <>Hide <ChevronUp className="w-3 h-3" /></> : <>Details <ChevronDown className="w-3 h-3" /></>}
            </button>
          </div>
        </div>

        {/* Events */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-8">
            <Users className="w-6 h-6 text-amber-500" />
            Event Leadership
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className={`p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 cursor-pointer card-hover ${openEvent === ev.id ? "ring-2 ring-amber-300" : ""}`}
                onClick={() => setOpenEvent(openEvent === ev.id ? null : ev.id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h4 className="text-lg font-bold text-foreground">{ev.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{ev.desc}</p>
                {openEvent === ev.id && (
                  <div className="mt-4 pt-4 border-t border-amber-200 space-y-2 animate-in slide-in-from-top-2 duration-200">
                    {ev.achievements.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                )}
                <button className="flex items-center gap-1 text-xs font-medium text-amber-500 mt-3 mx-auto">
                  {openEvent === ev.id ? <>Hide <ChevronUp className="w-3 h-3" /></> : <>Details <ChevronDown className="w-3 h-3" /></>}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* LeetCode */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-8">
            <Award className="w-6 h-6 text-orange-500" />
            Coding Performance
          </h3>
          <LeetCodeWidget />
        </div>

        {/* Achievements */}
        <div className="max-w-5xl mx-auto">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-8">
            <Award className="w-6 h-6 text-teal" />
            Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map((c) => (
              <a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-white border border-border shadow-sm hover:shadow-md hover:border-teal/40 transition-all duration-300 group card-hover"
              >
                <h4 className="font-bold text-foreground group-hover:text-teal transition-colors text-sm leading-tight mb-1">
                  {c.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">{c.issuer}</p>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                  c.type === "award" ? "bg-amber-100 text-amber-700"
                    : c.type === "position" ? "bg-violet-100 text-violet-700"
                    : "bg-teal/10 text-teal-dark"
                }`}>
                  {c.type.toUpperCase()}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
