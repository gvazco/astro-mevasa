import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const response = await fetch(`${import.meta.env.WPGRAPHQL_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      query: `
      query AllProjects {
        projects(first: 1000) {
                nodes {
                databaseId
                featuredImage {
                        node {
                        sourceUrl
                        mediaDetails {
                            height
                            width
                            }
                        }
                    }
                title
                uri
                excerpt
                content
                }
            }
        }
      `,
    }),
  });
  const { data } = await response.json();
  return new Response(JSON.stringify({ projects: data.projects.nodes }));
};
