import { getPublishedMilestones } from "@/data/history";
import { getAlbumById } from "@/lib/content";
import { AlbumGallery } from "@/components/albums/album-gallery";
import { MediaSlot, TextLink } from "@/components/ui/editorial";
export function Timeline({ compact = false }: { compact?: boolean }) {
  const items = getPublishedMilestones();
  return (
    <ol className="timeline">
      {(compact
        ? items.filter((item) =>
            ["2013", "2014", "2016"].includes(item.date?.value ?? ""),
          )
        : items
      ).map((item) => {
        const album = item.albumId ? getAlbumById(item.albumId) : null;
        return (
          <li key={item.id}>
            <span className="timeline-year">{item.date?.value}</span>
            <details open={compact}>
              <summary>
                <h3>{item.title}</h3>
                <span aria-hidden="true">+</span>
              </summary>
              <div className="timeline-body">
                <p>{item.description}</p>
                {!compact && (
                  <>
                    <p className="source">{item.source}</p>
                    {album ? (
                      <>
                        <AlbumGallery album={album} />
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
