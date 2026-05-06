import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: URL }) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return rss({
    title: "Trustcam Blog",
    description: "ความรู้และคู่มือกล้องวงจรปิด CCTV จาก Trustcam",
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
        categories: post.data.tags,
      })),
    customData: `<language>th-TH</language>`,
  });
}
