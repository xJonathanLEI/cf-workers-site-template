# Cloudflare Workers Site Template

This repository contains a CI/CD-optimized Cloudflare Workers template for serving static sites. It allows certain routes to be proxied so that all requests can be served under the same subdomain, and therefore avoids [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues and benefits from Cloudflare's ["under attack"](https://support.cloudflare.com/hc/en-us/articles/200170076-Understanding-Cloudflare-Under-Attack-mode-advanced-DDOS-protection-) DDoS protection mode.

## License

[MIT](./LICENSE)
