"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useApp } from "@/store/app-context";
import { Box, useColorMode } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSkeleton from "@/components/VideoLoadingSkeleton";
import LightLoadingSpinner from "@/components/LightLoadingSpinner";
import DarkLoadingSpinner from "@/components/DarkLoadingSpinner";
import RelatedVideoItem from "@/components/RelatedVideoItem";
import VideoDetails from "@/components/VideoDetails";
import VideoPlayer from "@/components/VideoPlayer";
import CommentSection from "@/components/CommentSection";

const page = ({ params }) => {
  const { colorMode } = useColorMode();
  const { setSelectedCategory } = useApp();

  const [video, setVideo] = useState({
    snippet: {
      title: "",
      channelId: "",
      description: "",
      channelTitle: "",
      publishedAt: "",
    },
    statistics: {
      viewCount: "",
      likeCount: "",
      commentCount: "",
    },
    contentDetails: {
      duration: "",
    },
  });
  const [loadingVideoDetails, setLoadingVideoDetails] = useState(false);
  const [videoCategoryId, setVideoCategoryId] = useState("");
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loadingRelatedVideos, setLoadingRelatedVideos] = useState(false);
  const [relatedVideosNextToken, setRelatedVideosNextToken] = useState("");

  const fetchMoreRelatedVideos = async () => {
    try {
      const { data } = await axios.post(`/api/videos/relatedVideos`, {
        videoCategoryId: videoCategoryId,
        nextPageToken: relatedVideosNextToken,
      });

      if (data.success) {
        // console.log(data.relatedVideos.items);
        setRelatedVideos((prev) => [...prev, ...data?.relatedVideos?.items]);
        setRelatedVideosNextToken(data.relatedVideos.nextPageToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRelatedVideos([]);
    setRelatedVideosNextToken("");

    const getVideoDetails = async () => {
      setLoadingVideoDetails(true);
      try {
        const {
          data: {
            videoData: { items },
          },
        } = await axios.post(`/api/videos`, {
          videoId: params.videoId,
        });
        // console.log(items);
        if (items) {
          setVideo(items[0]);
          setVideoCategoryId(items[0]?.snippet?.categoryId);
        }
      } catch (error) {
        console.log(error);
      }
      setLoadingVideoDetails(false);
    };

    getVideoDetails();
  }, [params.videoId]);

  useEffect(() => {
    if (videoCategoryId === "") return;

    const fetchRelatedVideos = async () => {
      setLoadingRelatedVideos(true);
      try {
        const { data } = await axios.post(`/api/videos/relatedVideos`, {
          videoCategoryId: videoCategoryId,
          nextPageToken: "",
        });

        if (data.success) {
          setRelatedVideos((prev) => [...prev, ...data?.relatedVideos?.items]);
          setRelatedVideosNextToken(data.relatedVideos.nextPageToken);
        }
      } catch (error) {
        console.log(error);
      }
      setLoadingRelatedVideos(false);
    };

    fetchRelatedVideos();
  }, [videoCategoryId]);

  useEffect(() => {
    setSelectedCategory("");
  }, []);

  return (
    <Box
      py={4}
      px={{ base: 2, md: 4, lg: 5 }}
      w="100%"
      display="flex"
      flexDirection={{ base: "column", md: "row", lg: "row" }}
      justifyContent={{ base: "center", md: "center", lg: "center" }}
      alignItems={{ base: "flex-start", md: "flex-start", lg: "flex-start" }}
      gap={4}
    >
      {loadingVideoDetails ? (
        <Box w={{ base: "100%", md: "60%", lg: "60%", xl: "40%" }}>
          <LoadingSkeleton height={"23rem"} />
        </Box>
      ) : (
        <Box w={{ base: "100%", md: "58%", lg: "60%" }}>
          <VideoPlayer videoId={params.videoId} />
          <VideoDetails video={video} />
          <CommentSection videoId={params.videoId} />
        </Box>
      )}
      <Box w={{ base: "100%", md: "40%", lg: "36%", xl: "40%" }}>
        {loadingRelatedVideos ? (
          [...Array(12)].map((_, index) => (
            <Box mb={2} w={"100%"} key={index}>
              <LoadingSkeleton height={"13rem"} />
            </Box>
          ))
        ) : (
          <InfiniteScroll
            dataLength={relatedVideos.length}
            next={fetchMoreRelatedVideos}
            hasMore={true}
            loader={
              colorMode === "dark" ? (
                <LightLoadingSpinner />
              ) : (
                <DarkLoadingSpinner />
              )
            }
            style={{ width: "100%" }}
            // scrollableTarget="relatedVideosContainer"
          >
            {relatedVideos.length > 0 &&
              relatedVideos.map((v) => (
                <RelatedVideoItem key={v.id} video={v} />
              ))}
          </InfiniteScroll>
        )}
      </Box>
    </Box>
  );
};

export default page;
