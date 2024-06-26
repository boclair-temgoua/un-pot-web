import { GetInfinitePaymentsAPI } from '@/api-site/payment';
import { PaymentItemModel } from '@/types/payment';
import { Elements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ListPayments } from '../payment/list-payments';
import { stripeKeyPromise } from '../payment/stripe/create-payment-stripe';
import { ButtonInput } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { CreatePaymentFormCardUser } from './create-payment-form-card-user';
import { CreatePaymentIbanFormUser } from './create-payment-iban-form-user';
import { CreatePaymentPhoneFormCardUser } from './create-payment-phone-form-card-user';
import { CreatePaymentStripeFormCardUser } from './create-payment-stripe-form-card-user';

const PayoutFormUser = () => {
  const { ipLocation } = useInputState();
  const [showPayPalFormModal, setShowPayPalFormModal] = useState(false);
  const [showStripeFormModal, setShowStripeFormModal] = useState(false);
  const [showIbanModal, setShowIbanModal] = useState(false);
  const [showPhoneFormModal, setShowPhoneFormModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  const {
    isLoading: isLoadingPayments,
    isError: isErrorPayments,
    data: dataPayments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePaymentsAPI({
    take: 10,
    sort: 'DESC',
  });

  const dataTablePayments = isLoadingPayments ? (
    <LoadingFile />
  ) : isErrorPayments ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataPayments?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    dataPayments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item: PaymentItemModel, index: number) => (
        <ListPayments item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
        <div className="px-4 py-5">
          <div className="mb-4 flex items-center space-x-2">
            {['EU', 'AF'].includes(ipLocation?.continentCode) && (
              <ButtonInput
                type="button"
                variant="info"
                loading={false}
                size="sm"
                onClick={() => setShowPhoneFormModal(true)}
              >
                Phone
              </ButtonInput>
            )}

            <ButtonInput
              type="button"
              variant="info"
              loading={false}
              size="sm"
              onClick={() => setShowCardModal(true)}
            >
              Card
            </ButtonInput>
            <ButtonInput
              type="button"
              variant="info"
              loading={false}
              size="sm"
              onClick={() => setShowIbanModal(true)}
            >
              IBAN
            </ButtonInput>
            {/* {['EU'].includes(ipLocation?.continentCode) && (
              <ButtonInput
                type="button"
                variant="info"
                onClick={() => setShowPayPalFormModal(true)}
              >
                Add PayPal
              </ButtonInput>
            )} */}
            {/* <ButtonInput
              type="button"
              variant="info"
              onClick={() => setShowStripeFormModal(true)}
            >
              Add Stipe
            </ButtonInput> */}
          </div>

          <div className="mt-8 flow-root">
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {dataTablePayments}

              {hasNextPage ? (
                <>
                  <div className="mb-3 flex flex-col items-center justify-between">
                    {isFetchingNextPage ? null : (
                      <button
                        disabled={isFetchingNextPage ? true : false}
                        onClick={() => fetchNextPage()}
                        className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                      >
                        View more
                      </button>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Elements stripe={stripeKeyPromise}>
        {showCardModal ? (
          <CreatePaymentFormCardUser
            showModal={showCardModal}
            setShowModal={setShowCardModal}
          />
        ) : null}
      </Elements>

      {showIbanModal ? (
        <CreatePaymentIbanFormUser
          showModal={showIbanModal}
          setShowModal={setShowIbanModal}
        />
      ) : null}

      {/* {['EU', 'AF'].includes(ipLocation?.countryCode) && showPhoneFormModal ? (
        <CreatePaymentPhoneFormCardUser
          showModal={showPhoneFormModal}
          setShowModal={setShowPhoneFormModal}
        />
      ) : null} */}

      <CreatePaymentPhoneFormCardUser
        showModal={showPhoneFormModal}
        setShowModal={setShowPhoneFormModal}
      />

      <Elements stripe={stripeKeyPromise}>
        {showStripeFormModal ? (
          <CreatePaymentStripeFormCardUser
            showModal={showStripeFormModal}
            setShowModal={setShowStripeFormModal}
          />
        ) : null}
      </Elements>

      {/* <Elements stripe={stripeKeyPromise}>
        {showPayPalFormModal ? (
          <CreatePaymentPayPalFormCardUser
            showModal={showPayPalFormModal}
            setShowModal={setShowPayPalFormModal}
          />
        ) : null}
      </Elements> */}
    </>
  );
};

export { PayoutFormUser };
