"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { RxDotFilled } from "react-icons/rx";
import { abbreviateNumber } from "js-abbreviation-number";
import Link from "next/link";

const SearchChannelItem = ({ channel }) => {
  const [subscriberCount, setSubscriberCount] = useState(0);

  const {
    id: { channelId },
    snippet: { channelTitle, description, thumbnails },
  } = channel;

  useEffect(() => {
    const getChannelDetails = async () => {
      try {
        const {
          data: {
            channelData: { items },
          },
        } = await axios.post(`/api/channels`, {
          channelId: channelId,
        });
        // console.log(items);
        setSubscriberCount(items[0]?.statistics?.subscriberCount);
      } catch (error) {
        console.log(error);
      }
    };
    getChannelDetails();
  }, [channelId]);

  return (
    <Link href={`/channels/${channelId}`}>
      <Box m={6} display="flex" gap={{ base: 6, md: 5, lg: 5 }}>
        <Box w={"30%"} textAlign="center">
          <Avatar
            name={channelTitle}
            src={thumbnails?.high?.url}
            size={{ base: "xl", md: "2xl", lg: "2xl" }}
          />
        </Box>
        <Box>
          <Text fontSize={"1.2rem"} as="b">
            {channelTitle}
          </Text>
          <Box
            mt={1}
            display={{ base: "block", md: "flex", lg: "flex" }}
            alignItems="center"
            fontSize={"0.95rem"}
            color={"gray"}
          >
            <Text>@{channelTitle}</Text>
            <Box ml={1} display={{ base: "none", md: "block", lg: "block" }}>
              <RxDotFilled />
            </Box>
            <Text ml={{ base: 0, md: 1, lg: 1 }} mt={{ base: 1, md: 0, lg: 0 }}>
              {abbreviateNumber(subscriberCount, 1)} subscribers
            </Text>
          </Box>
          <Text
            mt={1}
            color={"gray"}
            fontSize={"0.9rem"}
            display={{ base: "none", md: "block", lg: "block" }}
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default SearchChannelItem;
