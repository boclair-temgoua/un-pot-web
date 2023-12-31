'use client';
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useRef, useState } from 'react';
import { Carousel, Image } from 'antd';
import { UploadFolderType, UploadModel } from '@/types/upload';
import { viewOneFileUploadAPI } from '@/api-site/upload';
import ContentLoader from 'react-content-loader';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Zoom, Pagination } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import { ButtonInput, WhoCanSeeItem } from '../ui';
import { PiLockKey } from 'react-icons/pi';
import { PostModel } from '@/types/post';

type Props = {
  uploads: UploadModel[];
  folder: UploadFolderType;
  preview: boolean;
  className?: string;
  alt?: string;
  post?: PostModel;
  height?: string | number;
  width?: string | number;
  autoplay?: boolean;
};

const contentStyle: React.CSSProperties = {
  lineHeight: '50px',
  textAlign: 'center',
  // background: "#364d79",
};

const ListCarouselUpload: React.FC<Props> = ({
  uploads,
  folder,
  preview,
  alt,
  post,
  className = '',
  height = '100%',
  width = '100%',
  autoplay = false,
}) => {
  const ref = useRef();

  return (
    <>
      <Swiper
        zoom={true}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        history={{
          key: 'slide',
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Zoom]}
        style={contentStyle}
        breakpoints={{
          320: {
            slidesPerView: 'auto',
            spaceBetween: 8,
          },
          // 640: {
          //   slidesPerView: 1,
          //   spaceBetween: 16,
          // }
        }}
      >
        {uploads &&
          uploads?.length > 0 &&
          uploads?.map((item: any, index: number) => (
            <>
              <SwiperSlide key={index}>
                <Image
                  width={width}
                  height={height}
                  className={className}
                  preview={preview}
                  style={contentStyle}
                  src={`${viewOneFileUploadAPI({
                    folder: folder,
                    fileName: item?.path,
                  })}`}
                  alt={alt}
                  loading="lazy"
                />

                {['MEMBERSHIP'].includes(String(post?.whoCanSee)) &&
                post?.isValidSubscribe !== 1 ? (
                  <WhoCanSeeItem profile={post?.profile as any} />
                ) : null}
              </SwiperSlide>
            </>
          ))}
      </Swiper>
      {/* <Carousel
        autoplay={autoplay}
        dots={true}
        effect={"fade"}
        dotPosition={"bottom"}
        pauseOnDotsHover={true}
        pauseOnHover={true}
        style={contentStyle}
        responsive={[{ breakpoint: 1050, settings: "unslick" }]}
      >
        {uploads &&
          uploads?.length > 0 &&
          uploads?.map((item: any, index: number) => (
            <Fragment key={index}>
              <Image
                width={width}
                height={height}
                className={className}
                preview={preview}
                style={contentStyle}
                src={`${viewOneFileUploadAPI({
                  folder: folder,
                  fileName: item?.path,
                })}`}
                alt={alt}
              />
            </Fragment>
          ))}
      </Carousel> */}
    </>
  );
};

export { ListCarouselUpload };
