import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ActionLink } from '@/components/ActionLink'
import { ChipList } from '@/components/Chip'
import { Icon, type IconName } from '@/components/Icon'
import { Panel, type PanelTone } from '@/components/Panel'
import { StatBlock } from '@/components/StatBlock'
import { ViewModeToggle } from '@/components/ViewModeToggle'
import '@/styles/index.css'

const iconNames: IconName[] = [
  'gem',
  'leaf',
  'hammer',
  'scroll',
  'signpost',
  'chest',
  'flag',
  'spark',
  'terminal',
  'pin',
]

const biomes = [
  { name: 'sky', className: 'bg-sky' },
  { name: 'meadow', className: 'bg-meadow' },
  { name: 'sand', className: 'bg-sand' },
  { name: 'dusk', className: 'bg-dusk' },
  { name: 'canvas', className: 'bg-canvas' },
]

const tones: PanelTone[] = ['ember', 'leaf', 'tide']

export function Guide() {
  return (
    <main className="mx-auto max-w-content space-y-8 p-6">
      <header className="flex flex-wrap items-center gap-4">
        <h1 className="font-display text-hero font-semibold">Field Kit</h1>
        <ViewModeToggle />
      </header>

      <section className="space-y-2">
        <h2 className="font-display text-section font-semibold">Biome bands</h2>
        <div className="grid gap-2 sm:grid-cols-5">
          {biomes.map((biome) => (
            <div
              key={biome.name}
              className={`${biome.className} border-edge rounded-md border-2 border-b-(length:--edge-md) p-4`}
            >
              <p className="font-medium">{biome.name}</p>
              <p className="text-ink-muted text-meta">Muted body text</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-section font-semibold">Glyphs</h2>
        <div className="bg-surface border-edge flex flex-wrap gap-4 rounded-md border-2 border-b-(length:--edge-md) p-4">
          {iconNames.map((name) => (
            <div key={name} className="w-20 text-center">
              <Icon name={name} className="mx-auto size-10" />
              <p className="text-meta">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-section font-semibold">Panels</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {tones.map((tone) => (
            <Panel key={tone} title={`${tone} ribbon`} icon="scroll" tone={tone}>
              <p>A framed surface with a titled bar and a solid bottom edge.</p>
            </Panel>
          ))}
        </div>
        <Panel>
          <p>A panel with no bar.</p>
        </Panel>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-section font-semibold">Controls</h2>
        <div className="flex flex-wrap items-center gap-3">
          <ActionLink href="#" variant="primary">
            Primary
          </ActionLink>
          <ActionLink href="#" variant="secondary">
            Secondary
          </ActionLink>
          <ActionLink href="#" variant="ghost">
            Ghost
          </ActionLink>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-section font-semibold">Chips and stats</h2>
        <ChipList items={['TypeScript', 'Spring Boot', 'PostgreSQL', 'Docker']} label="Example" />
        <StatBlock
          label="Example stats"
          stats={[
            { label: 'Projects', value: '4' },
            { label: 'Languages', value: '8' },
            { label: 'Since', value: '2022' },
          ]}
        />
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Guide />
  </StrictMode>,
)
