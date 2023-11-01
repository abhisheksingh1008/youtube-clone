"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import CommentItem from "./CommentItem";
import DarkLoadingSpinner from "./DarkLoadingSpinner";
import LightLoadingSpinner from "./LightLoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

const CommentSection = ({ videoId }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [comments, setComments] = useState([]);
  const [commentNextToken, setCommentNextToken] = useState("");

  const fetchMoreComments = async () => {
    try {
      const { data } = await axios.post("/api/videos/comments", {
        videoId: videoId,
        nextPageToken: commentNextToken,
      });

      if (data.success) {
        // console.log(data.commentsData.items);
        setComments((prev) => [...prev, ...data?.commentsData?.items]);
        setCommentNextToken(data.commentsData.nextPageToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMoreComments();
  }, [videoId]);

  return (
    <>
      <Box display={{ base: "block", md: "none", lg: "none" }}>
        <Box
          p={3}
          mt={3}
          cursor="pointer"
          textAlign="center"
          borderRadius={"full"}
          bg={colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200"}
          onClick={onOpen}
        >
          Comments
        </Box>
        <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader textAlign="center" borderBottomWidth="1px">
              Comments
            </DrawerHeader>
            <DrawerBody id="drawerCommentsContainer">
              <InfiniteScroll
                dataLength={comments.length}
                next={fetchMoreComments}
                hasMore={true}
                loader={
                  colorMode === "dark" ? (
                    <LightLoadingSpinner />
                  ) : (
                    <DarkLoadingSpinner />
                  )
                }
                scrollableTarget="drawerCommentsContainer"
              >
                {comments.map((c) => (
                  <CommentItem key={c.id} comment={c} />
                ))}
              </InfiniteScroll>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box
        mt={3}
        p={4}
        h={"30rem"}
        borderRadius={"2xl"}
        overflowY={"scroll"}
        id="commentsContainer"
        display={{ base: "none", md: "block", lg: "block" }}
        bg={colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200"}
      >
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchMoreComments}
          hasMore={true}
          loader={
            colorMode === "dark" ? (
              <LightLoadingSpinner />
            ) : (
              <DarkLoadingSpinner />
            )
          }
          scrollableTarget="commentsContainer"
        >
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default CommentSection;
