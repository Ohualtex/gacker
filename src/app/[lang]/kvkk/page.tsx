import { legalMetadata, renderLegalPage } from "@/lib/legal-page";

type Props = { params: Promise<{ lang: string }> };

export const generateMetadata = ({ params }: Props) => legalMetadata("kvkk", params);

export default function Page({ params }: Props) {
  return renderLegalPage("kvkk", params);
}
