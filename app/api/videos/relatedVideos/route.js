import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const { videoCategoryId, nextPageToken } = await req.json();

    // console.log(videoCategoryId, nextPageToken);

    const { data } = await axios.get(
      `${process.env.BASE_URL}/videos?part=id,snippet,statistics,contentDetails&chart=mostPopular&videoCategoryId=${videoCategoryId}&pageToken=${nextPageToken}&maxResults=20&key=${process.env.YOUTUTBE_API_KEY}`
    );

    return NextResponse.json(
      { success: true, relatedVideos: data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
