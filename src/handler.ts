import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

import { proxies } from "./config/proxies";

export async function handleEvent(event: FetchEvent) {
  const url: URL = new URL(event.request.url);

  for (const proxy of proxies) {
    if (url.pathname.startsWith(proxy.prefix)) {
      return await fetch(
        proxy.target + url.pathname.substr(proxy.prefix.length),
        event.request
      );
    }
  }

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
