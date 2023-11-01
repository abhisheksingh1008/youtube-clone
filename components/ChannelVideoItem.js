"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import moment from "moment/moment";
import { Box, Text } from "@chakra-ui/react";
import { RxDotFilled } from "react-icons/rx";
import { abbreviateNumber } from "js-abbreviation-number";

const ChannelVideoItem = ({ video }) => {
  const {
    snippet: {
      title,
      thumbnails,
      publishedAt,
      resourceId: { videoId: id },
    },
  } = video;

  const [duration, setDuration] = useState(0);
  const [viewCount, setViewConunt] = useState(0);

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const {
          data: {
            videoData: { items },
          },
        } = await axios.post(`/api/videos`, {
          videoId: id,
        });
        // console.log(data);
        setDuration(items[0]?.contentDetails?.duration);
        setViewConunt(items[0]?.statistics?.viewCount);
      } catch (error) {
        console.log(error);
      }
    };

    getVideoDetails();
  }, [id]);

  return (
    <Box m={3} w={{ base: "100%", md: "46%", lg: "30.5%" }}>
      <Link href={`/videos/${id}`}>
        <Box w={"100%"} position="relative" borderRadius={12} overflow="hidden">
          <img
            src={thumbnails?.high?.url}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              aspectRatio: "16/9",
            }}
          />
          {duration !== 0 && (
            <Box
              py={1}
              px={1.5}
              color={"white"}
              bg={"blackAlpha.900"}
              position="absolute"
              right={1}
              bottom={1}
              borderRadius={5}
            >
              {moment
                .utc(moment.duration(duration).asMilliseconds())
                .format("mm:ss")}
            </Box>
          )}
        </Box>
        <Box mt={2}>
          <Text as={"b"} fontSize={"1.1rem"}>
            {title.substring(0, 66)}
            {title.length > 66 && <span>...</span>}
          </Text>
          <Box mt={1} display={"flex"} alignItems="center">
            {viewCount !== 0 && (
              <>
                <Text color={"gray"}>
                  {abbreviateNumber(viewCount, 1)} views
                </Text>
                <span>
                  <RxDotFilled style={{ color: "gray" }} />
                </span>
              </>
            )}
            <Text color={"gray"}>{moment(publishedAt).fromNow()}</Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default ChannelVideoItem;
