"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BarChart3, CheckCircle2, FolderKanban, LineChart } from "lucide-react"

export interface ProjectItem {
  id: number
  title: string
  category: "BI & Dashboard" | "Operations & Data" | "Analytics & Research"
  role: string
  period: string
  image: string
  shortDescription: string
  description: string
  highlights?: string[]
  technologies: string[]
  featured?: boolean
  href?: string
}

interface ProjectCardProps {
  project: ProjectItem
  onSelect: (project: ProjectItem) => void
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const getCategoryIcon = () => {
    switch (project.category) {
      case "BI & Dashboard":
        return BarChart3
      case "Operations & Data":
        return FolderKanban
      default:
        return LineChart
    }
  }

  const CategoryIcon = getCategoryIcon()

  return (
    <div className="group h-full flex flex-col justify-between rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1.5 bg-card/60 hover:bg-card">
      <div>
        {/* Gambar Dashboard */}
        {project.href ? (
          <Link
            href={project.href}
            className="block relative w-full h-48 overflow-hidden bg-muted border-b border-border/50 cursor-pointer"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        ) : (
          <div
            onClick={() => onSelect(project)}
            className="relative w-full h-48 overflow-hidden bg-muted border-b border-border/50 cursor-pointer"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Category & Period */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <CategoryIcon className="w-3.5 h-3.5" />
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              {project.featured && (
                <Badge className="bg-primary text-primary-foreground text-[10px]">Featured</Badge>
              )}
              <span className="text-xs text-muted-foreground">{project.period}</span>
            </div>
          </div>

          {/* Title & Role */}
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="text-xs font-medium text-primary/90 mt-1">{project.role}</p>
          </div>

          {/* Short Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{project.shortDescription}</p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-1.5 pt-1">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Technologies & Detail / Live Demo Button */}
      <div className="px-6 pb-6 pt-4 mt-2 border-t border-border/50 space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs font-medium">
              {tech}
            </Badge>
          ))}
        </div>

        {project.href ? (
          <Button
            asChild
            variant="default"
            size="sm"
            className="w-full justify-between rounded-xl"
          >
            <Link href={project.href}>
              <span>Coba Live Dashboard</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSelect(project)}
            className="w-full justify-between rounded-xl border-border/70 hover:border-primary/50 hover:bg-primary/5"
          >
            <span>Lihat Detail Proyek</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}