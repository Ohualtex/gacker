# Elazığ Badem Şekeri — Intro Film Shot Pack (3 scenes, 12 shots)

Durum: Higgsfield MCP oturumu açılmadı (needsAuth, login yapılmadı) → **video üretilmedi, kredi harcanmadı**.
Görseller Cursor `GenerateImage` ile üretildi. Videoları takım arkadaşı Higgsfield web arayüzünde bu paketle çalıştırır.

## Dosyalar
- `gakkocan/01-front.jpg` (tam boy, ön), `02-three-quarter.jpg`, `03-side.jpg`, `04-back.jpg`, `05-face-closeup.jpg` — nötr krem arka plan, 3D maskot için referans.
- `frames/S1-01-orchard.jpg`, `S2-01-workshop.jpg`, `S3-01-candy-palm.jpg` — sahne başlangıç kareleri (image-to-video için hazır).
- `hero-poster.jpg` (1280x720, S1 karesi).

## Global stil (HER image + video prompt'unun SONUNA ekle)
```
Cinematic photoreal documentary, 35mm film look, natural warm golden-hour light, gentle handheld, shallow depth of field. Palette: cream #F4EADB, kilim red #9B2B22, almond brown #8A5A34, saffron #C8952B, olive #6E7B3C. No neon, no blue grade, no plastic AI skin, no text, no subtitles, no logos, no watermark. 16:9.
```
Negative (varsa): `text, watermark, logo, neon, blue tint, cartoon, plastic skin, extra fingers, deformed hands, modern clothing, caricature`

## Karakter metinleri (HER prompt'ta AYNEN kopyala)
**GAKKOCAN**: `a cheerful 9-year-old Turkish boy, short dark brown hair, brown eyes, olive skin, wide friendly smile; wears a CREAM eight-panel flat baker-boy cap (sekiz köşeli kasket) with a small kilim-red button on top, a cream cotton collarless shirt with rolled sleeves, a dark kilim-red (#9B2B22) embroidered vest with saffron (#C8952B) kilim-pattern trim along the edges, loose almond-brown (#8A5A34) şalvar-style trousers gathered at the ankles, brown leather shoes`

**WOMAN A (older, ~55)**: `Elazığ Harput traditional regional dress: kilim-red and saffron layered long skirt with woven kilim-pattern hem, embroidered dark-red vest over a cream long-sleeve blouse, patterned cream-and-brown soft headscarf`
**WOMAN B (~40)**: `Elazığ Harput traditional regional dress: saffron-ochre layered skirt with apron, embroidered kilim-red cardigan-vest, kilim-red headscarf with floral edge`

Sahneler arası: kıyafetler, renkler ve Gakkocan'ın sabit kalması için her image-to-video / image üretiminde `gakkocan/01-front.jpg` ve `02-three-quarter.jpg` referans görsel olarak ekle (Higgsfield: Soul ID / Character / reference image).

## Önerilen Higgsfield ayarları
- Image: Soul / Nano Banana Pro / Seedream (referans görsel destekli olan). Oran 16:9, 2K.
- Video (image-to-video): Kling 2.x / Seedance / Veo 3 (sessiz yeterli, ses kapalı) — 5 sn, 16:9, 720p taslak → beğenilince 1080p.
- Kamera: preset yerine prompt içinde yaz (aşağıda); "handheld subtle" hareketi düşük tut.
- **Zincirleme**: Shot N'in son karesini çıkar (`ffmpeg -sseof -0.1 -i shotN.mp4 -frames:v 1 last.png`) → Shot N+1'in başlangıç karesi olarak yükle (start frame). Sahne geçişlerinde (4→5, 8→9) yeni sahne için ilgili `frames/` kareyi başlangıç yap, karakter referansını yine ekle.

---

# SAHNE 1 — Badem bahçesi (4 shot, ~16 sn)

