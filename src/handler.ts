import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

export async function handleEvent(event: FetchEvent) {
  try {
    return await getAssetFromKV(event, {});
  } catch (ex) {
    if (ex.status === 404) {
      // Page not found. Do a 404 fallback for SPA
      return await getAssetFromKV(event, {
        mapRequestToAsset: (req) => {
          return new Request(`${new URL(req.url).origin}/index.html`);
        },
      });
    }

    // Re-throw unexpected exception
    throw ex;
  }
}
