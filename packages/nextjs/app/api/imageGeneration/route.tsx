import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import parse from "html-react-parser";
import { uploadToIPFS } from "~~/services/svg/uploadToIPFS";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { html } = payload;
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {parse(html)}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
  const imageBuffer = await imageResponse
    .blob()
    .then((blob: any) => blob.arrayBuffer())
    .then((buffer: any) => Buffer.from(buffer));

  try {
    const imageUrl = await uploadToIPFS(new Blob([imageBuffer], { type: "image/png" }), "image");
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error uploading image to Pinata", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
