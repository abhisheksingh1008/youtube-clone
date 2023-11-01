"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext({
  videos: [],
  error: "",
  totalVideos: 0,
  loadingVideos: false,
  nextPageToken: "",
  mobileMenu: false,
  selectedCategory: "",
  setError: () => {},
  setVideos: () => {},
  setMobileMenu: () => {},
  setTotalVideos: () => {},
  setLoadingVideos: () => {},
  setNextPageToken: () => {},
  setSelectedCategory: () => {},
});

const AppContextProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [totalVideos, setTotalVideos] = useState(0);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("New");

  useEffect(() => {
    if (selectedCategory === "") {
      return;
    }

    const fetchVideosByCategory = async () => {
      setVideos([]);
      setError("");
      setTotalVideos(0);
      setNextPageToken("");
      setLoadingVideos(true);
      try {
        const { data } = await axios.post("/api/search", {
          query: selectedCategory,
          nextPageToken: "",
        });
        let items = [];
        if (data.searchResults.error) {
          setError("Failed to load videos");
        } else {
          if (data.searchResults?.items?.length !== 0) {
            items = data?.searchResults?.items?.filter(
              (item) => item?.id?.kind === "youtube#video"
            );
          } else {
            setError("Failed to load videos");
          }
        }
        setVideos(items);
        setNextPageToken(data?.searchResults?.nextPageToken || "");
        setTotalVideos(data?.searchResults?.pageInfo?.totalResults || 0);
        // console.log(data?.searchResults?.items, items);
      } catch (error) {
        console.log(error);
        setError("Something went wrong, failed to load videos.");
      }
      setLoadingVideos(false);
    };

    fetchVideosByCategory();
  }, [selectedCategory]);

  return (
    <AppContext.Provider
      value={{
        videos,
        error,
        mobileMenu,
        totalVideos,
        loadingVideos,
        nextPageToken,
        selectedCategory,
        setError,
        setVideos,
        setMobileMenu,
        setTotalVideos,
        setLoadingVideos,
        setNextPageToken,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
