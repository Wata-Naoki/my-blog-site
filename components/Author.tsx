import React from "react";
import Image from "next/image";
type Props = {
  //authorの型を定義
  author: {
    name: string;
    bio: string;
    photo: {
      url: string;
    };
  };
};
const Author = ({ author }: Props) => {
  return (
    <div className="relative p-12 mt-20 mb-8 text-center bg-black rounded-lg bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          unoptimized
          alt={author.name}
          height="100"
          width="100"
          className="object-center w-24 h-24 mx-auto rounded-full"
          src={author.photo.url}
        />
      </div>
      <h3 className="my-4 text-xl font-bold text-white">{author.name}</h3>
      <p className="text-lg text-white">{author.bio}</p>
    </div>
  );
};

export default Author;
