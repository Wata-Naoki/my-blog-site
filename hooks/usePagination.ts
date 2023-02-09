import { useRouter } from "next/router";
import React, { useEffect } from "react";

const DEFAULT_TAKE = 4;
const QUERY_PARAM_NAME = "_p";

type Props = {
  totalCount: number;
  //   keyword: string;
  take?: number;
};

/**
 * 注意: currentPageは1から始まる
 * @param param0
 * @returns
 */
export const usePagination = ({
  totalCount,
  //   keyword,
  take = DEFAULT_TAKE,
}: Props) => {
  // router
  const router = useRouter();
  // urlを取得
  const search = router.asPath.split("?")[1];

  //   const router.push = useNavigate();
  const urlPageNumber = new URLSearchParams(search).get(QUERY_PARAM_NAME);
  const [currentPage, setCurrentPage] = React.useState(
    Number(urlPageNumber) || 1
  );

  const totalPage = totalCount === 0 ? 0 : Math.ceil(totalCount / take);
  const hasNextPage = currentPage < totalPage;
  const hasPrevPage = currentPage > 1;
  const skip = (currentPage - 1) * take;

  useEffect(() => {
    setCurrentPage(Number(urlPageNumber) || 1);
  }, [urlPageNumber]);

  const goNext = () => {
    if (currentPage + 1 > totalPage) {
      return;
    }
    router.push(`?${QUERY_PARAM_NAME}=${currentPage + 1}`);
    setCurrentPage((prev) => prev + 1);
  };

  const goPrev = () => {
    if (currentPage - 1 < 1) {
      return;
    }
    router.push(`?${QUERY_PARAM_NAME}=${currentPage - 1}`);
    setCurrentPage((prev) => prev - 1);
  };

  const goPage = (page: number) => {
    if (page < 1 || page > totalPage) {
      return;
    }
    router.push(`?${QUERY_PARAM_NAME}=${page}`);
    setCurrentPage(page);
  };

  return {
    take,
    skip,
    totalCount,
    currentPage,
    totalPage,
    goNext,
    goPrev,
    goPage,
    hasNextPage,
    hasPrevPage,
  };
};
