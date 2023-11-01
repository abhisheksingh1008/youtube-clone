import "./globals.css";
import { Inter } from "next/font/google";
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  extendTheme,
} from "@chakra-ui/react";
import AppContextProvider from "@/store/app-context";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yotube Clone",
  description: "Created by Abhishek Singh",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({ config });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <AppContextProvider>
            <Header />
            <main>
              <Box
                mt={{ base: "6.7rem", md: "3.8rem" }}
                display="flex"
                alignItems="flex-start"
                justifyContent={"flex-start"}
                gap={{ lg: "1rem", md: "0.5rem", base: "0rem" }}
              >
                <Navigation />
                <Box w={"100%"} ml={{ base: "0", md: 0, lg: "14rem" }}>
                  {children}
                </Box>
              </Box>
            </main>
          </AppContextProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
