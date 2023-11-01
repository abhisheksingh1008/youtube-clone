"use client";

import { useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChannelVideoItem from "./ChannelVideoItem";
import DarkLoadingSpinner from "./DarkLoadingSpinner";
import LightLoadingSpinner from "./LightLoadingSpinner";

const ChannelVideos = ({ uploadsPlaylistId }) => {
  const { colorMode } = useColorMode();

  const [error, setError] = useState("");
  const [channelVideos, setChannelVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  const getChannelVideos = async () => {
    try {
      const { data } = await axios.post("/api/channels/channelVideos", {
        playlistId: uploadsPlaylistId,
        nextPageToken: nextPageToken,
      });

      if (data?.videosData?.items) {
        // console.log(data.videosData.items);
        setNextPageToken(data.videosData.nextPageToken);
        setChannelVideos((prev) => [...prev, ...data.videosData.items]);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong, failed to load videos");
    }
  };

  useEffect(() => {
    if (uploadsPlaylistId === "") return;
    else {
      setChannelVideos([]);
      setNextPageToken("");
      getChannelVideos();
    }
  }, [uploadsPlaylistId]);

  return (
    <InfiniteScroll
      dataLength={channelVideos.length}
      next={getChannelVideos}
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
          <b>Thats all!</b>
        </div>
      }
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {channelVideos.map((v) => (
        <ChannelVideoItem key={v?.resourceId?.videoId} video={v} />
      ))}
    </InfiniteScroll>
  );
};

export default ChannelVideos;
