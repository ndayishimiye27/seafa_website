import { ActivityCard } from "@/components/activities/activity-card";
import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import type { Activity } from "@/types/content";

interface ActivityGridProps {
  activities: readonly Activity[];
}

export function ActivityGrid({ activities }: ActivityGridProps) {
  if (activities.length === 0) {
    return (
      <EmptyAlbumState
        title="Les activités arrivent prochainement"
        message="Les activités officielles seront publiées ici après la validation des informations et des photographies."
        actionLabel="Proposer un match"
        actionHref="/request-match"
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
