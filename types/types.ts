export type PostDetail = {
  post: {
    title: string;
    author: {
      name: string;
      bio: string;
      photo: {
        url: string;
      };
    };
    coverImage: {
      url: string;
    };
    date: string;
    featuredImage: {
      url: string;
    };
    slug: string;
    tags: string[];
    createdAt: string;
    publishedAt: string;
    content: {
      html: string;
      text: string;
      raw: {
        type: string;
        children: {
          text: string;
          bold: boolean;
          italic: boolean;
          underline: boolean;
          href: string;
        }[];
      };
    };
  };
};

//postの型を定義
export type Post = {
  post: {
    slug: string;
    featuredImage: {
      url: string;
    };
    author: {
      name: string;
      photo: {
        url: string;
      };
    };
    createdAt: string;
    title: string;
    excerpt: string;
  };
};

export type PostWidget = {
  categories?: {
    name: string;
    slug: string;
  };
  slug?: string;
};

export type RelatedPosts = {
  title: string;
  slug: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
};

export type Categories = {
  name: string;
  slug: string;
};

export type FeaturedPost = {
  post: {
    title: string;
    slug: string;
    createdAt: string;
    author: {
      name: string;
      photo: {
        url: string;
      };
    };
    featuredImage: {
      url: string;
    };
  };
};

// commentsの型定義を追加
export type Comments = {
  name: string;
  comment: string;
  createdAt: string;
};

export type CommentsSlug = {
  slug: string;
};
export type Author = {
  //authorの型を定義
  author: {
    name: string;
    bio: string;
    photo: {
      url: string;
    };
  };
};

export type CommentsFormSlug = {
  slug: string;
};

export type TypeObj = {
  text: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  href: string;
  children?: TypeObj[];
  type?: string;
};
