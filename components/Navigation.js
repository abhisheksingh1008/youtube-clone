"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/store/app-context";
import { Box, useColorMode } from "@chakra-ui/react";
import { categories, options } from "@/utils/constants";

const Navigation = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { selectedCategory, setSelectedCategory, mobileMenu } = useApp();

  return (
    <Box
      px={3}
      pt={1}
      minW="13rem"
      position="fixed"
      left="0"
      top={{ base: "6.5rem", md: "3.75rem" }}
      bg={colorMode === "dark" ? "#1A202C" : "white"}
      display={{
        lg: "block",
        md: mobileMenu ? "block" : "none",
        base: mobileMenu ? "block" : "none",
      }}
      zIndex={{ base: "dropdown", md: "dropdown", lg: "auto" }}
      boxShadow={{ md: "none", base: "2xl" }}
    >
      {categories.map((category) => (
        <Box key={category.name}>
          <Box
            my={1}
            px={2}
            py={1.5}
            display="flex"
            cursor="pointer"
            alignItems="center"
            borderRadius={7}
            bg={
              selectedCategory === category.name
                ? colorMode === "dark"
                  ? "whiteAlpha.400"
                  : "blackAlpha.300"
                : ""
            }
            onClick={() => {
              setSelectedCategory(category.name);
              router.push("/");
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>{category.icon}</span>
            <span>{category.name}</span>
          </Box>
          {category.divider && <hr />}
        </Box>
      ))}
      {options.map((option) => (
        <Box
          my={1}
          px={2}
          py={1.5}
          key={option.name}
          display="flex"
          cursor="pointer"
          alignItems="center"
          borderRadius={7}
          bg={
            selectedCategory === option.name
              ? colorMode === "dark"
                ? "whiteAlpha.400"
                : "blackAlpha.300"
              : ""
          }
        >
          <span style={{ marginRight: "0.5rem" }}>{option.icon}</span>
          <span>{option.name}</span>
        </Box>
      ))}
    </Box>
  );
};

export default Navigation;
