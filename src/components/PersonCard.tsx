import { useState } from "react"
import type { Person } from "../data/chapter"

type PersonCardProps = {
  person: Person
  index?: number
  variant?: "officer" | "advisor"
}

function initials(name: string) {
  if (name === "Coming soon") return "?"
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function PersonCard({ person, index, variant = "officer" }: PersonCardProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const showPhoto = Boolean(person.photo) && !imgFailed
  const isPending = person.name === "Coming soon"

  return (
    <article className={`person-block ${variant === "advisor" ? "advisor" : ""}`}>
      <div className="person-photo-wrap">
        {showPhoto ? (
          <img
            src={person.photo}
            alt={`${person.name}, ${person.role}`}
            className="person-photo"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="person-avatar" aria-hidden="true">
            {initials(isPending ? person.role : person.name)}
          </div>
        )}
        {!showPhoto && !isPending && (
          <span className="photo-hint">Photo coming soon</span>
        )}
      </div>
      {typeof index === "number" && (
        <span className="person-num">{String(index + 1).padStart(2, "0")}</span>
      )}
      <p className="person-role">{person.role}</p>
      <h3>{person.name}</h3>
      {person.focus && <p className="person-focus">{person.focus}</p>}
      {person.bio ? <p>{person.bio}</p> : null}
      {person.email && (
        <a className="person-email" href={`mailto:${person.email}`}>
          {person.email}
        </a>
      )}
    </article>
  )
}