### Shot 1 — Wide establishing (4 sn)
- **Image prompt**: `Wide shot of a sunlit almond orchard at golden hour in Elazığ, rolling Harput hills soft in the background, two women (WOMAN A, WOMAN B) standing among almond trees picking ripe green almonds, wicker baskets at their feet. {GLOBAL STYLE}` → hazır kare: `frames/S1-01-orchard.jpg`
- **Motion prompt**: `Slow gentle push-in, subtle handheld. Leaves sway in a light breeze, the women reach up and pluck almonds, warm backlight glows through leaves.`
- **Kamera**: wide, 35mm, hafif dolly-in. **Süre**: 4 sn.

### Shot 2 — Medium, ellerle badem toplama (4 sn)
- **Image**: `Medium shot of WOMAN A's hands and upper body gently pulling a cluster of green almonds from a branch, warm rim light, orchard bokeh. {STYLE}`
- **Motion**: `Her hand twists a cluster of almonds from the branch and drops it into the basket held by WOMAN B; soft smiles, natural gestures, slight handheld sway.`
- **Kamera**: medium, 50mm, handheld hafif. 4 sn.

### Shot 3 — Close-up badem + sepet (3 sn)
- **Image**: `Close-up of fresh green almonds in a woven wicker basket with sunlight flare, in the foreground; a woman's weathered hands add more. {STYLE}`
- **Motion**: `Almonds drop gently into the basket, sunbeams flicker, shallow focus rack from branch to basket.`
- **Kamera**: macro/close, rack focus. 3 sn.

### Shot 4 — Sepetlerle yürüyüş (4 sn)
- **Image**: `Medium-wide shot, WOMAN A and WOMAN B walking away along a dirt path through the orchard carrying wicker baskets of almonds, seen from slightly behind and side, long golden shadows. {STYLE}`
- **Motion**: `Tracking shot following the women walking toward a stone village in the distance, baskets swaying, dust glowing in the light.`
- **Kamera**: tracking, 35mm, yumuşak. 4 sn. Sonraki sahneye kesme.

# SAHNE 2 — Taş atölye (4 shot, ~16 sn)

### Shot 5 — Atölyeye giriş (4 sn)
- **Image**: `The two women (WOMAN A, WOMAN B) arrive at the open wooden door of a stone-walled village workshop carrying baskets of almonds, warm light inside. {STYLE}`
- **Motion**: `Camera holds slightly low, the women walk through the stone doorway into the warm interior, light wraps around them.`
- **Kamera**: static-low, hafif handheld. 4 sn.

### Shot 6 — Bakır tava, geniş (4 sn)
- **Image**: `Inside a rustic stone workshop, WOMAN A and WOMAN B stirring almonds in a large hammered copper pan over a low fire with wooden spoons, steam rising, almond baskets nearby, open doorway at the right with bright light. {STYLE}` → hazır kare: `frames/S2-01-workshop.jpg`
- **Motion**: `Gentle slow push-in. Women stir the almonds with wooden spoons, steam drifts upward, fire flickers, warm light shafts from the doorway.`
- **Kamera**: medium-wide, slow dolly-in. 4 sn.

### Shot 7 — Şeker şurubu detay (4 sn)
- **Image**: `Close-up inside the copper pan: almonds being coated in glistening sugar syrup and white sugar crust, wooden spoon turning them, soft steam and amber light. {STYLE}`
- **Motion**: `Spoon folds almonds through bubbling sugar syrup, sugar crystals cling and turn pale, steam curls, shallow focus.`
- **Kamera**: close-up top-3/4, 85mm. 4 sn.

### Shot 8 — Pişen şekerler, yüz (4 sn)
- **Image**: `Medium close-up of WOMAN B smiling with pride as she lifts a spoonful of finished white sugar-coated almond candies (badem şekeri) from the copper pan, WOMAN A beside her. {STYLE}`
- **Motion**: `She lifts the spoonful and lets a few candies tumble back, looks up and glances toward the doorway with a warm smile as if someone is arriving.`
- **Kamera**: medium close-up, 50mm, handheld hafif. 4 sn.

# SAHNE 3 — Gakkocan (4 shot, ~16 sn)

