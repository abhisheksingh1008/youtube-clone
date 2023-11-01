import { Box, Text, Tooltip } from "@chakra-ui/react";
import { abbreviateNumber } from "js-abbreviation-number";
import { RxDotFilled } from "react-icons/rx";
import Link from "next/link";
import moment from "moment";

const RelatedVideoItem = ({ video }) => {
  const {
    snippet: { title, channelTitle, thumbnails, publishedAt },
    statistics: { viewCount },
    contentDetails: { duration },
  } = video;

  return (
    <Box w={"100%"}>
      <Link href={`/videos/${video.id}`}>
        <Box mb={3} display={{ base: "block", md: "flex", lg: "flex" }}>
          <Box
            mr={2}
            w={{ base: "100%", md: "50%", lg: "50%" }}
            overflow="hidden"
            borderRadius={12}
            position="relative"
          >
            <img
              src={thumbnails?.high?.url}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                aspectRatio: "16/9",
              }}
            />
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
          </Box>
          <Box
            mt={{ base: 2, md: 0, lg: 0 }}
            maxW={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Text fontSize={"0.9rem"} as={"b"}>
              {title.substring(0, 50)}
              {title.length > 50 && <span>...</span>}
            </Text>
            <Tooltip label={channelTitle}>
              <Text mt={0.5} color={"gray"} fontSize={"0.85rem"}>
                {channelTitle.substring(0, 22)}
                {channelTitle.length > 22 && <span>...</span>}
              </Text>
            </Tooltip>
            <Text mt={0.5} color={"gray"} fontSize={"0.85rem"}>
              {abbreviateNumber(viewCount, 1)} views
            </Text>
            <Text mt={0.5} color={"gray"} fontSize={"0.85rem"}>
              {moment(publishedAt).fromNow()}
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default RelatedVideoItem;
