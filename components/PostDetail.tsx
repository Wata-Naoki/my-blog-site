/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useEffect } from "react";
import Image from "next/image";
import { BlockQuote } from "./ui/BlockQuote";
import { CodeBlock } from "./ui/CodeBlock";
type Props = {
  post: any;
};

const PostDetail = ({ post }: Props) => {
  // boolean state
  const [isExpanded, setIsExpanded] = React.useState(false);
  const getContentFragment = (index: any, text: any, obj?: any, type?: any) => {
    let modifiedText = text;
    console.log(modifiedText);

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.href) {
        modifiedText = (
          <a href={obj.href} key={index} className="underline text-zinc-400">
            {obj.children[0].text}
          </a>
        );
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      // haedings 2
      case "heading-two":
        return (
          <h2 key={index} className="py-2 pl-4 mb-10 text-3xl border-l-4 mt-14">
            {modifiedText}
          </h2>
        );

      // bulleted-listを扱えるようにしたい

      // list-itemを扱えるようにしたい

      // // list-item-child
      // case "list-item-child":

      // // numbered-list
      // case "numbered-list":

      // block-quote

      case "block-quote":
        return (
          <BlockQuote key={index}>
            {modifiedText.map((item: any, i: any) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </BlockQuote>
        );

      case "code-block":
        return (
          <CodeBlock modifiedText={modifiedText}>
            {modifiedText.map((item: any, i: any) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </CodeBlock>
        );
      // case "bulleted-list":
      //   return (
      //     <div
      //       key={index}
      //       className="py-2 pl-4 mb-10 text-2xl border-l-4 mt-14"
      //     >
      //       {modifiedText.map((item: any, i: any) => (
      //         <React.Fragment key={i}>{item}</React.Fragment>
      //       ))}
      //     </div>
      //   );

      case "heading-three":
        return (
          <h3
            key={index}
            className="py-2 pl-4 mb-10 text-2xl font-semibold border-l-4 mt-14"
          >
            {modifiedText.map((item: any, i: any) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p
            key={index}
            className={`my-4 leading-8 ${
              modifiedText == "" ? "my-10 leading-8" : ""
            }`}
          >
            {modifiedText.map((item: any, i: any) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="my-12 font-semibold">
            {modifiedText.map((item: any, i: any) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="w-auto mx-auto my-8 max-h-96"
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-md">
        <img
          src={post?.featuredImage?.url}
          alt={post?.title}
          className="object-center w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center w-full mb-8">
          <div className="flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto">
            <img
              alt={post?.author?.name}
              height="30px"
              width="30px"
              src={post?.author?.photo?.url}
              className="align-middle rounded-full"
            />
            <p className="inline ml-2 text-lg text-gray-700 align-middle">
              {post?.author?.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline w-6 h-6 mr-2 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post?.createdAt).format("MMM DD YYYY")}</span>
          </div>
        </div>
        <h1 className="pb-4 mt-10 mb-12 text-3xl font-semibold border-b-2">
          {post.title}
        </h1>
        <div className="whitespace-pre-wrap">
          {post?.content?.raw?.children?.map((typeObj: any, index: number) => {
            const children = typeObj?.children?.map(
              (item: any, itemindex: number) =>
                getContentFragment(itemindex, item.text, item)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
