import type { Block } from "@wp-block-tools/styles";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const uri = params.uri;

  const response = await fetch(`${import.meta.env.WPGRAPHQL_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      query: `
		query PageQuery($uri: String!) {
			nodeByUri(uri: $uri) {
				... on ContentNode {
					databaseId
					blocks
					seo {
						metaDesc
						title
					}
				}
			}
		}
		`,
      variables: {
        uri: uri || "/",
      },
    }),
  });
  const { data } = await response.json();
  return new Response(JSON.stringify({ data: data.nodeByUri }));
};

export async function getStaticPaths() {
  // api/page-data/buying/all-properties.json
  const response = await fetch(`${import.meta.env.WPGRAPHQL_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      query: `
			query AllPages {
				pages(first: 1000){
					nodes {
						uri
            blocks
					}
				}
        
        posts (first: 1000){
          nodes {
            uri
            blocks
          }
        }  
			}
			`,
    }),
  });
  const { data } = await response.json();
  // console.log(data.pages);
  return [...data.pages.nodes, ...data.posts.nodes]
    .filter((page: any) => {
      let found = false;
      const hasModelsSearch = (blocks: Block[]) => {
        for (let block of blocks) {
          if (block.name === "astroestates/catalog-search") {
            found = true;
            break;
          } else if (block.name === "astroestates/documentation-search") {
            found = true;
            break;
          } else if (block.name === "astroestates/briefcase-search") {
            found = true;
            break;
          }
          if (block.innerBlocks) {
            hasModelsSearch(block.innerBlocks);
          }
        }
      };
      hasModelsSearch(page.blocks);
      return found;
    })
    .map((page: any) => ({
      params: {
        uri:
          page.uri === "/"
            ? undefined
            : page.uri.substring(1, page.uri.length - 1),
      },
    }));
}

// /buying/all-properties/
// api/page-data/buying/all-properties.json
