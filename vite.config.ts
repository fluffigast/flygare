import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createRequire } from "node:module";
import path from "node:path";

/**
 * Adapts Azure Static Web Apps Functions (`module.exports = async (context, req) => {}`)
 * for the Vite dev server so `/api/smhi` and `/api/wind` resolve instead of returning
 * the raw JS source (which causes the "Unexpected token 'm', module.exp..." error).
 */
function azureFunctionsDevAdapter(): PluginOption {
  const require = createRequire(import.meta.url);
  const routes: Record<string, string> = {
    "/api/smhi": path.resolve("api/smhi/index.js"),
    "/api/wind": path.resolve("api/wind/index.js"),
  };

  return {
    name: "azure-functions-dev-adapter",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        const url = new URL(req.url, "http://x");
        const handlerPath = routes[url.pathname];
        if (!handlerPath) return next();

        try {
          // Re-require each request so edits to api/*.js take effect without restart.
          delete require.cache[handlerPath];
          const handler = require(handlerPath);

          const query: Record<string, string> = {};
          url.searchParams.forEach((v, k) => (query[k] = v));

          const context: { res?: { status?: number; headers?: Record<string, string>; body?: unknown }; log: (...args: unknown[]) => void } = {
            log: (...args) => console.log("[azure-fn]", ...args),
          };
          await handler(context, { query, method: req.method });

          const out = context.res ?? { status: 500, body: "no response" };
          res.statusCode = out.status ?? 200;
          for (const [k, v] of Object.entries(out.headers ?? {})) {
            res.setHeader(k, v);
          }
          const body =
            typeof out.body === "string" || Buffer.isBuffer(out.body)
              ? out.body
              : JSON.stringify(out.body);
          res.end(body);
        } catch (err) {
          console.error("[azure-fn]", handlerPath, err);
          res.statusCode = 500;
          res.end(String(err));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), azureFunctionsDevAdapter()],
  base: "/",
});
