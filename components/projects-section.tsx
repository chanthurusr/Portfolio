"use client"

import { useState } from "react"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Screen Time Monitoring System",
    year: "2025",
    description: "A real-time monitoring system that tracks application usage, window activity, and browser behaviour. Captured active screen duration, extracted browser URLs and domains, and securely stored data in Snowflake for analytics.",
    tech: ["Python", "Snowflake", "SQL"],
    features: ["Real-time application usage and window activity tracking", "Browser URL and domain extraction", "Secure data storage in Snowflake Data Cloud", "SQL-based reports for hourly, daily, and application-wise analysis", "User-wise and website usage productivity insights"],
  },
  {
    id: 2,
    title: "Tech Matrix",
    year: "2025",
    description: "A responsive website for the Computer Science Association to display events, member profiles, and updates. Designed interactive sections for announcements and highlights across all devices.",
    tech: ["React"],
    features: ["Interactive event display and announcements", "Member profiles and association updates", "Responsive design across all devices", "Student engagement-focused UI/UX", "Smooth navigation and accessibility"],
  },
  {
    id: 3,
    title: "Milk Delivery Management App",
    year: "2025",
    description: "User-friendly milk delivery management app with account creation, product selection, scheduling, real-time order tracking, and secure payments with location-based services.",
    tech: ["React Native", "Node.js", "MongoDB", "Express.js", "Google Maps API"],
    features: ["Account creation and product selection interface", "Delivery scheduling and real-time order tracking", "Secure payment integration", "Location-based route optimization", "Admin dashboard for logistics management"],
  },
  {
    id: 4,
    title: "Hostel Management System",
    year: "2024",
    description: "Comprehensive hostel management system for student accommodation with room allocation, fee management, visitor tracking, and maintenance requests.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
    features: ["Student registration and room allocation", "Fee management and payment tracking", "Visitor management and security logs", "Maintenance request system", "Warden dashboard for hostel administration"],
  },
  {
    id: 5,
    title: "Garbage Detection Using CNN",
    year: "2023",
    description: "CNN-based Garbage Detection System achieving 92.96% accuracy in classifying waste into categories like cardboard, glass, and metal using TensorFlow and Keras.",
    tech: ["TensorFlow", "Keras", "Python", "CNN"],
    features: ["92.96% accuracy in waste classification", "Pre-processed 2,467 images dataset", "Multi-category classification (cardboard, glass, metal)", "Model optimization using TensorFlow and Keras", "Published research findings on recycling efficiency"],
  },
  {
    id: 6,
    title: "Smart Urban Development System",
    year: "2025",
    description: "Urban area development system integrating weather forecasting, air pollution monitoring, accident detection, and smart traffic management using OpenCV and real-time data processing.",
    tech: ["Node.js", "React.js", "MongoDB", "Express.js", "OpenCV"],
    features: ["Real-time weather forecasting with 3-day historical data", "Air pollution monitoring and alerts", "Automated accident detection with emergency alerts", "Smart traffic signal automation at zebra crossings", "AI-driven pedestrian detection and traffic flow optimization"],
  },
]

export function ProjectsSection() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold heading-text tracking-tight">
            <span className="bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent">Projects</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelected(selected === p.id ? null : p.id)}
              className={`group relative rounded-2xl bg-card border border-border shadow-sm overflow-hidden cursor-pointer transition-all duration-300 card-hover ${
                selected === p.id ? "ring-2 ring-teal/50 shadow-lg" : ""
              }`}
            >
              {/* Top color bar */}
              <div className="h-1 bg-gradient-to-r from-teal to-navy" />

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-teal transition-colors leading-tight flex-1 pr-2">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs flex-shrink-0 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{p.year}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-navy/10 text-navy text-xs font-medium rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>

                {selected === p.id && (
                  <div className="pt-4 border-t border-border space-y-2 animate-in slide-in-from-top-2 duration-200">
                    {p.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button className="flex items-center gap-1 text-xs font-medium text-teal hover:text-navy transition-colors mx-auto">
                  {selected === p.id ? (
                    <>Hide Details <ChevronUp className="w-3 h-3" /></>
                  ) : (
                    <>View Details <ChevronDown className="w-3 h-3" /></>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
