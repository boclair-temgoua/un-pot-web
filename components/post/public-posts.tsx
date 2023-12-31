/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { GetInfinitePostsAPI } from "@/api-site/post";
import { ButtonInput } from "../ui/button-input";
import { useInView } from "react-intersection-observer";
import { LoadingFile } from "../ui/loading-file";
import { ListFollowPosts } from "./list-follow-posts";
import { UserVisitorModel } from "@/types/user.type";
import { ErrorFile } from "../ui/error-file";

type Props = {
  userVisitor: UserVisitorModel;
};

const PublicPosts: React.FC<Props> = ({ userVisitor }) => {
  // const { ref, inView } = useInView();

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: 20,
    sort: "DESC",
    userVisitor,
    status: 'ACTIVE',
    typeIds: ['ARTICLE', 'AUDIO', 'VIDEO'],
    queryKey: ['posts', "infinite"]
  });

  // useEffect(() => {
  //   let fetching = false;
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  //   const onScroll = async (event: any) => {
  //     const { scrollHeight, scrollTop, clientHeight } =
  //       event.target.scrollingElement;

  //     if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
  //       fetching = true;
  //       if (hasNextPage) await fetchNextPage();
  //       fetching = false;
  //     }
  //   };

  //   document.addEventListener("scroll", onScroll);
  //   return () => {
  //     document.removeEventListener("scroll", onScroll);
  //   };
  // }, [fetchNextPage, hasNextPage, inView]);

  const dataTablePosts = isLoadingPosts ? (
    <LoadingFile />
  ) : isErrorPosts ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataPosts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowPosts item={item} key={index} commentTake={2} userVisitor={userVisitor} />
      ))
  );

  return (
    <>
      {dataTablePosts}

      <div className="mt-6 text-center justify-center mx-auto">
        {hasNextPage && (
          <div className="sm:mt-0">
            <ButtonInput
              // ref={ref}
              onClick={() => fetchNextPage()}
              shape="default"
              type="button"
              size="large"
              loading={isFetchingNextPage ? true : false}
              color={"indigo"}
              minW="fit"
            >
              Load More
            </ButtonInput>
          </div>
        )}
      </div>
    </>
  );
};

export { PublicPosts };
