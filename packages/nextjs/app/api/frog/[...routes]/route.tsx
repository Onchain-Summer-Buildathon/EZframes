/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput, parseEther } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { getFrameAtServer } from "~~/services/frames";
import { Frame } from "~~/types/commontypes";
import { makeFrogFrame } from "~~/utils/general";

const app = new Frog({
  basePath: "/api/frog",
  title: "Frog Frame",
});

app.frame(`/:frameId`, async c => {
  const frameId = c.req.path.match(/\/api\/frog\/([a-zA-Z0-9]+)/);
  if (!frameId) {
    throw new Error("Invalid frame ID");
  }
  const data: Frame = await getFrameAtServer(frameId[1]);
  const frame = makeFrogFrame(data.frameJson);
  const intents = frame.intents.map((intent: any) => {
    const props = intent.props || {};
    switch (true) {
      case intent.type === "Button":
        return (
          <Button value={props.value} action={props.action}>
            {intent.content}
          </Button>
        );
      case intent.type === "Button.Link":
        return <Button.Link href={props.href}>{intent.content}</Button.Link>;
      case intent.type === "Button.Mint":
        return <Button.Mint target={props.target}>{intent.content}</Button.Mint>;
      case intent.type === "Button.Redirect":
        return <Button.Redirect location={props.location}>{intent.content}</Button.Redirect>;
      case intent.type === "Button.Reset":
        return <Button.Reset>{intent.content}</Button.Reset>;
      case intent.type === "Button.Transaction":
        return <Button.Transaction target={props.target}>{intent.content}</Button.Transaction>;
      case intent.type.includes("TextInput"):
        return <TextInput placeholder={props.placeholder} />;
      default:
        return null;
    }
  });
  const image =
    frame.image.type === "src" ? frame.image.src : <div style={frame.image.style}>{frame.image.content}</div>;
  return c.res({
    image: image as string,
    intents,
  });
});

devtools(app, { serveStatic });

app.transaction("/send-ether", c => {
  return c.send({
    chainId: "eip155:10",
    to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
    value: parseEther("1"),
  });
});

export const GET = handle(app);
export const POST = handle(app);
