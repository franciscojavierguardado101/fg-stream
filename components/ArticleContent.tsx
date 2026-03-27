"use client";

import { Box, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import ParagraphResolver from "@/components/paragraphs/ParagraphResolver";

interface ArticleContentProps {
  title: string;
  paragraphs: any[];
}

export default function ArticleContent({ title, paragraphs }: ArticleContentProps) {
  return (
    <Box maxW="4xl" mx="auto" py={12} px={4}>
      <NextLink href="/" style={{ color: "#63b3ed", display: "inline-block", marginBottom: "2rem" }}>
        ← Back to all articles
      </NextLink>
      <Heading size="2xl" mb={10}>{title}</Heading>
      {paragraphs.map((paragraph: any) => (
        <ParagraphResolver key={paragraph.id} paragraph={paragraph} />
      ))}
    </Box>
  );
}
