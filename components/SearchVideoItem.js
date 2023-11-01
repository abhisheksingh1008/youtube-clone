"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import moment from "moment/moment";
import { RxDotFilled } from "react-icons/rx";
import { abbreviateNumber } from "js-abbreviation-number";
import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";

const SearchVideoItem = ({ video }) => {
  const [duration, setDuration] = useState(0);
  const [viewCount, setViewConunt] = useState(0);
  const [channelThumbnail, setChannelThumbnail] = useState("");

  const {
    id: { videoId: id },
    snippet: {
      title,
      description,
      channelId,
      channelTitle,
      thumbnails,
      publishedAt,
    },
  } = video;

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
    <Link href={`/videos/${id}`}>
      <Box
        mx={2}
        mb={5}
        display={{ base: "block", md: "flex", lg: "flex" }}
        justifyContent={"flex-start"}
        gap={{ base: 2, md: 4, lg: 4 }}
      >
        <Box
          mr={2}
          w={{ base: "100%", md: "30%", lg: "30%" }}
          h={"fit-content"}
          overflow="hidden"
          borderRadius={12}
          position="relative"
        >
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
              px={1}
              py={0.5}
              color={"white"}
              bg={"blackAlpha.900"}
              position="absolute"
              right={1.5}
              bottom={1.5}
              borderRadius={5}
              fontSize={"0.85rem"}
            >
              {moment
                .utc(moment.duration(duration).asMilliseconds())
                .format("mm:ss")}
            </Box>
          )}
        </Box>
        <Box
          mt={{ base: 2, md: 0, lg: 0 }}
          maxW={{ base: "100%", md: "50%", lg: "50%" }}
        >
          <Text fontSize={"1.1rem"} as={"b"}>
            {title}
          </Text>
          <Link
            href={`/channels/${channelId}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "0.3rem",
            }}
          >
            <Avatar
              mr={3}
              name={channelTitle}
              src={channelThumbnail}
              size="xs"
            />
            <Tooltip label={channelTitle}>
              <Text color={"gray"} fontSize={"0.95rem"}>
                {channelTitle}
              </Text>
            </Tooltip>
          </Link>
          <Box
            mt={1.5}
            display={"flex"}
            alignItems="center"
            fontSize={"0.9rem"}
            color={"gray"}
          >
            {viewCount !== 0 && (
              <>
                <Text mr={1}>{abbreviateNumber(viewCount, 1)} views</Text>
                <span>
                  <RxDotFilled />
                </span>
              </>
            )}
            <Text ml={1}>{moment(publishedAt).fromNow()}</Text>
          </Box>
          <Text
            mt={1}
            w={"100%"}
            color={"gray"}
            fontSize={"0.85rem"}
            overflow="hidden"
            textOverflow="ellipsis"
            display={{ base: "none", md: "block", lg: "block" }}
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default SearchVideoItem;
