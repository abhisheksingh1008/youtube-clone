"use client";

import { useEffect } from "react";
import axios from "axios";
import { Box, useColorMode } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useApp } from "@/store/app-context";
import VideoItem from "@/components/VideoItem";
import LoadingSkeleton from "@/components/VideoLoadingSkeleton";
import DarkLoadingSpinner from "@/components/DarkLoadingSpinner";
import LightLoadingSpinner from "@/components/LightLoadingSpinner";

export default function Home() {
  const { colorMode } = useColorMode();
  const {
    videos,
    error,
    totalVideos,
    loadingVideos,
    nextPageToken,
    selectedCategory,
    setError,
    setVideos,
    setTotalVideos,
    setNextPageToken,
    setSelectedCategory,
  } = useApp();

  const fetchMoreVideosByCategory = async () => {
    if (videos.length < totalVideos) {
      try {
        // console.log("Fetching more videos...");
        const { data } = await axios.post("/api/search", {
          query: selectedCategory,
          nextPageToken,
        });
        let items = [];
        if (data.searchResults.error) {
          setError("Failed to load more videos");
        } else {
          if (data.searchResults?.items?.length !== 0) {
            items = data?.searchResults?.items?.filter(
              (item) => item?.id?.kind === "youtube#video"
            );
          } else {
            setError("Failed to load more videos");
          }
        }
        setVideos((prev) => [...prev, ...items]);
        setNextPageToken(data?.searchResults?.nextPageToken || "");
        setTotalVideos(data?.searchResults?.pageInfo?.totalResults || 0);
        // console.log(data?.searchResults?.items, items);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setSelectedCategory("New");
  }, []);

  return (
    <Box w="100%">
      {loadingVideos ? (
        <Box
          w={"100%"}
          display="flex"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {[...Array(12)].map((_, index) => (
            <Box key={index} m={2} w={{ base: "100%", md: "47%", lg: "31.5%" }}>
              <LoadingSkeleton />
            </Box>
          ))}
        </Box>
      ) : error ? (
        <Box p={2}>{error}</Box>
      ) : (
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreVideosByCategory}
          hasMore={true}
          loader={
            colorMode === "dark" ? (
              !error ? (
                <LightLoadingSpinner />
              ) : (
                ""
              )
            ) : !error ? (
              <DarkLoadingSpinner />
            ) : (
              ""
            )
          }
          endMessage={
            <div style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </div>
          }
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {videos?.map((v) => (
            <VideoItem key={v?.id?.videoId} video={v} />
          ))}
        </InfiniteScroll>
      )}
    </Box>
  );
}

{
  /* {[...Array(12)].map((_, index) => (
        <LoadingSkeleton key={index} />
    ))} */
}
