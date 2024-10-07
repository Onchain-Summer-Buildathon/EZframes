import { getFrameMetadata } from "frog/next";
import { Metadata } from "next";
import { APP_URL } from "~~/constants";

type Props = {
  params: { frameId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.frameId;
  try {
    const frameMetadata = await getFrameMetadata(`${APP_URL}/api/frog/${id}`);
    return {
      title: "EZ Frames",
      description: "Check this on warpcast",
      other: frameMetadata,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export default function Page() {
  return (
    <>
      <h1>Frames Check this on warpcast</h1>
    </>
  );
}
