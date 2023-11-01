"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApp } from "@/store/app-context";
import { RiSearchLine } from "react-icons/ri";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import MobileLogo from "@/assets/yt-logo-mobile.png";
import Logo from "@/assets/yt-logo.png";
import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Tooltip,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import classes from "@/styles/Header.module.css";

const Header = () => {
  const { mobileMenu, setMobileMenu, setSelectedCategory } = useApp();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search.trim().length === 0) {
        toast({
          title: "Please enter something in the input.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      router.push(`/search?query=${search}`);
    }
  };

  const searchHandler = (e) => {
    event.preventDefault();
    if (search.trim().length === 0) {
      toast({
        title: "Please enter something in the input.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    router.push(`/search?query=${search}`);
  };

  return (
    <header className={classes.header}>
      <Box bg={colorMode === "dark" ? "#1A202C" : "white"}>
        <Box
          py={2}
          pt={3}
          px={{ base: 2, md: 4 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display={"flex"} alignItems="center">
            <Button
              mr={3}
              onClick={() => {
                setMobileMenu((prev) => !prev);
              }}
              display={{ md: "block", base: "none", lg: "none" }}
            >
              {mobileMenu ? <RxCross1 /> : <RxHamburgerMenu />}
            </Button>
            <Link href={"/"}>
              <Image
                src={Logo}
                alt="App logo"
                className={classes.logo}
                priority
                onClick={() => setSelectedCategory("New")}
              />
            </Link>
          </Box>
          <Box display={{ md: "block", base: "none" }}>
            <form onKeyDown={handleSearch}>
              <InputGroup size="md">
                <Input
                  pr="1.5rem"
                  value={search}
                  placeholder="Search..."
                  variant={"filled"}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <InputRightAddon
                  children={<RiSearchLine />}
                  style={{ cursor: "pointer" }}
                  onClick={searchHandler}
                />
              </InputGroup>
            </form>
          </Box>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant={"solid"}
              colorScheme="gray"
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
            </Button>
            <span style={{ marginLeft: "0.75rem" }}>
              <Tooltip label={"Guest User"} hasArrow>
                <Avatar size="sm" name="Guest User" />
              </Tooltip>
            </span>
          </div>
        </Box>
        <Box
          mt={1}
          px={2}
          pb={3}
          w={"100%"}
          minW={"100%"}
          display={{ lg: "none", md: "none", base: "block" }}
        >
          <Box
            display="flex"
            alignItems="center"
            // justifyContent={"space-between"}
          >
            <Button
              mr={1}
              onClick={() => {
                setMobileMenu((prev) => !prev);
              }}
            >
              {mobileMenu ? <RxCross1 /> : <RxHamburgerMenu />}
            </Button>
            <Box width={"100%"}>
              <form onKeyDown={handleSearch}>
                <InputGroup size="md">
                  <Input
                    pr="1.5rem"
                    value={search}
                    variant={"filled"}
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <InputRightAddon
                    children={<RiSearchLine />}
                    style={{ cursor: "pointer" }}
                    onClick={searchHandler}
                  />
                </InputGroup>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
