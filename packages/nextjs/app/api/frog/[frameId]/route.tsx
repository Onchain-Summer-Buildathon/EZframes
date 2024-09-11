/** @jsxImportSource frog/jsx */
import { Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { getFrameAtServer } from "~~/services/frames";

const app = new Frog({
  basePath: "/api/frog",
  title: "Frog Frame",
});

app.frame(`/:frameId`, async c => {
  const frameId = c.req.path.match(/\/api\/frog\/(\d+)/);
  if (!frameId) {
    throw new Error("Invalid frame ID");
  }
  return c.res({
    ...(await getFrameAtServer(frameId[1])),
    headers: {
      "Cache-Control": "max-age=0",
    },
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
