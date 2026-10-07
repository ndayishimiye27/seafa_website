import { formatEventDate } from "@/lib/content-utils";
import type { Album } from "@/types/content";

interface AlbumMetadataProps {
  album: Album;
}

export function AlbumMetadata({ album }: AlbumMetadataProps) {
  const startDate = formatEventDate(album.eventDate);
  const endDate = formatEventDate(album.endDate);

  const dateLabel =
    startDate && endDate && startDate !== endDate
      ? `${startDate} – ${endDate}`
      : startDate;

  if (!dateLabel && !album.location && album.images.length === 0) {
    return null;
  }

  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
      {dateLabel ? (
        <div>
          <dt className="font-semibold text-slate-900">Date</dt>
          <dd className="mt-1 text-slate-600">{dateLabel}</dd>
        </div>
      ) : null}

      {album.location ? (
        <div>
          <dt className="font-semibold text-slate-900">Lieu</dt>
          <dd className="mt-1 text-slate-600">{album.location}</dd>
        </div>
      ) : null}

      <div>
        <dt className="font-semibold text-slate-900">Photographies</dt>
        <dd className="mt-1 text-slate-600">{album.images.length}</dd>
      </div>
      {album.videos?.length ? (
        <div>
          <dt className="font-semibold text-slate-900">Vidéos</dt>
          <dd className="mt-1 text-slate-600">{album.videos.length}</dd>
        </div>
      ) : null}
    </dl>
  );
}
