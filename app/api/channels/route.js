import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const { channelId } = await req.json();
    // const channleId = req.query.channleId;
    // console.log(channleId);

    const { data } = await axios.get(
      `${process.env.BASE_URL}/channels?part=id,snippet,statistics,contentDetails&id=${channelId}&key=${process.env.YOUTUTBE_API_KEY}`
    );

    return NextResponse.json(
      { success: true, channelData: data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
