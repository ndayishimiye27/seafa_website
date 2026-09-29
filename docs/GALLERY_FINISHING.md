# Galerie et livret : décisions de classement

## Inventaire et dédoublonnage

`docs/media-inventory.json` recense les 331 images photographiques et de marque présentes dans `public/media` au début de cette passe : dimensions, SHA-256, empreinte visuelle, présence de métadonnées EXIF et enregistrement initial. 124 images n’étaient pas encore intégrées. Le dossier `anniverasire de lequipe 2018` était vide ; il ne justifie donc pas un nouvel album publié.

`npx tsx scripts/audit-media.ts` permet de refaire l’inventaire. Une distance d’empreinte visuelle de 6 ou moins signale des candidats à examiner, pas des doublons automatiquement supprimables. Les 39 paires proposées ont été examinées en planches ; les variantes de logos restent nécessaires. La revue visuelle des 124 ajouts a aussi permis de réduire les rafales presque identiques. Au total, 52 fichiers sont écartés des galeries, sans suppression physique. Les photographies différentes d’un même sujet restent conservées dans les originaux.

La sélection est explicite dans `src/data/gallery-curation.ts` : source écartée → source représentative, rattachement des nouvelles photos aux albums et couvertures choisies. Certaines chaînes désignent des variantes successives d’une même scène. Les identifiants d’image sont stables et ne dépendent pas de l’ordre du dossier.

La galerie finale contient 44 albums canoniques. L’année et l’événement sont deux vues de ces mêmes enregistrements. Les pages d’activités, d’événements et de récompenses conservent leurs références à ces albums. Les doublons sont filtrés au niveau du registre, donc aussi dans leurs pages détaillées. Le même original n’est jamais affiché dans deux albums. Les sections de la page d’accueil utilisent des sélections différentes.

## Dates et regroupements

Années documentées : 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022 et 2024. Aucun album 2023, 2025 ou 2026 n’est inventé. Les dates de transfert WhatsApp de septembre 2026 ne datent pas les événements.

- `anniversaire 2016` complète l’album existant de 2016.
- `match 2015` crée une collection de 2015, sans nom d’adversaire inventé.
- `match contre songa` rejoint le tournoi 2019 : douze fichiers sont identiques octet par octet à ceux déjà classés dans le tournoi, et les scènes, tenues et terrain concordent visuellement. Ce rattachement s’appuie sur ce recoupement avec les archives existantes, pas sur la date des fichiers. La date précise et le lieu ne sont pas ajoutés.
- La photographie des chutes présente dans l’album anniversaire 2021 est exclue de celui-ci au profit du classement déjà établi aux chutes de Karera, 2018.
- La visite chez les Badogomba, les autres archives et les images historiques sans date restent dans « Date à confirmer ».

Pour ajouter des photos : les enregistrer dans le catalogue avec dimensions et texte alternatif, vérifier les empreintes puis les originaux, les rattacher à un album existant si possible, et documenter la preuve de date avant de remplir `eventDate`. Ne pas utiliser l’heure de modification ou un nom WhatsApp comme preuve d’événement.

## Présidence et livre original

Arnaud (2013–2019) et Jimmy (président actuel) suivent les confirmations du propriétaire. Le portrait d’Arnaud provient de son fichier d’entretien existant. Le portrait de Jimmy, le début de son mandat et les mandats intermédiaires restent à confirmer ; aucun n’est inventé ni ajouté à la succession.

Le document original `Newsletter seafa-1-1.pdf`, déjà cité dans `EDITORIAL_SOURCES.md`, a été retrouvé dans le dossier Téléchargements. La copie téléchargeable est `public/book/newsletter-seafa.pdf`. Les 29 pages sont rendues dans `public/book` et leur texte est disponible dans `src/data/interview-book.json`. Le lecteur propose une transcription adaptable aux petits écrans et la page originale agrandissable. Les liens pointent vers Alain p. 14, Idan p. 20, Claver p. 21, Arnaud p. 23 et la source mémorielle de Darcy p. 27. Darcy n’est pas présenté comme une interview complète.

Régénération : installer PyMuPDF dans l’environnement Python de travail puis lancer `python scripts/render-book.py <chemin-du-PDF>`. Aucune dépendance Python n’est nécessaire au site en production. Relire les transcriptions et les rendus si le PDF change.
