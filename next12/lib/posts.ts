import CustomImage from "@/app/components/CustomImage";
import Video from "@/app/components/Video";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";

type Filetree = {
  tree: [{ path: "string" }];
};

export async function getPostsMeta(): Promise<Promise<Meta[]> | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/bartvanhoey/next12blogposts/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  console.log("getPostsMeta", res);

  if (!res.ok) return undefined;

  const repoFiletree: Filetree = await res.json();

  const filesArray = repoFiletree.tree
    .map((file) => file.path)
    .filter((path) => path.endsWith(".mdx"));

  const posts: Meta[] = [];

  for (const file of filesArray) {
    console.log("file", file);
    const post = await getPostByName(file);
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostByName(
  fileName: string
): Promise<Promise<BlogPost> | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/bartvanhoey/next12blogposts/main/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  console.log("getPostByName", res);

  if (!res.ok) return undefined;

  const rawMdx = await res.text();

  if (rawMdx === "404: Not Found") return undefined;

  console.log("i am here");

  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    tags: string[];
  }>({
    source: rawMdx,
    components: {
      Video, 
      CustomImage
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  const id = fileName.replace(/\.mdx$/, "");

  const BlogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  };

  return BlogPostObj;
}
