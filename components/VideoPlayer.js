import { Box } from "@chakra-ui/react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoId }) => {
  return (
    <Box w="100%" borderRadius="2xl" overflow="hidden" textAlign="center">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls
        width={"100%"}
        height={"100%"}
        playing={true}
        style={{ aspectRatio: "16/9", verticalAlign: "middle" }}
      />
    </Box>
  );
};

export default VideoPlayer;
