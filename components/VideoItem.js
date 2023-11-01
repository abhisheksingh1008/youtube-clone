"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import moment from "moment/moment";
import { RxDotFilled } from "react-icons/rx";
import { abbreviateNumber } from "js-abbreviation-number";
import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";

const VideoItem = ({ video }) => {
  const {
    id: { videoId: id },
    snippet: { title, channelId, channelTitle, thumbnails, publishedAt },
  } = video;

  const [duration, setDuration] = useState(0);
  const [viewCount, setViewConunt] = useState(0);
  const [channelThumbnail, setChannelThumbnail] = useState("");

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

  useEffect(() => {
    const getChannelThumbnail = async () => {
      try {
        const {
          data: {
            channelData: { items },
          },
        } = await axios.post(`/api/channels`, {
          channelId: channelId,
        });
        // console.log(items);
        setChannelThumbnail(items[0]?.snippet?.thumbnails?.high?.url);
      } catch (error) {
        console.log(error);
      }
    };
    getChannelThumbnail();
  }, [channelId]);

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
      </Link>
      <Box mt={3} w={"100%"} display="flex" alignItems="flex-start">
        <Link href={`/channels/${channelId}`}>
          <Avatar name={channelTitle} src={channelThumbnail} />
        </Link>
        <Box ml={3}>
          <Link href={`/videos/${id}`}>
            <Text as={"b"}>
              {title.substring(0, 65)}
              {title.length > 66 && <span>...</span>}
            </Text>
          </Link>
          <Box mt={1}>
            <Link href={`/channels/${channelId}`}>
              <Tooltip label={channelTitle}>
                <Text color={"gray"} as="b">
                  {channelTitle}
                </Text>
              </Tooltip>
            </Link>
          </Box>
          <Link href={`/videos/${id}`}>
            <Box
              mt={0.5}
              display={"flex"}
              alignItems="center"
              fontSize={"0.95rem"}
            >
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
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoItem;
