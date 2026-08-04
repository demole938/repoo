import { Download } from 'lucide-react'
import Reveal from './Reveal'

const WHATSAPP_URL = 'https://wa.me/201060449876'

const PROJECTS = [
  { src: '/projects/meta-1.png', platform: 'META ADS MANAGER', metric: '214 campaigns · +400K SAR spend' },
  { src: '/projects/meta-2.png', platform: 'META ADS MANAGER', metric: 'High-ticket lead gen · live scaling' },
  { src: '/projects/google-2.png', platform: 'GOOGLE ADS', metric: '1.11M clicks · 30.2K conversions' },
  { src: '/projects/google-1.png', platform: 'GOOGLE ADS', metric: '124K clicks · 3.85K conversions (2026)' },
  { src: '/projects/ga4.png', platform: 'GOOGLE ANALYTICS 4', metric: '251K users · 6.6M SAR tracked revenue' },
  { src: '/projects/linkedin.png', platform: 'LINKEDIN ADS', metric: '172K SAR spend · CPL from SAR 1.19' },
  { src: '/projects/tiktok-2.png', platform: 'TIKTOK ADS MANAGER', metric: '177 campaigns · 5.1M+ impressions' },
  { src: '/projects/salla-2.png', platform: 'SALLA E-COMMERCE', metric: '792.76K store visits' },
]

export default function SectionThree() {
  return (
    <section
      id="projects"
      className="min-h-screen px-5 pb-12 pt-24 sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <Reveal delay={120}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
            Proven Results
          </span>
        </Reveal>
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Real dashboards, real budgets — a transparent look at the numbers behind my
            campaigns.
          </p>
        </Reveal>
      </div>

      {/* Headline */}
      <Reveal delay={180}>
        <h2 className="mt-10 text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
          Real spend.
          <br />
          Real results.
        </h2>
      </Reveal>

      {/* Screenshot grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.src} delay={150 + i * 90}>
            <div className="group rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
              <div className="flex items-center justify-between px-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                  {project.platform}
                </span>
                <span className="text-right text-xs font-medium text-white sm:text-sm">
                  {project.metric}
                </span>
              </div>
              <img
                src={project.src}
                alt={`${project.platform} — ${project.metric}`}
                loading="lazy"
                className="mt-3 w-full rounded-lg border border-white/10 object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>

      {/* Bottom CTA row */}
      <Reveal delay={300}>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
          >
            Download CV
            <Download size={14} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
          >
            Free consultation
          </a>
        </div>
      </Reveal>
    </section>
  )
}
