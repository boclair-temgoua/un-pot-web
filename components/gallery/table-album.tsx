/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { UserVisitorModel } from '@/types/user.type';
import { ErrorFile } from '../ui/error-file';
import Link from 'next/link';
import { GetInfiniteAlbumsAPI } from '@/api-site/album';
import { AlbumModel } from '@/types/album';
import ContentLoader from 'react-content-loader';
import { Avatar } from 'antd';
import { capitalizeOneFirstLetter } from '@/utils/utils';

type Props = {
  userVisitor: UserVisitorModel;
};

const TableAlbum: React.FC<Props> = ({ userVisitor }) => {
  const { push, back } = useRouter();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingAlbum,
    isError: isErrorAlbum,
    data: dataAlbum,
    isFetchingNextPage,
    hasNextPage,
  } = GetInfiniteAlbumsAPI({
    organizationId: userVisitor?.organizationId,
    take: 10,
    sort: 'DESC',
    isPaginate: 'true',
  });

  const dataTableAlbum = isLoadingAlbum ? (
    <ContentLoader width={600} height={65} className="items-center">
      <rect x="10" y="10" rx="0" ry="0" width="600" height="60" />
    </ContentLoader>
  ) : isErrorAlbum ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataAlbum?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataAlbum?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item: AlbumModel, index: number) => (
        <Fragment key={index}>
          <div className="overflow-hidden bg-white dark:bg-black  border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="p-4">
              <div className="flex items-center">
                <Avatar
                  shape="square"
                  className={`bg-gray-500`}
                  size="large"
                  alt={`${item?.name ?? ''}`}
                >
                  {capitalizeOneFirstLetter(String(item?.name))}
                </Avatar>
                <div className="flex-1 ml-4">
                  <Link href={`/gallery/album/${item?.id}`}>
                    <p className="text-base font-bold">{item?.name}</p>
                  </Link>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    {item?.totalPost ? `${item?.totalPost} Images` : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ))
  );
  return (
    <>
      {dataTableAlbum}

      {/* {hasNextPage && (
        <div className="mt-4 text-center justify-center mx-auto">
          <div className="mt-4 sm:mt-0">
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
        </div>
      )} */}
    </>
  );
};

export { TableAlbum };
