import { getPublishedInterviews } from "@/data/interviews";
import { MediaSlot, TextLink } from "@/components/ui/editorial";
import { interviewPages } from "@/data/interview-pages";
export function InterviewGrid() {
  return (
    <div className="interview-grid">
      {getPublishedInterviews().map((person) => (
        <article key={person.id} className="interview-card">
          {person.portraitMediaId && (
            <MediaSlot
              mediaId={person.portraitMediaId}
              label={person.nickname ?? person.fullName}
              portrait
            />
          )}
          <div className="card-body">
            <p className="eyebrow">
              {person.kind === "memory" ? "Mémoire collective" : "Témoignage"}
            </p>
            <h3>{person.fullName}</h3>
            {person.nickname && <p className="nickname">{person.nickname}</p>}
            <p className="source">{person.relationship}</p>
            <p className="highlight">{person.highlight}</p>
            <p>{person.summary}</p>
            <TextLink href={`/interviews/${person.slug}`}>
              {person.kind === "memory"
                ? "Découvrir ses souvenirs"
                : "Lire son témoignage"}
            </TextLink>
            {interviewPages[person.id] && (
              <TextLink
                href={`/interviews/book?page=${interviewPages[person.id]}`}
              >
                {person.kind === "memory"
                  ? "La source dans le livret"
                  : "L’entretien original"}
              </TextLink>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
