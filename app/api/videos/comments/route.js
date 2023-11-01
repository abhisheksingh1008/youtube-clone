import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const { videoId, nextPageToken } = await req.json();

    const { data } = await axios.get(
      `${process.env.BASE_URL}/commentThreads?part=snippet&videoId=${videoId}&pageToken=${nextPageToken}&maxResults=10&key=${process.env.YOUTUTBE_API_KEY}`
    );

    return NextResponse.json(
      { success: true, commentsData: data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
