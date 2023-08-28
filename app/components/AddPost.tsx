"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { error } from "console";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setisDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log(error);
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
        setisDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Post has been made", { id: toastPostID });
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setisDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    setisDisabled(true);
    mutate(title);
  };
  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 rounded-xl text-white py-2 px-6 disabled "
          type="submit"
        >
          Create a Post
        </button>
      </div>
    </form>
  );
}
