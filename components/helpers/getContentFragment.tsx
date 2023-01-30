import React from "react";
import { BlockQuote } from "../ui/BlockQuote";
import { CodeBlock } from "../ui/CodeBlock";

export const getContentFragment = (
  index: number,
  text: any,
  obj?: any,
  type?: any
) => {
  let modifiedText = text;

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
    // headings 2
    case "heading-two":
      return (
        <h2
          key={index}
          className="py-2 pl-4 mb-10 text-3xl font-bold border-l-4 mt-14"
        >
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
          {modifiedText.map((item: string, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </BlockQuote>
      );

    case "code-block":
      return (
        <CodeBlock modifiedText={modifiedText}>
          {modifiedText.map((item: string, i: number) => (
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
    //       {modifiedText.map((item: string, i: number) => (
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
          {modifiedText.map((item: string, i: number) => (
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
          {modifiedText.map((item: string, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </p>
      );
    case "heading-four":
      return (
        <h4 key={index} className="my-12 font-semibold">
          {modifiedText.map((item: string, i: number) => (
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
    case "video":
      return (
        <video key={index} controls className="w-auto mx-auto my-8">
          <source
            key={index}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="w-auto mx-auto my-8 max-h-96"
          />
        </video>
      );
    default:
      return modifiedText;
  }
};
