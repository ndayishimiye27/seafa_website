# Corrections SEAFA — 14 October 2026

The existing design, album identifiers, filters, slideshow and lightbox are preserved. The existing `personal/main` branch corresponds to the GitHub repository connected to Vercel Production (`ndayishimiye27/seafa_website`). `origin/main` is a different repository and is not the connected production source.

## Presidency evidence

- Arnaud Badogomba: booklet p. 7 lists him as president in the 2014 committee; p. 13 and the 2019 introduction describe him as still serving. The old site asserted 2013–2019; the supplied portrait now says 2014–2020. The exact boundaries are unresolved. The site displays **2014–2019 attestés · mandat exact à confirmer**, with the conflict explained next to the succession.
- Romeo Badogomba: **2020–2022**, supported by `president-romeo-badogomba...2020-2022.jpeg` and matching existing data.
- Tony Ezako: **2022–2024**, supported by `president-tony-ezako...2022-2024.jpg` and matching existing data.
- Jimmy Jambo: **since 2024**, supported by `president-jimmy-jambo 2024-current.png` and matching existing data.

The latter three terms are supported by supplied filename records; no independent election or handover minutes were found. Arnaud's unsupported exact term fields were removed. All four existing portrait associations remain unchanged.

## Media and names

The filesystem inventory identified **100 additional photographs** and **51 moved originals**. Every moved original was matched against its previous Git blob using SHA-256; no original image bytes were modified. Stable media IDs and existing album URLs are preserved. Permanent redirects preserve former media URLs.

Five new albums follow the supplied folder labels: college walk (2019), SEAFA medicine (2020), Bujumbura walk (2020), gala return match (2022), and the encounter with Burundi basketball players (2026). No exact day, score or participant identity was inferred. New photographs in existing event folders extend existing albums. Seven photographs in `media/archives` join **Archives photographiques** without invented dates or descriptions. Filename camera/WhatsApp timestamps are not treated as event dates.

Conflicting historical classifications remain visible:

- Anniversary folder: `events/2019/anniversary 2017` conflicts internally (2017/2019). Its existing album is labelled Archives and has no event year.
- Jenda: the booklet documents a 2019 outing, but the supplied photo folder says 2021. The photographs are labelled Archives, with no asserted event year; the booklet's 2019 historical account remains unchanged.
- Karera: old photo classification 2018, supplied photo folder 2021. Existing album links remain, with Archives labels and no asserted year. New photographs in the 2021 folder retain a provenance note rather than overriding the uncertainty of the combined collection.
- Gitega/Mabanda: old filenames and captions indicate Gitega; the supplied folder indicates Mabanda. The supported year 2019 is retained, and the destination is explicitly unconfirmed.

`CORRECTIONS_MEDIA_AUDIT.json` records all new photos, their folder evidence, classifications and original-to-current paths. The Archives filter also includes collections explicitly marked Archives, preserving the other filters.

Visible content now uses **Idane**, **Axel Bayoboke**, **Mugisha Celestin**, and **Butungunu Fleury**. Idane's new canonical interview URL is `/interviews/idane`; the old `/interviews/idan` permanently redirects. Internal stable IDs remain unchanged.

The founders montage uses native SVG label overlays around an embedded, byte-identical original PNG. No portrait is resampled or generated; the original files remain. Former montage URLs redirect to the corrected visible graphic. The public booklet and rendered pp. 6–7 have corrected founder text and native PDF overlays on the montage label bands. Unrelated public-booklet redactions and all other page text are preserved. The original source PDF and source transcription remain unchanged.

Remaining historical spellings occur in preserved source records and the original source PNGs, which are not displayed by the public site. The booklet's self-reported nickname **Zidane** and references to footballer **Zinedine Zidane** are retained as quotations, not mistaken name replacements. The booklet also separately lists **Célestin Mahoro** in its historical roster; that historical identity is not blindly equated with another person or added as a second founder.

## Validation

- Content validation: zero errors and zero warnings. ESLint: zero warnings. Explicit Next.js route type generation and TypeScript: pass. Whitespace check: pass.
- Unit tests: **25/25 pass**, including catalogue completeness, dimensions, album references, preserved New Year allocation and previous public-booklet redactions.
- Production build: pass, **130 generated pages**; static public routes and the existing three submission API routes are preserved.
- Browser regression selection: **31/33 passed initially**; the two failures were obsolete expectations of three Archives collections rather than seven. Both pass after updating the expected count. The final targeted rerun passes **5/5**, including all new media and corrected desktop/mobile content. All 33 selected checks are verified across runs, not asserted as one uninterrupted clean run.
- Responsive regressions cover 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px. Lightbox keyboard/touch/focus restoration, slideshow rotation and pause, reduced motion, hidden-document suspension, existing navigation, eight video clips, gallery themes and booklet navigation remain operational.
- Every new photograph passes both original-URL and Next.js optimized-image HTTP checks. All **739 registered assets** match the filesystem and their actual dimensions. All **51 former media URLs** redirect with 308 to a working 200 response whose SHA-256 matches the original file bytes. The corrected SVG, public PDF and pp. 6–7 renders return 200 with the exact local bytes.
- The sitemap route audit passes for every published route, including all five new albums and `/interviews/idane`; missing routes return 404.
- Desktop/mobile rendered review of presidency, founders, Archives, a new album, the undated archive album, Idane and the booklet shows no horizontal overflow or broken visible images. Source contact sheets and corrected booklet pages were inspected. The founders SVG embeds the original PNG bytes exactly; every unrelated PDF page's text is unchanged from the previous public PDF.

Visual evidence, contact sheets, prior-public-PDF comparison and deployment responses are retained under ignored `tmp/corrections/` and other task-specific `tmp/` files. Production push and deployment status are reported in the final delivery after live verification. Unrelated pre-existing edits to the four October audit/review scripts are excluded from the release commit.
