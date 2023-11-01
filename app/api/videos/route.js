import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const { videoId } = await req.json();

    const { data } = await axios.get(
      `${process.env.BASE_URL}/videos?part=id,snippet,statistics,contentDetails&id=${videoId}&key=${process.env.YOUTUTBE_API_KEY}`
    );

    return NextResponse.json(
      { success: true, videoData: data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
