import React, { useState } from "react";
import * as yup from "yup";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { CreateOrUpdateOneLikeAPI } from "@/api-site/like";
import { AlertDangerNotification } from "@/utils";
import { useAuth } from "../util/context-user";
import { LoginModal } from "../auth-modal/login-modal";

const CreateOrUpdateFormLike: React.FC<{
  item?: any;
  typeLike: "POST" | "COMMENT";
}> = ({ item, typeLike }) => {
  const { userStorage } = useAuth() as any;
  const [showModal, setShowModal] = useState(false);
  const [like, setLike] = useState(false);
  const [isLike, setIsLike] = useState(item?.isLike);
  const [totalLike, setTotalLike] = useState(item?.totalLike ?? 0);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneLikeAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const likeItem = async (item: any) => {
    setIsLike((lk: boolean) => !lk);
    isLike
      ? setTotalLike((lk: number) => --lk)
      : setTotalLike((lk: number) => ++lk);
    try {
      await saveMutation({
        likeableId: item?.id,
        type: typeLike,
        isLike,
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <>
      {userStorage?.id ? (
        <>
          {(item?.isLike && isLike) || like ? (
            <button
              onClick={() => {
                likeItem(item), setLike(false);
              }}
              className="text-2xl text-indigo-600"
            >
              <MdOutlineFavorite />
            </button>
          ) : (
            <button
              onClick={() => {
                likeItem(item), setLike(true);
              }}
              className="text-2xl hover:text-indigo-600 focus:ring-indigo-600"
            >
              <MdFavoriteBorder />
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="text-2xl hover:text-indigo-600 focus:ring-indigo-600"
        >
          <MdFavoriteBorder />
        </button>
      )}

      <span className="ml-1.5 text-sm">{totalLike}</span>
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export { CreateOrUpdateFormLike };
