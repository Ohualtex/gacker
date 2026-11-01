import { saveProducer } from "@/app/actions/admin";
import { Actions, Check, Field, Pair } from "./Fields";
import type { Producer } from "@/generated/prisma";

function lines(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      if (item && typeof item === "object" && "tr" in item) {
        const row = item as { tr: string; en: string };
        return `${row.tr} || ${row.en}`;
      }
      return String(item);
    })
    .join("\n");
}

function linkLines(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      const row = item as { label?: { tr?: string; en?: string }; url?: string };
      return `${row.label?.tr ?? ""} || ${row.label?.en ?? ""} || ${row.url ?? ""}`;
    })
    .join("\n");
}

export function ProducerForm({ row }: { row?: Producer }) {
  const socials = (row?.socials ?? {}) as { facebook?: string };
  return (
    <form action={saveProducer} className="ad-grid">
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <div className="ad-grid two">
        <Field name="name" label="İşletme adı" defaultValue={row?.name} />
        <Field name="slug" label="Slug" defaultValue={row?.slug} hint="URL: /ureticiler/slug" />
      </div>
      <div className="ad-grid two">
        <Field name="city" label="Şehir" defaultValue={row?.city ?? "Elazığ"} />
        <Field name="sortOrder" label="Sıra" type="number" defaultValue={row?.sortOrder ?? 0} />
      </div>
      <Field name="address" label="Adres" defaultValue={row?.address} rows={3} />
      <div className="ad-grid two">
        <Field name="phone" label="Telefon" defaultValue={row?.phone} />
        <Field name="image" label="Görsel yolu" defaultValue={row?.image} />
      </div>
      <div className="ad-grid two">
        <Field name="website" label="Web" defaultValue={row?.website} />
        <Field name="instagram" label="Instagram" defaultValue={row?.instagram} />
      </div>
      <Field name="facebook" label="Facebook" defaultValue={socials.facebook} />
      <Field name="mapUrl" label="Harita bağlantısı" defaultValue={row?.mapUrl} />
      <Pair nameTr="roleTr" nameEn="roleEn" label="Rol" defaultTr={row?.roleTr} defaultEn={row?.roleEn} rows={2} />
      <Pair nameTr="taglineTr" nameEn="taglineEn" label="Söz" defaultTr={row?.taglineTr} defaultEn={row?.taglineEn} rows={2} />
      <Pair nameTr="storyTr" nameEn="storyEn" label="Hikâye" defaultTr={row?.storyTr} defaultEn={row?.storyEn} rows={8} />
      <Pair nameTr="hoursTr" nameEn="hoursEn" label="Saatler" defaultTr={row?.hoursTr} defaultEn={row?.hoursEn} rows={2} />
      <Field
        name="branches"
        label="Şubeler (satır: TR || EN)"
        defaultValue={lines(row?.branches)}
        rows={5}
      />
      <Field
        name="products"
        label="Ürünler (satır: TR || EN)"
        defaultValue={lines(row?.products)}
        rows={5}
      />
      <Field
        name="extraLinks"
        label="Ek bağlantılar (satır: TR || EN || URL)"
        defaultValue={linkLines(row?.extraLinks)}
        rows={4}
      />
      <div className="flex flex-wrap gap-6">
        <Check name="published" label="Yayında" defaultChecked={row?.published ?? true} />
        <Check name="demo" label="Örnek içerik" defaultChecked={row?.demo} />
      </div>
      <Actions />
    </form>
  );
}
