import moment from "moment";
import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { BiLike, BiDislike } from "react-icons/bi";

const CommentItem = ({ comment }) => {
  const {
    snippet: {
      topLevelComment: {
        snippet: {
          textOriginal,
          authorDisplayName,
          authorProfileImageUrl,
          publishedAt,
          likeCount,
        },
      },
    },
  } = comment;

  return (
    <Box mb={2}>
      <Box display={"flex"}>
        <Avatar
          size={"md"}
          name={authorDisplayName}
          src={authorProfileImageUrl}
        />
        <Box ml={4}>
          <Box display={"flex"} alignItems={"center"}>
            <Text fontSize={"0.9rem"} fontWeight={"semibold"}>
              {authorDisplayName}
            </Text>
            <Text ml={2} fontSize={"0.85rem"} color={"gray.500"}>
              {moment(publishedAt).fromNow()}
            </Text>
          </Box>
          <Text pt={1} fontSize={"0.925rem"}>
            {textOriginal}
          </Text>
          <Box mt={0.5} display={"flex"} alignItems={"center"}>
            <Box fontSize={"0.8rem"} display={"flex"} alignItems={"center"}>
              <BiLike fontSize={"0.95rem"} style={{ marginRight: "0.25rem" }} />
              {likeCount}
            </Box>
            <Box ml={4}>
              <BiDislike fontSize={"0.95rem"} />
            </Box>
            <Button
              ml={3}
              variant={"ghost"}
              colorScheme={"gray"}
              borderRadius={"full"}
              fontSize={"0.85rem"}
            >
              Reply
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentItem;
