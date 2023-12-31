/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { ButtonInput } from "../ui/button-input";
import { useInView } from "react-intersection-observer";
import { GetInfiniteCommissionsAPI } from "@/api-site/commission";
import ListPublicCommissions from "./list-public-commissions";
import { LoadingFile } from "../ui/loading-file";


type Props = {
  organizationId: string;
};

const PublicCommissions: React.FC<Props> = ({ organizationId }) => {
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommissionsAPI({
    take: 10,
    sort: "DESC",
    organizationId,
    status: 'ACTIVE',
    queryKey: ['commissions', "infinite"]
  });

  useEffect(() => {
    let fetching = false;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTableCommissions = isLoadingPosts ? (
    <LoadingFile />
  ) : isErrorPosts ? (
    <strong>Error find data please try again...</strong>
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataPosts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListPublicCommissions item={item} key={index} />
      ))
  );

  return (
    <>
      {dataTableCommissions}

      <div className="mt-6 text-center justify-center mx-auto">
        {hasNextPage && (
          <div className="sm:mt-0">
            <ButtonInput
              ref={ref}
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

export { PublicCommissions };
