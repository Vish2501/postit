"use client";

import Post from "../../components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "../../components/AddComment";
import Image from "next/image";
import { PostType } from "../../types/Post";

type URL = {
  params: {
    slug: string;
  };
};
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        Comment={data?.Comments}
      />
      <AddComment id={data?.id} />
      {data?.Comments?.map((Comments) => (
        <div key={Comments.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={Comments.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{Comments?.user?.name}</h3>
            <h2 className="text-sm">{Comments?.createdAt}</h2>
          </div>
          <div className="py-4">{Comments?.title} </div>
        </div>
      ))}
    </div>
  );
}
