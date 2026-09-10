import { ViewModeToggle } from '@/components/ViewModeToggle'
import { profile } from '@/content/profile'

export function SiteFooter() {
  return (
    <footer className="bg-canvas border-edge border-t-2">
      <div className="text-meta text-ink-muted mx-auto flex max-w-content flex-wrap items-center gap-x-6 gap-y-4 px-6 py-8">
        <p>{profile.fullName}</p>
        <p>{profile.location}</p>
        <p>
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
            {profile.email}
          </a>
        </p>
        {/* A presentation preference, not information, so the footer is an
            honest home for it. Nothing on the page is reachable only through
            one of the two views. */}
        <div className="ml-auto">
          <ViewModeToggle />
        </div>
      </div>
    </footer>
  )
}
