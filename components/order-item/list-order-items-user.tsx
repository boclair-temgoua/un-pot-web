/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { foldersType, formateDate, formatePrice } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Avatar } from 'antd';
import { AtomIcon, CalendarIcon, ViewIcon, WalletIcon } from 'lucide-react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { OrderItemUserModal } from './order-item-user-modal';

type Props = {
  item: OrderItemModel;
  index: number;
};

const ListOrderItemsUser = (props: Props) => {
  const { item, index } = props;
  const { isOpen, setIsOpen, locale } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };
  return (
    <>
      <div key={index} className="py-5">
        <div className="flex items-center">
          {item?.uploadsImages?.length > 0 ? (
            <div className="relative shrink-0 cursor-pointer">
              <Avatar
                size={80}
                shape="square"
                src={viewOneFileUploadAPI({
                  folder: foldersType[item?.model] as any,
                  fileName: item?.uploadsImages[0]?.path,
                })}
                alt={item?.product?.title}
              />
            </div>
          ) : null}

          <div className="ml-3 min-w-0 flex-1 cursor-pointer">
            <div className="flex items-center text-gray-600">
              <button className="tex-sm">
                <CalendarIcon className="size-4" />
              </button>
              <span className="ml-1.5 text-sm font-normal">
                {formateDate(item?.createdAt as Date, locale)}
              </span>
            </div>

            {item?.product?.title ? (
              <div className="mt-2 flex items-center">
                <p className="text-lg font-bold text-gray-600 dark:text-white">
                  <ReadMore
                    html={String(item?.product?.title ?? '')}
                    value={100}
                  />
                </p>
              </div>
            ) : null}

            <div className="mt-2 flex items-center font-medium text-gray-600">
              <span className="font-normal">
                <WalletIcon className="size-4" />
              </span>

              {item?.percentDiscount ? (
                <>
                  <span className="ml-1.5 text-sm">
                    {formatePrice({
                      value: Number(item?.priceDiscount ?? 0),
                      isDivide: true,
                    })}{' '}
                    {item?.currency}
                  </span>

                  <span className="ml-1.5 text-sm text-red-600">
                    <del>
                      {formatePrice({
                        value: Number(item?.price ?? 0),
                        isDivide: true,
                      })}{' '}
                      {item?.currency}
                    </del>
                  </span>
                </>
              ) : (
                <span className="ml-1.5 text-sm">
                  {formatePrice({
                    value: Number(item?.price ?? 0),
                    isDivide: true,
                  })}{' '}
                  {item?.currency}
                </span>
              )}
              <span className="ml-1.5 text-sm">
                <AtomIcon className="size-4" />
              </span>
              <span className="ml-1.5 text-sm font-bold text-gray-600">
                {item?.model}
              </span>
            </div>
          </div>

          {item?.productId && (
            <div className="py-4 text-right text-sm font-medium text-gray-600">
              <ButtonInput
                type="button"
                size="sm"
                variant="ghost"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => setIsOpen((lk: boolean) => !lk)}
                title={'View Content'}
                icon={<ViewIcon className="size-5 text-gray-400" />}
              />
            </div>
          )}
        </div>

        <OrderItemUserModal item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export { ListOrderItemsUser };
