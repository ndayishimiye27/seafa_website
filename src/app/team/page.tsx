import Image from "next/image";
import { archivedPeople, type PortraitArchive } from "@/data/people";
import { MediaSlot, Section, TextLink } from "@/components/ui/editorial";
import { pageMetadata } from "@/lib/metadata";

import { BrandedMediaPlaceholder } from "@/components/albums/branded-media-placeholder";
import { SquadGrid } from "@/components/team/squad-grid";
import {
  formerPresidents,
  honoraryMembers,
  leadership,
  players,
  support,
} from "@/data/placeholders";
import type { LeadershipMember, SupportMember } from "@/types/content";

export const metadata = pageMetadata(
  "Équipe et leadership",
  "/team",
  "Découvrez l’effectif, la direction, l’encadrement technique et les membres qui représentent l’héritage de SEAFA.",
);

const leadershipLabels: Record<LeadershipMember["role"], string> = {
  president: "Président",
  "vice-president": "Vice-président",
  secretary: "Secrétaire",
  treasurer: "Trésorier",
  "disciplinary-committee": "Comité disciplinaire",
  "match-statistics-administrator": "Responsable matches et statistiques",
  "executive-member": "Membre du comité exécutif",
};

const supportLabels: Record<SupportMember["role"], string> = {
  "coach-coordinator": "Entraîneur ou coordinateur football",
  "assistant-coach": "Entraîneur adjoint",
  "physiotherapy-medical": "Représentant médical",
  "equipment-manager": "Responsable des équipements",
  "match-support": "Personnel de soutien",
};

interface PersonCardProps {
  name: string;
  role: string;
  biography?: string;
  photograph?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

function PersonCard({ name, role, biography, photograph }: PersonCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {photograph ? (
          <Image
            src={photograph.src}
            alt={photograph.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain"
          />
        ) : (
          <BrandedMediaPlaceholder
            label={`Photographie à venir pour ${name}`}
            className="h-full min-h-0"
          />
        )}
      </div>

      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#806026]">
          {role}
        </p>

        <h3 className="mt-2 text-xl font-bold text-[#071d3b]">{name}</h3>

        {biography ? (
          <p className="mt-3 leading-7 text-slate-600">{biography}</p>
        ) : null}
      </div>
    </article>
  );
}

function ArchivedPortraits({
  section,
}: {
  section: PortraitArchive["section"];
}) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {archivedPeople
        .filter((person) => person.section === section)
        .map((person) => (
          <article className="interview-card" key={person.mediaId}>
            <MediaSlot mediaId={person.mediaId} label={person.name} portrait />
            <div className="card-body">
              <p className="eyebrow">
                {person.roleLabel ?? "Portrait d’archive"}
              </p>
              <h3 style={{ color: "#071d3b" }}>{person.name}</h3>
            </div>
          </article>
        ))}
    </div>
  );
}

