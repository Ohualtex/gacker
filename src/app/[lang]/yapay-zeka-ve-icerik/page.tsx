import { legalMetadata, renderLegalPage } from "@/lib/legal-page";

type Props = { params: Promise<{ lang: string }> };

export const generateMetadata = ({ params }: Props) => legalMetadata("yapay-zeka-ve-icerik", params);

export default function Page({ params }: Props) {
  return renderLegalPage("yapay-zeka-ve-icerik", params);
}
