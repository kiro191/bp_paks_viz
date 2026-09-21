/**
 * ============================================================
 * Cloudflare Pages Middleware – Rejtett számláló
 * ============================================================
 *
 * Ez a middleware MINDEN látogatásnál lefut, mielőtt a HTML-t
 * kiszolgálná a Cloudflare Pages.
 *
 * A látogató SEMMIT nem lát ebből.
 * Nem jelenik meg a HTML-ben.
 * Nem jelenik meg a Network-ben.
 * Nem jelenik meg a forráskódban.
 *
 * A Cloudflare szerver oldalon hívja meg a Worker-t,
 * így a számláló minden látogatásnál lép.
 *
 * ============================================================
 */

export async function onRequest(context) {

  // ------------------------------------------------------------
  // 1) A számláló Worker URL-je (REJTETT)
  // ------------------------------------------------------------
  // Ezt a látogató SOHA nem látja.
  // A Cloudflare szerver oldalon hívja meg.
  // A Worker számláló minden látogatásnál lép.
  // ------------------------------------------------------------

  const counterUrl = "https://bp-paks-counter.kiro1111111.workers.dev/json?path=/58914791";

  try {
    // ------------------------------------------------------------
    // 2) Rejtett számláló hívás
    // ------------------------------------------------------------
    // A Cloudflare szerver oldalon fut.
    // A látogató nem látja.
    // Facebook appban is működik.
    // ------------------------------------------------------------
    await fetch(counterUrl, {
      method: "GET",
      headers: {
        "User-Agent": "CF-Pages-Counter"
      }
    });
  } catch (err) {
    // ------------------------------------------------------------
    // 3) Ha a Worker nem elérhető, NEM állítjuk le az oldalt.
    // ------------------------------------------------------------
    console.error("Számláló hívás sikertelen:", err);
  }

  // ------------------------------------------------------------
  // 4) Folytatjuk a normál HTML kiszolgálást
  // ------------------------------------------------------------
  return await context.next();
}

