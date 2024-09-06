import { initEdgeStore } from "@edgestore/server"; // Ensure this import exists
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { NextRequest } from "next/server";

// Lazy initialization of EdgeStore
let edgeStoreInstance: ReturnType<typeof initEdgeStore.create> | null = null;

// Function to initialize EdgeStore (only once)
function getEdgeStoreInstance() {
  if (!edgeStoreInstance) {
    edgeStoreInstance = initEdgeStore.create();
  }
  return edgeStoreInstance;
}

// Initialize EdgeStore router with image bucket
const edgestoreRouter = getEdgeStoreInstance().router({
  myPublicImages: getEdgeStoreInstance().imageBucket(),
});

// Create the handler with error handling
const handler = createEdgeStoreNextHandler({
  router: edgestoreRouter,
});

// Export GET and POST handlers
export async function GET(req:  NextRequest) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("GET request failed:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("POST request failed:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export type EdgeStoreRouter = typeof edgestoreRouter;