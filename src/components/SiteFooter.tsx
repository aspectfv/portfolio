import { profile } from '@/content/profile'

export function SiteFooter() {
  return (
    <footer className="bg-canvas border-hairline border-t">
      <div className="text-meta text-ink-muted mx-auto flex max-w-content flex-wrap items-center gap-x-4 gap-y-2 px-6 py-8">
        <p>{profile.fullName}</p>
        <p>{profile.location}</p>
        <p className="ml-auto">
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
            {profile.email}
          </a>
        </p>
      </div>
    </footer>
  )
}
