import { getPublishedMilestones } from "@/data/history";
import { getAlbumById } from "@/lib/content";
import { formatEventDate } from "@/lib/content-utils";
import { MediaSlot, TextLink } from "@/components/ui/editorial";
export function Timeline({ compact = false }: { compact?: boolean }) {
  const items = getPublishedMilestones();
  return (
    <ol className="timeline">
      {(compact
        ? items.filter((item) =>
            [
              "history-2013",
              "history-2016",
              "history-anniversaire-2026",
            ].includes(item.id),
          )
        : items
      ).map((item) => {
        const album = item.albumId ? getAlbumById(item.albumId) : null;
        return (
          <li key={item.id}>
            <span className="timeline-year">
              {item.date?.value.slice(0, 4)}
            </span>
            <details open={compact}>
              <summary>
                <h3>{item.title}</h3>
                <span aria-hidden="true">+</span>
              </summary>
              <div className="timeline-body">
                {item.date && item.date.precision !== "year" && (
                  <p className="source">
                    <time dateTime={item.date.value}>
                      {formatEventDate(item.date)}
                    </time>
                  </p>
                )}
                <p>{item.description}</p>
                {!compact && (
                  <>
                    <p className="source">{item.source}</p>
                    {album ? (
                      <>
                        <MediaSlot
                          mediaId={album.coverMediaId}
                          label={item.title}
                        />
                        <TextLink href={`/gallery/${album.slug}`}>
                          Voir l’album
                        </TextLink>
                      </>
                    ) : item.mediaIds?.length ? (
                      item.mediaIds.map((id) => (
                        <MediaSlot key={id} mediaId={id} label={item.title} />
                      ))
                    ) : item.mediaId ? (
                      <MediaSlot mediaId={item.mediaId} label={item.title} />
                    ) : null}
                  </>
                )}
              </div>
            </details>
          </li>
        );
      })}
    </ol>
  );
}
