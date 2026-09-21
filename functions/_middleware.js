export async function onRequest(context) {

  const response = await context.next();
  const contentType = response.headers.get("Content-Type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const originalHtml = await response.text();

  const counterImg = `
    <img src="https://bp-paks-counter.kiro111111111.workers.dev/json?path=/58914791"
         alt=""
         width="1"
         height="1"
         style="position:absolute; left:-9999px; top:-9999px; opacity:0;">
  `;

  const modifiedHtml = originalHtml.replace("</body>", `${counterImg}</body>`);

  return new Response(modifiedHtml, {
    headers: response.headers
  });
}
