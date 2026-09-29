import { BrandedMediaPlaceholder } from "@/components/albums/branded-media-placeholder";
import Image from "next/image";
import type { Player } from "@/types/content";
const positions = {
  goalkeeper: "Gardien",
  defender: "Défenseur",
  midfielder: "Milieu",
  forward: "Attaquant",
};
export function PlayerCard({ player }: { player: Player; priority?: boolean }) {
  return (
    <article className="interview-card">
      <div className="media-slot portrait">
        {player.photograph ? (
          <Image
            src={player.photograph.src}
            alt={player.photograph.alt}
            fill
            sizes="(max-width:640px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <BrandedMediaPlaceholder label="Portrait à venir" />
        )}
      </div>
      <div className="card-body">
        <h3>{player.fullName}</h3>
        <p>{player.position ? positions[player.position] : "Membre SEAFA"}</p>
        {player.yearJoined && <p>Depuis {player.yearJoined}</p>}
        {player.biography && <p>{player.biography}</p>}
      </div>
    </article>
  );
}
