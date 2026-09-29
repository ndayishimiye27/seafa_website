import Link from "next/link";
import { MediaSlot } from "@/components/ui/editorial";
import { getAlbumForEvent } from "@/lib/content";
import { formatEventDate } from "@/lib/content-utils";
import type { Event } from "@/types/content";
export function EventCard({ event }: { event: Event; priority?: boolean }) {
  const album = getAlbumForEvent(event);
  return (
    <article className="interview-card">
      <MediaSlot
        mediaId={album?.coverMediaId ?? album?.images[0]?.mediaId}
        label={event.title}
      />
      <div className="card-body">
        <p className="eyebrow">
          {formatEventDate(event.startDate) ?? "Date à confirmer"}
        </p>
        <h3>{event.title}</h3>
        {event.location && <p>{event.location}</p>}
        <p>{event.summary}</p>
        <Link className="text-link" href={`/events/${event.slug}`}>
          Découvrir l’événement ↗
        </Link>
      </div>
    </article>
  );
}
