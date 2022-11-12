import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

//初期の記事一覧を表示するためのクエリ。paginationを使おう。
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  if (graphqlAPI) {
    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges;
  }
};

export const getPostDetails = async (slug: any) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  if (graphqlAPI) {
    const result = await request(graphqlAPI, query, { slug });
    return result.post;
  }
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails(){
        posts(orderBy: createdAt_DESC, last: 3) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
    }
    }
    `;
  if (graphqlAPI) {
    const result = await request(graphqlAPI, query);
    return result.posts;
  }
};

export const getSimilarPosts = async (categories: any, slug: any) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  if (graphqlAPI) {
    const result = await request(graphqlAPI, query, { slug, categories });
    return result.posts;
  }
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  if (graphqlAPI) {
    const result = await request(graphqlAPI, query);
    return result.categories;
  }
};

export const submitComment = async (obj: any) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return result.json();
};

export const getComments = async (slug: any) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  if (graphqlAPI) {
    const result = await request(graphqlAPI, query, { slug });
    return result.comments;
  }
};
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts {
      posts(where: { featuredPost: true }, orderBy: createdAt_DESC) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
        author {
          name
          photo {
            url
          }
        }
      }
    }
  `;
  if (graphqlAPI) {
    const result = await request(graphqlAPI, query);
    return result.posts;
  }
};
export const getCategoryPost = async (slug: any) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  if (graphqlAPI) {
    const result = await request(graphqlAPI, query, { slug });
    return result.postsConnection.edges;
  }
};
