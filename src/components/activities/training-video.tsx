import { trainingVideo } from "@/data/media";
export function TrainingVideo() {
  return (
    <figure className="my-8">
      <video
        className="w-full rounded-2xl bg-[#071d3b]"
        style={{ aspectRatio: "16 / 9" }}
        controls
        preload="metadata"
        playsInline
        aria-label={trainingVideo.title}
      >
        <source src={trainingVideo.src} type="video/mp4" />
        Votre navigateur ne peut pas lire cette vidéo.{" "}
        <a href={trainingVideo.src}>
          Télécharger la vidéo d’entraînement SEAFA
        </a>
        .
      </video>
      <figcaption className="mt-3 text-sm text-slate-600">
        Entraînement SEAFA
      </figcaption>
    </figure>
  );
}
