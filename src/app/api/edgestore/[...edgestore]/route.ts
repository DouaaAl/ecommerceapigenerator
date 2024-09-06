import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { NextRequest } from "next/server";

let edgeStoreInstance = initEdgeStore.create();

const edgestoreRouter = edgeStoreInstance.router({
  myPublicImages: edgeStoreInstance.imageBucket(),
});

const handler = createEdgeStoreNextHandler({
  router: edgestoreRouter,
});

export async function GET(req: NextRequest) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("Error during GET request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("Error during POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export type EdgeStoreRouter = typeof edgestoreRouter;