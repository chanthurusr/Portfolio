"use client"

import { Mail, Phone, MapPin, Download } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 relative">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-electric-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-electric-teal to-neon-blue bg-clip-text text-transparent cyberpunk-glow">
              Connect to SRC
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto cyberpunk-text">
            Ready to collaborate on futuristic projects? Let's build the digital future together.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12 max-w-2xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 cyberpunk-text">Digital Channels</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 9597655559",
                    href: "tel:+919597655559",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "chanthuruchanthuru77@gmail.com",
                    href: "mailto:chanthuruchanthuru77@gmail.com",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Erode, Tamil Nadu, India",
                    href: "#",
                  },
                ].map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group cyberpunk-card"
                  >
                    <div className="p-3 rounded-lg bg-electric-teal/20 text-electric-teal group-hover:scale-110 transition-transform cyberpunk-icon">
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm cyberpunk-text">{contact.label}</p>
                      <p className="text-white font-medium cyberpunk-text">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume Download */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-electric-teal/10 to-neon-blue/10 border border-electric-teal/20 cyberpunk-card">
              <h4 className="text-lg font-bold text-electric-teal mb-4 cyberpunk-text">Download Resume</h4>
              <a
                href="https://drive.google.com/file/d/1FzHipBrxCrfUue0epZmHzzpvRpRg7QjL/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-electric-teal to-neon-blue rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-lg shadow-electric-teal/25 cyberpunk-button"
              >
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
