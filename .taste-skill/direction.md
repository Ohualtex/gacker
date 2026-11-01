# DIRECTION SHEET — One motif
seed 284170837 · drawn 2026-11-01 · sector physical-product · tone warm
Brief: Elazığ almond candy (badem şekeri): sugar-coated local almonds, made in copper pans in Elazığ/Harput, eastern Türkiye; producers, the city, its kilims and tea tables

| | |
| --- | --- |
| Direction | One motif |
| Hero | Giant cropped shape |
| Type | Stack Sans Headline / Stack Sans Text |
| Colour | Bottle ink, yellow |
| Sections | intro (Statement with inline thumbnails) → how-it-works (Accordion of tinted panels) → showcase (Object on a disc) → list (Two-column menu, photo bullets) → gallery (One frame, contents change) → about (Inset panel, shaped portrait) → cta (The action tile) → footer (The mark, built large) |
| Motion | Shutter image |
| Photographs | the "City by day" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
Take one shape from the subject and let it run the whole system. A drilling tool's octagonal cross-section becomes the buttons, the image masks and the loader. A two-account money app becomes two circles that recur as icon, inline dot and section colour. A café's striped awning becomes every band on the page. Look at the product, the logo, the object or the word in the headline and find the simplest geometry in it (a circle, an arc, a chamfer, a stripe, a notch, a ring). Then use only that shape, at three or four very different scales, everywhere a designer would normally reach for a generic rounded rectangle.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Hero: the motif appears once at enormous scale as a flat filled shape, cropped by the viewport (a circle 120vh across entering from the right, a chamfered block filling the lower half), with a short headline at 6–8vw and one supporting sentence set on the remaining ground, left-aligned on a shared margin. Through the page the motif returns as: the mask for every photograph (via `clip-path` or `border-radius` made from the same geometry), the shape of the primary button, the bullet beside list items at text size, and one full-width band that separates the two halves of the page. Sections use simple two-column or single-column layouts so the shape is the only thing with character.

## 3. Type — Stack Sans Headline / Stack Sans Text
A geometric sans in a light weight at large size, soft and exact at once, with its text cut underneath. Suits consumer apps, utilities and developer tools that want to feel calm and modern.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@300&family=Stack+Sans+Text:wght@400;500&display=swap" rel="stylesheet">
```
- Display: **Stack Sans Headline** — weight 300 · tracking -0.022em · leading 1.05 · sentence case; a heading may be two-tone, grey then full ink
- Text: **Stack Sans Text** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
A clean geometric or grotesk face that echoes the shape (round bowls for circles, squared terminals for chamfers). Medium weight; headings 6–8vw in the hero and 3–4vw after.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Bottle ink, yellow
```css
:root {
  --bg: #f7f7f7;
  --surface: #ebebeb;
  --ink: #0d2a1c;
  --muted: #5f6b64;
  --accent: #f6e016;
  --accent-ink: #0d2a1c;
  --field-1: #f6e016;  --field-1-ink: #0d2a1c;
}
```
Off-white ground with all type in a near-black bottle green instead of black. Yellow is the only saturated note: the button or one small object on most screens, and one later section that turns fully yellow.
The motif carries the accent colour at large scale, flat. Everything else is ground and ink. A second motif colour is allowed only if the subject has a real pair (two accounts, two modes).

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node /Users/umitcancinar/Desktop/gacker/.agents/skills/design-taste-frontend/scripts/assets.mjs "elazığ postcard"`, then "elazığ old map" and "candy şekeri", then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

