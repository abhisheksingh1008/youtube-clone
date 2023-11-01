"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LightLoadingSpinner from "@/components/LightLoadingSpinner";
import DarkLoadingSpinner from "@/components/DarkLoadingSpinner";
import SearchChannelItem from "@/components/SearchChannelItem";
import SearchVideoItem from "@/components/SearchVideoItem";
import { useApp } from "@/store/app-context";

const page = () => {
  const { colorMode } = useColorMode();
  const query = useSearchParams().get("query");
  const { setSelectedCategory } = useApp();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  const fetchMoreSearchResults = async () => {
    try {
      const { data } = await axios.post("/api/search", {
        query: query,
        nextPageToken,
      });
      setSearchResults((prev) => [...prev, ...data.searchResults.items]);
      setNextPageToken(data?.searchResults?.nextPageToken || "");
      // console.log(data?.searchResults?.items);
    } catch (error) {
      console.log(error);
      setError("Something went wrong, failed to load videos.");
    }
  };

  useEffect(() => {
    if (query.trim().length === 0) {
      return;
    }

    const fetchSearchResults = async () => {
      setNextPageToken("");
      setLoading(true);
      try {
        const { data } = await axios.post("/api/search", {
          query: query,
          nextPageToken: "",
        });
        setSearchResults(data.searchResults.items);
        setNextPageToken(data?.searchResults?.nextPageToken || "");
        // console.log(data?.searchResults?.items);
      } catch (error) {
        console.log(error);
        setError("Something went wrong, failed to load videos.");
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  useEffect(() => {
    setSelectedCategory("");
  }, []);

  return (
    <Box w={"100%"}>
      {loading ? (
        <Box h={"100%"} display="grid" placeItems="center">
          {colorMode === "dark" ? (
            <LightLoadingSpinner />
          ) : (
            <DarkLoadingSpinner />
          )}
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={searchResults.length}
          next={fetchMoreSearchResults}
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
          }}
        >
          {searchResults.map((res) =>
            res.id.kind === "youtube#channel" ? (
              <SearchChannelItem key={res.id.channelId} channel={res} />
            ) : res.id.kind === "youtube#video" ? (
              <SearchVideoItem key={res.id.videoId} video={res} />
            ) : (
              <></>
            )
          )}
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default page;