### Shot 9 — Gakkocan kapıdan girer (4 sn)
- **Image**: `Inside the stone workshop, GAKKOCAN peeks in from the open wooden doorway at the right, smiling shyly, women in the background at the copper pan. Use reference images for GAKKOCAN. {GAKKOCAN} {STYLE}`
- **Motion**: `The boy steps in politely through the doorway, takes off nothing, smiles and walks up toward the women; camera gently pans left following him.`
- **Kamera**: medium-wide, pan left. 4 sn.
- **Süreklilik**: karakter referansı (01-front + 02-three-quarter) ZORUNLU.

### Shot 10 — Gakkocan nazikçe ister (4 sn)
- **Image**: `GAKKOCAN stands before the women, holding out his open palm politely, looking up at them with an eager smile; WOMAN B looks down at him warmly. {GAKKOCAN} {WOMAN B} {STYLE}` → hazır kare: `frames/S3-01-candy-palm.jpg` (sağdaki kadın WOMAN B'ye yakın)
- **Motion**: `The boy holds out his open palm and says something politely (no audio needed), tilts his head hopefully; the woman smiles and reaches for the copper pan scoop.`
- **Kamera**: medium two-shot, over-the-shoulder hafif. 4 sn.

### Shot 11 — Şeker avucuna dökülür (4 sn)
- **Image**: `Close-up of the woman's scoop pouring white sugar-coated almond candies into GAKKOCAN's open palm, his joyful face softly visible behind. {GAKKOCAN} {STYLE}`
- **Motion**: `Candies pour into his palm, his eyes light up, he beams a big smile and pops one candy into his mouth, chewing happily.`
- **Kamera**: close-up, rack focus palm → face. 4 sn.

### Shot 12 — Gakkocan sağ-alta doğru koşar (4 sn) ★ site mascot çıkışı
- **Image**: `Wide shot of the workshop interior and open doorway, GAKKOCAN in the left-center of frame holding candies in his hand, turning to run toward the right foreground, the bottom-right of the frame bright, empty and open. {GAKKOCAN} {STYLE}`
- **Motion**: `The boy laughs and RUNS toward the BOTTOM-RIGHT of the frame, passing close to the camera, growing larger and exiting the frame at the bottom-right corner. In the final 1 second the bottom-right area of the frame is completely empty with only warm light and the stone doorway; camera stays static.`
- **Kamera**: wide, STATIC kamera (çıkış yönü net olsun). 4 sn.
- **Son kare kuralı**: son kare sağ-alt boş olmalı (3D maskot oraya yerleşecek). Üretim kötü çıkarsa videoyu ffmpeg ile 1 sn kırp: `ffmpeg -i s12.mp4 -t 3.2 s12c.mp4`.

---

## Birleştirme / Web çıktısı (ffmpeg)
```bash
# liste: shots.txt  ->  file 'hero-1.mp4' ...
ffmpeg -f concat -safe 0 -i shots.txt -c copy hero-full.mp4
ffmpeg -i hero-full.mp4 -an -vf scale=1280:720 -c:v libx264 -crf 28 -preset slow -movflags +faststart -pix_fmt yuv420p hero.mp4
ffmpeg -i hero-full.mp4 -an -vf scale=1280:720 -c:v libvpx-vp9 -crf 38 -b:v 0 hero.webm
ffmpeg -i hero.mp4 -ss 1 -frames:v 1 -q:v 3 hero-poster.jpg
```
Boyut hedefi ≤8 MB: gerekirse CRF 30–32.

## Hızlı yol (kredi azsa: tek video)
Tek 10–15 sn klip için S1 karesini (`frames/S1-01-orchard.jpg`) start frame yapıp:
`Slow push-in through almond orchard; two Harput-dressed women pick almonds into baskets, then walk toward a stone village; golden hour, gentle handheld. {STYLE}`
Ardından S3 karesinden ayrı 5 sn Gakkocan klibi (Shot 12 motion prompt) üretip birleştir.
