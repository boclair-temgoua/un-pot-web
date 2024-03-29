/* eslint-disable jsx-a11y/anchor-is-valid */
import { UpdateEnableProfileAPI } from '@/api-site/user';
import { AlertDangerNotification } from '@/utils';
import React, { useState } from 'react';
import { ButtonInput } from '../ui-setting';

type Props = {
  profile?: any;
};

const EnableCommission: React.FC<Props> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(profile?.enableCommission);

  // Create or Update data
  const { mutateAsync: saveMutation } = UpdateEnableProfileAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const enableItem = async () => {
    try {
      await saveMutation({
        enableCommission: true,
        profileId: profile?.id,
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div
        className={`mt-8 rounded-lg border ${isOpen ? 'bg-indigo-50 dark:bg-indigo-100' : 'bg-red-100'} border-${isOpen ? 'indigo-300' : 'red-500'} `}
      >
        <div className="px-4 py-5 sm:p-3">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-xs flex-1 md:mt-0">
              <p className="text-base font-bold text-gray-600">
                Commissions {isOpen ? 'Open' : 'Close'}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {isOpen
                  ? 'Commissions are currently active. Your fans can request them from your page.'
                  : 'Your commissions are currently private and are not available for booking.'}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-start space-x-6 md:ml-auto md:mt-0 md:justify-end md:space-x-reverse">
              <ButtonInput
                onClick={() => {
                  enableItem();
                  setIsOpen((lk: boolean) => !lk);
                }}
                type="button"
                className="w-full"
                size="sm"
                variant={isOpen ? 'info' : 'danger'}
              >
                {isOpen ? 'Click to close' : 'Click to open'}
              </ButtonInput>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { EnableCommission };
