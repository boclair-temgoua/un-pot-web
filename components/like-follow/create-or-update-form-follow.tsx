import React, { useState } from "react";
import { AlertDangerNotification } from "@/utils";
import { ButtonInput } from "../ui/button-input";
import { CreateOrDeleteOneFollowerAPI } from "@/api-site/follow";
import Swal from "sweetalert2";
import { LoginModal } from "../auth-modal/login-modal";
import { useAuth } from "../util/context-user";

const CreateOrUpdateFormFollow: React.FC<{
  item?: any;
}> = ({ item }) => {
  const { userStorage } = useAuth() as any;
  const [showModal, setShowModal] = useState(false);
  const [follow, setFollow] = useState(false);
  const [isFollow, setIsFollow] = useState(item?.isFollow);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrDeleteOneFollowerAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const followItem = async (item: any) => {
    try {
      {
        isFollow
          ? Swal.fire({
              title: "Unfollowing?",
              text: `Are you sure you want to unfollow ${
                item?.profile?.firstName ?? ""
              } ${item?.profile?.lastName ?? ""}`,
              confirmButtonText: "Yes, Unfollow",
              cancelButtonText: "No, Cancel",
              confirmButtonColor: "#dc3545",
              cancelButtonColor: "#6f42c1",
              showCancelButton: true,
              reverseButtons: true,
            }).then(async (result) => {
              if (result.value) {
                //Envoyer la requet au serve
                setLoading(true);
                setHasErrors(undefined);
                try {
                  await saveMutation({
                    followerId: item?.profile?.userId,
                    action: "DELETE",
                  });
                  setHasErrors(false);
                  setLoading(false);
                  setIsFollow((lk: boolean) => !lk);
                } catch (error: any) {
                  setHasErrors(true);
                  setLoading(false);
                  setHasErrors(error.response.data.message);
                }
              }
            })
          : await saveMutation({
              followerId: item?.id,
              action: "CREATE",
            });
      }
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
          {(item?.isFollow && isFollow) || follow ? (
            <ButtonInput
              status="cancel"
              type="button"
              shape="default"
              size="normal"
              loading={false}
              onClick={() => {
                followItem(item);
              }}
            >
              UnFollow
            </ButtonInput>
          ) : (
            <ButtonInput
              shape="default"
              size="normal"
              type="button"
              color="red"
              loading={false}
              onClick={() => {
                followItem(item), setFollow(true);
              }}
            >
              Follow
            </ButtonInput>
          )}
        </>
      ) : (
        <ButtonInput
          shape="default"
          size="normal"
          type="button"
          color="red"
          loading={false}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Follow
        </ButtonInput>
      )}

      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export { CreateOrUpdateFormFollow };
