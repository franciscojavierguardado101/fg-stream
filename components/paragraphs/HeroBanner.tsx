"use client";

import { Box, Text } from "@chakra-ui/react";

interface HeroBannerProps {
  subtitle: string;
  body: string;
}

export default function HeroBanner({ subtitle, body }: HeroBannerProps) {
  return (
    <Box
      bgGradient="to-r"
      gradientFrom="blue.600"
      gradientTo="indigo.600"
      color="white"
      borderRadius="xl"
      p={{ base: 6, md: 12 }}
      mb={8}
    >
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold" mb={4} color="blue.100">
        {subtitle}
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }} color="blue.50" lineHeight="tall">
        {body}
      </Text>
    </Box>
  );
}
