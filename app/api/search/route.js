import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const { query, nextPageToken } = await req.json();

    const { data } = await axios.get(
      `${process.env.BASE_URL}/search?part=snippet&q=${query}&pageToken=${nextPageToken}&regionCode=IN&maxResults=20&key=${process.env.YOUTUTBE_API_KEY}`
    );

    return NextResponse.json(
      { success: true, searchResults: data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
