"use client";

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
import { useRouter } from "next/navigation";
import { useApp } from "@/store/app-context";
import { categories, options } from "@/utils/constants";

const NavigationDrawer = ({ children }) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Drawer
        placement={"left"}
        onClose={onClose}
        isOpen={isOpen}
        w={"fit-content"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody p={1.5} px={3} textAlign={"center"}>
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
                    onClose();
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
                onClick={() => onClose()}
              >
                <span style={{ marginRight: "0.5rem" }}>{option.icon}</span>
                <span>{option.name}</span>
              </Box>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;
