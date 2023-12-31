/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { HtmlParser } from "@/utils/html-parser";
import { ButtonInput } from "../ui/button-input";
import { ListCarouselUpload } from "../shop/list-carousel-upload";
import { MembershipModel } from "@/types/membership";
import { useRouter } from "next/router";
import { convertToPluralMonth } from "@/utils/utils";
import { useAuth } from "../util/context-user";
import { LoginModal } from "../auth-modal/login-modal";

type Props = {
  item?: MembershipModel;
};

const ListPublicMemberships: React.FC<Props> = ({ item }) => {
  const { userStorage } = useAuth() as any;
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white dark:bg-[#121212] shadow-xl shadow-gray-600/15"
      >
        <div className="p-8 sm:py-7 sm:px-8">
          <div className="flex items-center">
            {item?.id ? (
              <p className="text-lg font-bold text-gray-900 dark:text-white cursor-pointer">
                {item?.title ?? ""}
              </p>
            ) : null}
          </div>

          {item?.uploadsImage?.length > 0 ? (
            <div className="mt-4 text-center justify-center mx-auto">
              <ListCarouselUpload
                uploads={item?.uploadsImage}
                folder="memberships"
                preview={false}
                height={200}
              />
            </div>
          ) : null}

          <div className="flex mt-2 items-end justify-center space-x-1">
            <div className="flex items-start">
              <p className="text-5xl font-medium tracking-tight">
                {item?.price}
              </p>
              <span className="text-xl font-medium text-black dark:text-white">
                {item?.currency?.symbol}
              </span>
            </div>
            <span className="ml-0.5 text-lg text-black dark:text-white">
              {" "}
              per {convertToPluralMonth(Number(item?.month))}{" "}
            </span>
          </div>

          <div className="mt-4 text-center justify-center mx-auto">
            <div className="sm:mt-0">
              {userStorage?.id ? (
                <ButtonInput
                  onClick={() => {
                    router.push(`/memberships/${item?.id}/checkout`);
                  }}
                  shape="default"
                  type="button"
                  size="large"
                  loading={false}
                  color={"indigo"}
                  minW="fit"
                >
                  Join
                </ButtonInput>
              ) : (
                <ButtonInput
                  onClick={() => {
                    setShowModal(true);
                  }}
                  shape="default"
                  type="button"
                  size="large"
                  loading={false}
                  color={"indigo"}
                  minW="fit"
                >
                  Join
                </ButtonInput>
              )}
            </div>
          </div>

          <div className="mt-4 text-sm font-normal text-gray-600 dark:text-gray-300">
            <HtmlParser html={String(item?.description)} />
          </div>
        </div>
      </div>

      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};
export { ListPublicMemberships };