Photographs appear inside the motif's shape. If there is product interface to show, it sits on a flat colour stage shaped by the motif. Draw the shape with CSS or a simple inline SVG path; do not draw illustrations.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "City by day" set (streets and buildings in daylight)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/49/1600/1000` — Whitewashed hillside village with a windmill under hazy blue sky · light tone · white, pale blue · calm area: top · native landscape · photo: Margaret Barley
- `https://picsum.photos/id/238/1600/1000` — Dense city skyline of skyscrapers seen from above, black and white · mid tone · grey, white, black · black-and-white · calm area: top · native landscape · photo: Anders Jildén
- `https://picsum.photos/id/1065/1600/1000` — Narrow alley between old stone buildings opening onto the sea · mid tone · stone beige, sea blue, dark brown · native portrait · photo: Bertrand Zuchuat
- `https://picsum.photos/id/1067/1600/1000` — Aerial view of a city skyline along the water at sunset · mid tone · warm orange, dusky blue, dark grey · calm area: top · native landscape · photo: Kevin Young
- `https://picsum.photos/id/826/1600/1000` — Boat on a canal between tall brick warehouses in hazy light · dark tone · dark brown, hazy cream, dark teal · native landscape · photo: Nick Scheerbart
- `https://picsum.photos/id/299/1600/1000` — City street between tall brick buildings with a glass tower beyond · mid tone · warm brown, pale blue, grey · native landscape · photo: Matthew Wiebe
- `https://picsum.photos/id/322/1600/1000` — Narrow cobbled alley between worn ochre and terracotta walls · mid tone · ochre, terracotta, grey · native landscape · photo: Afroz Nawaf
- `https://picsum.photos/id/308/1600/1000` — Narrow street of colourful houses with laundry hung between them · mid tone · terracotta red, pale yellow, sky blue · native landscape · photo: Charles L.
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: interior-and-table, hands-and-making, object-still, city-night — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Giant cropped shape
A plain ground with one flat shape at enormous scale. The shape is the simplest geometry found in the subject (a circle, a ring segment, a chamfered block, an arch), drawn in CSS or as a single inline SVG path and filled with the accent colour. It is about 120vh across and enters from the right, centred near 78% of the width and 55% of the height, so the top, right and bottom edges of the viewport crop it and its left boundary reaches column 7. If the subject has a true pair (two accounts, two modes), a second shape in a second flat colour overlaps the first by a quarter with `mix-blend-mode: multiply`. The headline sits on the bare ground on columns 1–6, vertically centred, flush left at 8% from the left edge: two lines at clamp(64px, 6.4vw, 100px), heavy weight, tracking -0.03em. Beneath it comes one supporting sentence at 19px, then the single action as a solid button cut to the same shape. A bold wordmark sits top-left at 32px; up to three text links sit top-right in the ground colour.

On a phone: The shape moves to the bottom: 130vw across, centred horizontally, its top at 56svh, cropped by the left, right and bottom edges. The headline sits above it at 11.5vw on two lines at a 16px margin, starting 15% down, with the sentence at 16px and the motif-shaped button beneath. Wordmark top-left; the links collapse to one word top-right.
Headline: Two lines of two or three words each, up to about 12 characters per line at 6.4vw.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. intro — Statement with inline thumbnails (statement)
A centred statement of 18–28 words, four lines at clamp(32px, 4.2vw, 62px), medium or bold weight, leading 1.12, in a block 60–66% of the viewport wide with 22vh of empty ground above and below. Three to five small frames sit inline between words: each is an `inline-block` 0.85em tall and 0.85–1.3em wide, `vertical-align: -0.1em`, radius 0.14em, holding a tightly cropped photograph (or a crop of real interface) of the thing the neighbouring word names. Frames are part of the line, never floating over it, with 0.12em of space either side. No heading above and no paragraph below; the statement is set as a `p`. Directly under the section the page may split into two flat colour halves or begin the first product row, so the thumbnails read as a preview of what follows. On a motif-driven page every frame takes the motif's shape.
On a phone: Left-aligned instead of centred, at 8vw with leading 1.15, about seven lines inside 20px margins. Keep at most three inline frames, each exactly one cap-height tall, and make sure none lands at the start of a line. Vertical padding drops to 96px.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

### 2. how-it-works — Accordion of tinted panels (strip)
A two-column introduction, then one horizontal accordion. Introduction: the heading, two to four words at clamp(36px, 4vw, 60px), in columns 1–5; one paragraph at 18px in columns 7–11. 64px below, a flex row across columns 1–12, 520px tall, of four to six panels with no gaps. The open stage is a panel taking about 58% of the width; the rest are vertical slivers sharing what remains. Order is carried by colour: the first stage is the darkest tone of one hue and each later stage is a lighter flat tint of it, so the row reads dark to light from left to right. A sliver shows only its stage name, rotated 90 degrees and reading upward, at 20px bold, anchored to its bottom-left. The open panel shows the name at 40px top-left, a 36ch paragraph at 18px bottom-left and, optionally, one photograph in its right half. Clicking a sliver opens it (flex-basis transition, 450ms).
On a phone: The accordion turns vertical: stages stack at full width as bars 64px tall in the same dark-to-light order, names set horizontally at 18px. The open stage expands to its content height with the paragraph at 17px. The first stage is open by default.

