import { legalMetadata, renderLegalPage } from "@/lib/legal-page";

type Props = { params: Promise<{ lang: string }> };

export const generateMetadata = ({ params }: Props) => legalMetadata("kullanim-kosullari", params);

export default function Page({ params }: Props) {
  return renderLegalPage("kullanim-kosullari", params);
}
