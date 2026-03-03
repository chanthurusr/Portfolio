"use client"

import { Mail, Phone, MapPin, Download } from "lucide-react"

const contacts = [
  { icon: Phone, label: "Phone", value: "+91 9597655559", href: "tel:+919597655559" },
  { icon: Mail, label: "Email", value: "chanthuruchanthuru77@gmail.com", href: "mailto:chanthuruchanthuru77@gmail.com" },
  { icon: MapPin, label: "Location", value: "Erode, Tamil Nadu, India", href: "#" },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold heading-text tracking-tight">
            <span className="bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent">Contact</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Ready to collaborate? Let's build something great together.
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-4">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm hover:border-teal/40 hover:shadow-md transition-all duration-300 group card-hover"
            >
              <div className="p-3 rounded-xl bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                <c.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
                <p className="font-semibold text-foreground">{c.value}</p>
              </div>
            </a>
          ))}

          <div className="pt-4">
            <a
              href="https://drive.google.com/file/d/1NsjvOVzdczbMO-2CsS5lBZMF01nwMEJZ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-teal to-navy text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-teal/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