### 3. showcase — Object on a disc (index)
One section about a viewport tall on a plain ground. A flat filled disc 64vh across, in one palette colour, sits with its centre at 58% of the width; swap the disc for the subject's own shape if it has one. A cut-out object photograph stands in front of it, centred on it, about 78% of the disc's height and breaking the disc's outline at the top. Bottom-left, starting on the margin and ending level with the disc's lower edge: a vertical list of four to six item names at clamp(28px, 2.9vw, 44px), leading 1.15. The selected name is in full ink and the rest at 25%; choosing a name swaps the object (300ms crossfade) and the disc's colour. The heading, two to four words at the same size as the names but in the soft ink, is the first line of that list. One fact about the selected item sits at the disc's right edge at 17px.
On a phone: The disc comes first, 86vw across and centred, with the object in front. The names follow as a single sideways-scrolling line at 26px with 24px gaps, the selected one in full ink. The fact sits under the names at 16px.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 4. list — Two-column menu, photo bullets (grid)
A menu or catalogue list in which each item has a small cut-out photograph where a bullet would be. Each category opens with its name at clamp(32px, 3.4vw, 50px) at the left margin and the number of items at 16px right-aligned on the same baseline, with 96px above and 40px below. Items then run in two columns with a 64px gutter and 36px between rows. Each item is a two-part row: a 64px photograph of the item on a plain background at the left (multiplied onto the ground with `mix-blend-mode: multiply`, or masked to the page's one shape), then 20px to its right the name in bold at 17–18px with the price right-aligned on the same line, and beneath it a two- or three-line description at 15px in the soft ink, max 38ch. A short note such as an allergen follows the description in the accent ink. No boxes. Holds 6–10 items per category.
On a phone: One column. Photographs shrink to 52px and stay at the left; name and price share the first line with the description beneath at 15px. Category names at 8.5vw with the count on the same baseline. A sticky row of category names as text links lets the reader jump.

### 5. gallery — One frame, contents change (pinned)
Instead of many pictures side by side, one frame stays in place and its contents change. The frame is small and exact: 300px square on a quiet page, or up to 40vw at 4:5 on an object-led one, centred or sitting on the text column's left edge, with at least 20vh of empty ground above and below. Five to seven photographs are stacked inside it with `position: absolute` and crossfade in turn (opacity over 600ms, each held for 2.4 seconds, via CSS keyframes with staggered delays). All are shot or cropped alike: same scale, same light direction, the subject at the same position, so only the subject seems to change. On a flat ground use `mix-blend-mode: multiply` so studio backgrounds vanish. One caption line at 14px sits 16px below the frame and changes with the image. No arrows and no counter. On a motif-led page the frame takes the motif's shape through `clip-path`.
On a phone: The frame is 72vw wide, centred, in a section 70svh tall. The crossfade continues on its own; tapping the frame advances to the next image at once. The caption sits beneath, centred, at 14px. When reduced motion is requested the first image holds and tapping still advances.

### 6. about — Inset panel, shaped portrait (split)
A deep-toned panel inset 20px from the page edges with a 12px radius, about 110svh tall, `overflow: hidden`. Left half: a two-line statement of four to seven words at clamp(40px, 4.4vw, 64px) in a pale ink, top-left with 56px padding; it is the heading and has nothing above it. Below it a photograph of the person or the workshop, masked with `clip-path` or an SVG `mask` to one bold shape taken from the subject (a four-lobed flower, a circle, an arch, a chamfered block), 38vw across, positioned so the panel's bottom edge crops its lowest fifth. Right side, starting at 63% of the width and 56px from the top: two text blocks 300px wide and 64px apart, each a subhead at 22px over a four-line paragraph at 15px; then one solid button in the accent colour. Between the statement and the text blocks the panel is empty. One photograph only.
On a phone: The panel is inset 10px and stacks: the statement at 8.5vw, then the two text blocks at full width, the button, and last the shaped photograph at 86vw across, centred and cropped by the panel's bottom edge by a quarter of its height.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

### 7. cta — The action tile (grid)
The close is one row of the board. Three filled tiles sit side by side with 8–14px gaps, all 360px tall and sharing one radius: a wide centre tile spanning columns 3–10 in the accent colour, flanked by two narrow tiles (columns 1–2 and 11–12) that run off the left and right viewport edges, as if the row had been cropped from a longer one. The centre tile holds, left-aligned and vertically centred with 40px padding: a heading of three to five words at 40px, two lines at 17px, and the action. The action is either one rectangular button or an email field 420px wide in the paper colour with the submit button nested inside its right end. The flanking tiles hold no text: one is a photograph covering the tile, the other a flat palette colour. No shadows, no outlines.
On a phone: The accent tile runs full width, about 300px tall, heading at 28px, field and button stacked at full width. The two flanking tiles follow beneath as a pair, each half width and 120px tall, with the same gap and the same radius.

Adjusted for this page:
- It mentions a shadow: only on something open above the page (a menu, a dialog), never on a resting element.

### 8. footer — The mark, built large (band)
On a flat colour field, the brand closes the page as a construction rather than as set type. Across the full content width and about 34svh tall, the wordmark is built from blocks: each letter is knocked out of its own solid rectangle in a palette colour, the rectangles differ in height (60–100% of the band) and butt together with 4px gaps, bottoms on one line. Where the project has a simple geometric mark or motif, enlarge that instead, drawn as inline SVG from flat rectangles, circles and quarter-arcs with the same 4px gaps. Below, 56px lower: four columns of plain links at 15px across columns 1–8, and two addresses or contact lines in columns 9–12. A last row carries the copyright at the left and one small filled button at the right. Space and the block construction do all the separating.
On a phone: The block wordmark spans the full width at about 22svh tall; a long name breaks into two rows of blocks. Link columns go two across at 15px, contact lines beneath at full width, then copyright and the small button on one row.

## 8. Motion — Shutter image
The one hero or showcase image opens from an edge with a clip-path over about 1.1 seconds while the picture inside settles from 1.12 scale to rest. Use it once, on the image that matters most; later images simply are there. Recipe: 'Image shutter' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
One shape at many sizes. The giant cropped shape gives the hero mass and colour without a single image.

## 11. How this direction goes wrong
One motif means one. A circle here, a hexagon there and a blob behind is the generated look this replaces. The motif must come from the subject and you must be able to say from where in one clause.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Midnight** (One Page Love, studied score 7.1) `opl-midnight-2`
  Idea: The headline's circles are literally pictured: one blurred dark ring, sliced into horizontal bands, becomes the hero, the demo panel, the session cards and the footer.
  Hero: No navigation at all. A canvas fills the full width and the top 90% of the viewport: a huge out-of-focus dark navy ring on drifting taupe, sage and terracotta, cut into horizontal bands about 78px tall that are slightly offset like blinds. On the vertical centre line, starting 58px from the left, sit a small rounded-square line icon and a one-line headline at 48px in cream. On the same baseline, starting 59% across, a two-line 17px statement whose first sentence is white and bold while the rest drops to half opacity. The cream page background shows as a 90px strip at the bottom. No button.
  Worth taking: Slice a soft blurred gradient into horizontal bands with small offsets so a familiar glow becomes a recognisable, ownable texture.
- **Superlocal 2026** (One Page Love, studied score 7.4) `opl-superlocal-2026`
  Idea: Everything is a circle: a dot-matrix logotype whose dots become floating photo circles and glowing orbs across a grey-to-orange field.
  Hero: Mid-grey field with a faint dot grid (one dot every 33px) that fades through the lower half into saturated orange at the bottom edge. The captured first paint contains one element: a 270×80px logotype dead centre, built from black ellipses of varying size, its letters progressively compressed to the right. No nav or text yet. After loading, a cluster of four small pills (one black, three white) appears top-centre; the logo turns white inside a 330px ring of about fifty tiny circles — round photo crops, glowing orbs, coins; and the bottom edge carries the event name left and dates right in an outlined dot-matrix face 40px tall.
  Worth taking: Build the logotype from a dot matrix of ellipses of varying size, then reuse the same matrix at screen-filling scale as the footer background.
- **Ciao Energy** (Awwwards Site of the Day, studied score 7.6) `aww-ciao-energy-launch-website`
  Idea: The can is the whole website: one fixed real-time 3D studio scene in which the camera travels from a flavour carousel to extreme close-ups of the can's own label, where each claim is paired with the ingredient that was taken out, and the copy is a thin layer over the product.
  Hero: A fixed full-viewport 3D canvas on a dark grey studio floor fading to black over the top 40%. A metallic can stands dead centre (about 16% of the width, half the height), tilted about 10 degrees, between a chrome ring hovering above and a dark plinth below; six darker, smaller cans recede on a shallow arc behind it, the outer two cut by the viewport edges. The flavour name sits on the plinth in two lines of heavy italic uppercase at about 36px, over a 480px slider and a small scroll prompt; thin chevrons about 140px either side of the can change flavour. A centred logo about 125px wide at the top, a sound toggle left, a white contact pill right. No headline: the benefits arrive one scroll later.
  Worth taking: For a single physical product, keep one fixed full-viewport render and move the camera, never the layout: beats of about 1.25 viewports, each with its own angle, plus real DOM text so a slow GPU or a failed WebGL context still shows every claim.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/umitcancinar/Desktop/gacker/.taste-skill/direction.json · reprint with `node draw.mjs --show`
