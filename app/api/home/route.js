import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    // const { part } = await req.json();

    const { data } = await axios.get(
      `${process.env.BASE_URL}/videos?part=id,snippet,statistics,contentDetails&chart=mostPopular&maxResults=20&key=${process.env.YOUTUTBE_API_KEY}`
    );

    return NextResponse.json(
      { success: true, videosData: data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
