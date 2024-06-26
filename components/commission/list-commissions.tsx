/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneProductAPI } from '@/api-site/product';
import { GetUploadsAPI, viewOneFileUploadAPI } from '@/api-site/upload';
import { ProductModel } from '@/types/product';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatePrice,
} from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Avatar } from 'antd';
import { CalendarIcon, PencilIcon, TrashIcon, WalletIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { formateDate } from '../../utils/formate-date';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: ProductModel;
  index: number;
};

const ListCommissions = ({ item, index }: Props) => {
  const router = useRouter();
  const { isOpen, setIsOpen, loading, setLoading, locale } = useInputState();

  const { mutateAsync: saveMutation } = DeleteOneProductAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ productId: item?.id });
      AlertSuccessNotification({
        text: 'Commission deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { status, data: dataImages } = GetUploadsAPI({
    organizationId: item?.organizationId,
    model: 'COMMISSION',
    uploadableId: `${item?.id}`,
    uploadType: 'image',
  });

  if (status === 'pending') {
    <p>loading...</p>;
  }

  return (
    <>
      <div key={index} className="divide-gray-200 py-5">
        <div className="flex items-center">
          <div className="relative shrink-0 cursor-pointer">
            <Avatar
              size={100}
              shape="square"
              src={viewOneFileUploadAPI({
                folder: 'products',
                fileName: String(dataImages?.[0]?.path),
              })}
              alt={item?.title}
            />
          </div>

          <div className="ml-3 min-w-0 flex-1 cursor-pointer">
            <div className="flex items-center text-gray-600">
              <button className="font-normal">
                <CalendarIcon className="size-4" />
              </button>
              <span className="ml-1.5 text-sm font-normal">
                {formateDate(item?.createdAt as Date, locale)}
              </span>
            </div>

            <div className="mt-2 flex items-center">
              {item?.title ? (
                <p className="text-lg font-bold">
                  <ReadMore html={String(item?.title ?? '')} value={50} />
                </p>
              ) : null}
            </div>

            <div className="mt-4 flex items-center font-medium text-gray-600">
              <button className="font-normal">
                <WalletIcon className="size-4" />
              </button>
              <span className="ml-1.5 text-sm">
                {formatePrice({
                  value: Number(item?.priceDiscount ?? 0),
                  isDivide: false,
                })}{' '}
                {item?.currency?.symbol}
              </span>

              {item?.enableDiscount ? (
                <span className="ml-1.5 text-sm text-red-600">
                  <del>
                    {formatePrice({
                      value: Number(item?.price ?? 0),
                      isDivide: false,
                    })}{' '}
                    {item?.currency?.symbol}
                  </del>
                </span>
              ) : null}
            </div>
            {/* <div className="mt-4 flex items-center text-gray-600">
              {item?.price ? (
                <>
                  <span className="font-normal">
                    <WalletIcon className="size-4" />
                  </span>
                  <span className="ml-2 text-sm font-bold">
                    {formatePrice({
                      value: Number(item?.price),
                      isDivide: false,
                    })}{' '}
                    {item?.currency?.symbol}
                  </span>
                </>
              ) : null}
            </div> */}
          </div>

          <div className="py-4 text-right text-sm font-medium text-gray-900">
            {/* <Tooltip placement="bottomRight" title={'Messages'}>
              <button
                onClick={() => router.push(`/commissions/${item?.id}/message`)}
                className="text-lg text-gray-600 hover:text-green-400"
              >
                <MdOutlineMarkEmailRead />
              </button>
            </Tooltip> */}
            <ButtonInput
              variant="ghost"
              type="button"
              size="icon"
              icon={
                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
              }
              onClick={() => router.push(`/commissions/${item?.id}/edit`)}
            />

            <ActionModalDialog
              title="Delete?"
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
              description="Are you sure you want to delete this?"
              buttonDialog={
                <ButtonInput
                  variant="ghost"
                  type="button"
                  size="icon"
                  icon={
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                  }
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
export { ListCommissions };
