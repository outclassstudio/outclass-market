"use client";

import { InitialPosts } from "@/app/(tabs)/life/page";
import SinglePostBox from "./single-post-box";
import { useEffect, useRef, useState } from "react";
import { getMorePosts } from "@/app/(tabs)/life/actions";

interface PostsListProps {
  initialPosts: InitialPosts;
}

export default function PostList({ initialPosts }: PostsListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);
  const trigger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newPosts = await getMorePosts(page + 1);

          if (newPosts.length) {
            setPage((prev) => prev + 1);
            setPosts((prev) => [...prev, ...newPosts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -78px 0px",
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    //clean-up function
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col mb-20">
      {posts.map((post) => (
        <SinglePostBox key={post.id} post={post} />
      ))}
      {isLastPage ? null : (
        <div ref={trigger} className="bg-transparent text-transparent">
          {isLoading ? "로딩중" : "더 가져오기"}
        </div>
      )}
    </div>
  );
}
