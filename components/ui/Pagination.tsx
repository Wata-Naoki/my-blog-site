import clsx from "clsx";
import React from "react";
import { Button } from "./Button";
// import { Button } from "../button/Button";

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onPageClick: (page: number) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
  showNext: boolean;
  showPrev: boolean;
};

const range = 1;

const Dots = () => <div className="flex items-center">...</div>;

export const Pagination: React.FC<PaginationProps> = (props) => {
  const start = props.currentPage - range === 0 ? 2 : props.currentPage;
  const showingNumbers = [start - range, start, start + range].filter(
    (n) => n > 1 && n < props.totalPage
  );
  const showFirstDots = showingNumbers[0] > range + 1;
  const showLastDots =
    props.totalPage - range > showingNumbers[showingNumbers.length - 1];

  const NumberButton = ({
    page,
    onClick,
  }: {
    page: number;
    onClick: () => void;
  }) => {
    return (
      <Button
        onClick={onClick}
        variant={page === props.currentPage ? "primary" : "sub"}
      >
        {page}
      </Button>
    );
  };

  if (props.totalPage === 0) {
    return null;
  }

  return (
    <nav className="flex gap-2 mx-auto overflow-hidden rounded max-w-max">
      {props.showPrev && (
        <Button variant="sub" onClick={props.onPrevClick}>
          前へ
        </Button>
      )}

      {
        <NumberButton
          onClick={() => props.onPageClick(1)}
          page={1}
        ></NumberButton>
      }

      {showFirstDots && <Dots />}

      {showingNumbers.map((num) => (
        <NumberButton
          onClick={() => props.onPageClick(num)}
          page={num}
          key={num}
        />
      ))}

      {showLastDots && <Dots />}

      {props.totalPage !== 1 && (
        <NumberButton
          onClick={() => props.onPageClick(props.totalPage)}
          page={props.totalPage}
        ></NumberButton>
      )}

      {props.showNext && (
        <Button variant="sub" onClick={props.onNextClick}>
          次へ
        </Button>
      )}
    </nav>
  );
};
