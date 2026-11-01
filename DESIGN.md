# DESIGN

## Dünya
Bir Harput sofrası: krem keten örtü, bakır tepsi, kilim, taş duvar. Sıcak, dokunsal, el emeği. Teknoloji gösterişi değil, zanaat.

## Renk (OKLCH'e çevrilmeden önce hex referans)
Aydınlık (varsayılan)
- bone `#FBF6EE` zemin, cream `#F4EADB` ikincil yüzey
- ink `#2A1A12` metin, ink-2 `#5B4636` ikincil metin
- kilim `#9B2B22` ana vurgu, kilim-deep `#6E1D17`
- saffron `#C8952B` ikincil vurgu (ince detay, işaretler)
- almond `#8A5A34`, olive `#6E7B3C` (yaprak, küçük etiketler)
Koyu (sıcak espresso, mavi yok)
- bg `#1C120D`, surface `#26180F`, ink `#F3E8D8`, ink-2 `#C9B59E`
- kilim `#D1594B`, saffron `#E0AE4A`

## Tipografi
- Başlık: Gloock (sıcak, yüksek kontrastlı serif). Display <= 6rem, tracking >= -0.03em.
- Gövde: Hanken Grotesk. Ölçü 60-72ch.
- Eyebrow/kicker yok. Bölüm numarası yok.

## Biçim dili
- Kilim bandı: kareli/baklava dizilimli ince SVG bordür, bölüm ayracı ve footer üstü.
- Yuvarlak köşe yok denecek kadar az (2-6px). Kart yığını yok; editoryal yerleşim.
- Gölge: ofsetli, yumuşak, sıcak kahve tonlu. Neon halo yok.
- Cam/blur yalnızca navbar'da, kaydırınca.

## Hareket
- Tek imza an: hero videosu + maskotun dökülen şekerleri. Diğer bölümlerde sakin, üstel ease-out girişler.
- `prefers-reduced-motion` saygı görür.

## Tarayıcı yüzeyleri
- Metin seçimi kilim renginde, scrollbar ince ve sıcak tonlu, focus ring saffron.
