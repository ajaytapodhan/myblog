import { getPostsMeta, getPostByName } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import getFormattedDate from "@/lib/getFormatedDate";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
export const revalidate = 86400; //Setting cache to no cache

type Props = {
  params: {
    postId: string;
  };
};

//Now we want to set to SSG
// export async function generateStaticParams() {
//   const posts = await getPostsMeta(); // deduped!

//   if (!posts) {
//     return [];
//   }
//   return posts.map((post) => ({
//     postId: post.id,
//   }));
// }

export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}
async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`);

  if (!post) {
    return notFound();
  }

  const { meta, content } = post;

  const pubDate = getFormattedDate(meta.date);

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
      <p className="mt-0 text-sm">{pubDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p className="mb-10">
        <Link href="/">← Back to home</Link>
      </p>
    </>
  );
}

export default Post;
