import express from "express";
import { createRequestHandler } from "@remix-run/express";
import { ServerBuild } from "@remix-run/node";
import * as path from "node:path";

const BUILD_PATH = path.resolve("build/remix/index.js");

export default async function createRemixApp() {
  const remixapp = express.Router();

  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    remixapp.use(express.static("build/client"));
    remixapp.use(
      // eslint-disable-next-line import/no-unresolved
      createRequestHandler({ build: await import(BUILD_PATH) })
    );
  } else {
    const viteDevServer = await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      })
    );

    remixapp.use(viteDevServer.middlewares);

    remixapp.all(
      "*",
      createRequestHandler({
        build: () =>
          viteDevServer.ssrLoadModule(
            "virtual:remix/server-build"
          ) as Promise<ServerBuild>,
      })
    );
  }

  return remixapp;
}
