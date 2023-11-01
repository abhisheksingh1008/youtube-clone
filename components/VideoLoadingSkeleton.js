import { Box, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <Box w={"100%"}>
      <Skeleton width={"100%"} borderRadius={8} aspectRatio="16/9" />
      <Box mt={2} w={"100%"} display="flex" alignItems="flex-start">
        <SkeletonCircle size="12" />
        <Box ml={1} w={"86%"}>
          <Skeleton height="22px" width={"100%"} m={1} mb={1.5} />
          <Skeleton height="12px" width={"65%"} m={1} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingSkeleton;
