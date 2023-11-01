"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Box, useColorMode } from "@chakra-ui/react";
import LightLoadingSpinner from "@/components/LightLoadingSpinner";
import DarkLoadingSpinner from "@/components/DarkLoadingSpinner";
import ChannelDetails from "@/components/ChannelDetails";
import ChannelVideos from "@/components/ChannelVideos";
import { useApp } from "@/store/app-context";

const page = ({ params }) => {
  const { colorMode } = useColorMode();
  const { setSelectedCategory } = useApp();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [channelDetails, setChannelDetails] = useState({
    id: "",
    snippet: {
      title: "",
      description: "",
      thumbnails: {
        high: { url: "" },
      },
    },
    statistics: { subscriberCount: 0, videoCount: 1 },
  });
  const [channelUploadsPlaylistId, setChannelUploadsPlaylistId] = useState("");

  useEffect(() => {
    if (params.channelId === "") return;

    const getChannelDetails = async () => {
      setLoading(true);
      try {
        const {
          data: {
            channelData: { items },
          },
        } = await axios.post(`/api/channels`, {
          channelId: params.channelId,
        });
        // console.log(items);
        if (items) {
          setChannelDetails(items[0]);
          setChannelUploadsPlaylistId(
            items[0].contentDetails.relatedPlaylists.uploads
          );
        }
      } catch (error) {
        console.log(error);
        setError("Something went wrong, falied to load channel details.");
      }
      setLoading(false);
    };

    getChannelDetails();
  }, [params.channelId]);

  useEffect(() => {
    setSelectedCategory("");
  }, []);

  return (
    <>
      {loading ? (
        colorMode === "dark" ? (
          <LightLoadingSpinner />
        ) : (
          <DarkLoadingSpinner />
        )
      ) : (
        <>
          <ChannelDetails channel={channelDetails} />
          {channelUploadsPlaylistId && (
            <ChannelVideos
              uploadsPlaylistId={channelUploadsPlaylistId}
              totalVideos={channelDetails.videoCount}
            />
          )}
        </>
      )}
    </>
  );
};

export default page;
