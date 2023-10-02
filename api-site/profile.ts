import {
  CurrencyModel,
  NextStepProfileFormModel,
  ProfileFormModel,
  ProfileModel,
} from "@/types/profile.type";
import { makeApiCall } from "@/utils/get-url-end-point";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UpdateOneProfileNextStepAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: NextStepProfileFormModel): Promise<any> => {
      return await makeApiCall({
        action: "updateOneProfileNextStep",
        body: payload,
        urlParams: { userId: payload?.userId },
      });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries();
        if (onError) {
          onError(error);
        }
      },
    }
  );

  return result;
};

export const UpdateOneProfileAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: ProfileFormModel & { profileId: string }): Promise<any> => {
      return await makeApiCall({
        action: "updateOneProfile",
        body: payload,
        urlParams: { profileId: payload?.profileId },
      });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries();
        if (onError) {
          onError(error);
        }
      },
    }
  );

  return result;
};

export const getOneProfileAPI = async (payload: {
  profileId: string;
}): Promise<{ data: ProfileModel }> => {
  const { profileId } = payload;
  return await makeApiCall({
    action: "getOneProfile",
    urlParams: { profileId },
  });
};


export const GetAllCurrenciesAPI = (search?: string) => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: async () =>
      await makeApiCall({
        action: "getAllCurrencies",
        queryParams: search,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};

export const GetAllCountiesAPI = (search?: string) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["countries"],
    queryFn: async () =>
      await makeApiCall({
        action: "getAllCounties",
        queryParams: search,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return { data: data?.data as any, isError, isLoading, status };
};

export const getOneFileProfileAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/users/file/${fileName}`
    : null;