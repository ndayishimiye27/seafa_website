import Image from "next/image";
import { getHistoryYears } from "@/data/history";
import { foundersRows } from "@/data/founders";
import { getAlbumById } from "@/lib/content";
import { resolveMedia } from "@/lib/media";
import { MediaSlot, TextLink } from "@/components/ui/editorial";

export function Timeline({ compact = false }: { compact?: boolean }) {
  const years = getHistoryYears().filter(
    (item) => !compact || ["2013", "2016", "2026"].includes(item.year),
  );
  const founders = resolveMedia("media-history-2013-founding-members-01");
  return (
    <ol className="timeline">
      {years.map(({ year, title, events }) => (
        <li key={year} id={compact ? undefined : "year-" + year}>
          <span className="timeline-year">{year}</span>
          <details open={compact || year === "2013"}>
            <summary>
              <h3>{title}</h3>
              <span aria-hidden="true">+</span>
            </summary>
            <div className="timeline-body">
              {events.map((event) => {
                const album = event.albumId
                  ? getAlbumById(event.albumId)
                  : null;
                return (
                  <article key={event.id} className="timeline-event">
                    {events.length > 1 && <h4>{event.title}</h4>}
                    <p>{event.description}</p>
                    {!compact && (
                      <>
                        {event.id === "history-2013" && founders ? (
                          <figure className="founders-figure">
                            <Image
                              src={founders.src}
                              alt={founders.alt}
                              width={founders.width}
                              height={founders.height}
                              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 75vw, 680px"
                            />
                            <figcaption>
                              <strong>Les membres fondateurs</strong>
                              <p>De gauche à droite, puis de haut en bas :</p>
                              <ol>
                                {foundersRows.map((row, index) => (
                                  <li key={index}>{row.join(" · ")}</li>
                                ))}
                              </ol>
                            </figcaption>
                          </figure>
                        ) : album ? (
                          <>
                            <MediaSlot
                              mediaId={album.coverMediaId}
                              label={event.title}
                            />
                            <TextLink href={"/gallery/" + album.slug}>
                              Voir l’album
                            </TextLink>
                          </>
                        ) : event.mediaIds?.length ? (
                          event.mediaIds.map((id) => (
                            <MediaSlot
                              key={id}
                              mediaId={id}
                              label={event.title}
                            />
                          ))
                        ) : event.mediaId ? (
                          <MediaSlot
                            mediaId={event.mediaId}
                            label={event.title}
                          />
                        ) : null}
                        <p className="source">{event.source}</p>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
