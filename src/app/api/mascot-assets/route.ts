import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * GET /api/mascot-assets → hangi karakter dosyasının bırakıldığını bildirir (tarayıcıda 404
 * gürültüsü olmadan). Öncelik: GLB → sprite. Üretimde derleme anında hesaplanır
 * (dosyayı ekledikten sonra yeniden derle); geliştirmede her istekte yeniden bakılır.
 */
export const dynamic = "force-static";

const PUBLIC_DIR = join(process.cwd(), "public");
const GLB = "/models/gakkocan.glb";
const SPRITES = ["/media/gakkocan/mascot.webp", "/media/gakkocan/mascot.png"];

const has = (url: string) => {
  try {
    const file = join(PUBLIC_DIR, url);
    return existsSync(file) && statSync(file).size > 0;
  } catch {
    return false;
  }
};

export function GET() {
  const glb = has(GLB) ? GLB : null;
  const sprite = SPRITES.find(has) ?? null;
  return Response.json({ glb, sprite }, { headers: { "Cache-Control": "no-store" } });
}
