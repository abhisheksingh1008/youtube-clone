"use client";

import { Avatar, Box, Text } from "@chakra-ui/react";
import { abbreviateNumber } from "js-abbreviation-number";

const ChannelDetails = ({ channel }) => {
  const {
    snippet: {
      title,
      description,
      thumbnails: {
        high: { url: channelThumbnail },
      },
    },
    statistics: { subscriberCount, videoCount },
  } = channel;

  return (
    <Box>
      <Box
        p={5}
        px={{ base: 5, md: 8, lg: 8 }}
        display={"flex"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        justifyContent={{ base: "center", md: "flex-start", lg: "flex-start" }}
        gap={6}
        textAlign={{ base: "center", md: "inherit", lg: "inherit" }}
      >
        <Avatar
          name={title}
          src={channelThumbnail}
          size={{ base: "lg", md: "2xl", lg: "2xl" }}
        />
        <Box ml={{ base: 0, md: 4, lg: 4 }}>
          <Text fontSize={"1.3rem"}>{title}</Text>
          <Box
            mt={{ base: 1, md: 2, lg: 2 }}
            color={"gray"}
            display={"flex"}
            fontSize={"0.85rem"}
            alignItems={"center"}
          >
            <Text>@{title}</Text>
            <Text ml={{ base: 2, md: 3, lg: 3 }}>
              {abbreviateNumber(subscriberCount, 1)} subscribers
            </Text>
            <Text ml={{ base: 2, md: 3, lg: 3 }}>
              {abbreviateNumber(videoCount, 1)} videos
            </Text>
          </Box>
          <Text
            mt={{ base: 1, md: 2, lg: 2 }}
            color={"gray"}
            fontSize={"0.85rem"}
          >
            {description.substring(0, 25)}...
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetails;