export default function TeamPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#071d3b] text-white">
        <div
          className="surface-grid absolute inset-0 opacity-50"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 78% 25%, rgba(66,112,165,0.4), transparent 30%), radial-gradient(circle at 15% 80%, rgba(183,146,61,0.22), transparent 35%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d0ad59]">
            Notre équipe
          </p>

          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Les membres qui portent SEAFA
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">
            Découvrez les visages de SEAFA et les portraits de nos archives. Les
            fonctions historiques sont présentées dans leur contexte ;
            l’effectif et la direction actuels restent à confirmer.
          </p>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="squad-title">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              Effectif actuel
            </p>

            <h2
              id="squad-title"
              className="mt-4 text-4xl font-black tracking-tight text-[#071d3b] sm:text-5xl"
            >
              Les joueurs
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Seules les informations et statistiques approuvées seront rendues
              publiques.
            </p>
          </div>

          <SquadGrid players={players} />
        </div>
      </section>

      <section className="bg-slate-50" aria-labelledby="leadership-title">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              Gouvernance
            </p>

            <h2
              id="leadership-title"
              className="mt-4 text-4xl font-black tracking-tight text-[#071d3b] sm:text-5xl"
            >
              Direction
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              La présidence et le comité exécutif assurent la coordination, la
              responsabilité et la continuité de SEAFA.
            </p>
          </div>

          {leadership.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((member) => (
                <PersonCard
                  key={member.id}
                  name={member.fullName}
                  role={member.roleLabel ?? leadershipLabels[member.role]}
                  biography={member.biography}
                  photograph={member.photograph}
                />
              ))}
            </div>
          ) : (
            <>
              <p className="max-w-3xl leading-7 text-slate-600">
                Le portrait de Tony est classé en 2024 dans la médiathèque.
                Cette archive ne confirme pas la composition actuelle de la
                direction.
              </p>
              <ArchivedPortraits section="leadership" />
            </>
          )}
          {leadership.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-4 text-xl font-bold text-[#071d3b]">
                Portraits de nos anciennes présidences
              </h3>
              <ArchivedPortraits section="leadership" />
            </div>
          )}
        </div>
      </section>

      <section className="bg-white" aria-labelledby="support-title">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              Encadrement
            </p>

            <h2
              id="support-title"
              className="mt-4 text-4xl font-black tracking-tight text-[#071d3b] sm:text-5xl"
            >
              Équipe technique et soutien
            </h2>
          </div>

          {support.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {support.map((member) => (
                <PersonCard
                  key={member.id}
                  name={member.fullName}
                  role={member.roleLabel ?? supportLabels[member.role]}
                  biography={member.biography}
                  photograph={member.photograph}
                />
              ))}
            </div>
          ) : (
            <>
              <p className="max-w-3xl leading-7 text-slate-600">
                Portrait d’archive de Biggie, coach. La date de ce portrait et
                l’encadrement actuel restent à confirmer.
              </p>
              <ArchivedPortraits section="support" />
            </>
          )}
        </div>
      </section>

      <section
        className="bg-[#071d3b] text-white"
        aria-labelledby="heritage-members-title"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d0ad59]">
              Héritage
            </p>

            <h2
              id="heritage-members-title"
              className="mt-4 text-4xl font-black tracking-tight sm:text-5xl"
            >
              Membres honorifiques et anciens dirigeants
            </h2>

            <p className="mt-5 leading-8 text-white/70">
              Un espace respectueux pour reconnaître les fondateurs, anciens
              présidents, anciens capitaines, membres de longue date et
              contributeurs importants.
            </p>
          </div>

          {formerPresidents.length > 0 || honoraryMembers.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {formerPresidents.map((member) => (
                <article
                  key={member.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d0ad59]">
                    Ancien président
                  </p>

                  <h3 className="mt-3 text-xl font-bold">{member.fullName}</h3>

                  {member.biography ? (
                    <p className="mt-3 leading-7 text-white/65">
                      {member.biography}
                    </p>
                  ) : null}
                  {member.id === "president-arnaud" && (
                    <p className="mt-3 text-sm text-white/75">
                      Premier président — portrait d’archive
                    </p>
                  )}
                </article>
              ))}

              {honoraryMembers.map((member) => (
                <article
                  key={member.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d0ad59]">
                    Membre honorifique
                  </p>

                  <h3 className="mt-3 text-xl font-bold">{member.fullName}</h3>

                  {member.description ? (
                    <p className="mt-3 leading-7 text-white/65">
                      {member.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <ArchivedPortraits section="heritage" />
              <div className="navy mt-10 max-w-xl">
                <MediaSlot
                  mediaId="media-history-founders"
                  label="Les fondateurs dans nos archives"
                />
                <TextLink href="/gallery/history-archives">
                  Voir les archives des fondateurs
                </TextLink>
              </div>
            </div>
          )}
        </div>
      </section>
      <Section
        id="portraits-archives"
        eyebrow="Notre mémoire humaine"
        title="Les visages de nos archives."
      >
        <p>
          Portraits issus de la médiathèque SEAFA. Ils ne constituent pas la
          liste de l’effectif ou de la direction actuels.
        </p>
        <div className="cards-three">
          {archivedPeople
            .filter((person) => person.section === "general")
            .map((person) => (
              <article className="interview-card" key={person.mediaId}>
                <MediaSlot
                  mediaId={person.mediaId}
                  label={person.name}
                  portrait
                />
                <div className="card-body">
                  <h3>{person.name}</h3>
                </div>
              </article>
            ))}
        </div>
        <TextLink href="/gallery/people">
          Ouvrir l’album des visages de SEAFA
        </TextLink>
      </Section>
    </main>
  );
}
