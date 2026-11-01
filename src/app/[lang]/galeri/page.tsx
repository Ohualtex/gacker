import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { GalleryExhibit } from "@/components/gallery/GalleryExhibit";

export async function generateMetadata({ params }: PageProps<"/[lang]/galeri">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.pages.gallery.title, description: dict.pages.gallery.lead };
}

export default async function Page({ params }: PageProps<"/[lang]/galeri">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <>
      <PageHeader title={dict.pages.gallery.title} lead={dict.pages.gallery.lead} />
      <GalleryExhibit lang={lang} />
    </>
  );
}
