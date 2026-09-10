import { Eyebrow } from './Eyebrow'

export function SectionHeading({
  eyebrow,
  heading,
  id,
}: {
  eyebrow: string
  heading: string
  id: string
}) {
  return (
    <div className="mb-8 md:mb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={`${id}-heading`} className="text-section mt-2 font-semibold">
        {heading}
      </h2>
    </div>
  )
}
