import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link";

async function getArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/article`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <Box maxW="4xl" mx="auto" py={12} px={4}>
      <Heading size="2xl" mb={2}>Francisco Guardado Super Drupal</Heading>
      <Text color="gray.500" mb={12}>Powered by Drupal 11 + Next.js + Chakra UI</Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        {articles.map((article: any) => (
          <NextLink
            key={article.id}
            href={`/articles/${article.attributes.field_slug}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              borderWidth="1px"
              borderRadius="xl"
              p={6}
              _hover={{ borderColor: "blue.400", bg: "gray.900" }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Heading size="md" mb={2} color="white">
                {article.attributes.title}
              </Heading>
              <Text color="gray.400" fontSize="sm">Read article →</Text>
            </Box>
          </NextLink>
        ))}
      </SimpleGrid>

      {articles.length === 0 && (
        <Text color="gray.400">No articles yet. Create some in Drupal!</Text>
      )}
    </Box>
  );
}
