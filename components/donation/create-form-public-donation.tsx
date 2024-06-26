import { UserModel } from '@/types/user.type';
import { Input } from 'antd';
import { CupSodaIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { CreatePaymentPayPal } from '../payment/create-payment-paypal';
import { CreateCardStripe } from '../payment/stripe/create-payment-stripe';
import { ButtonInput } from '../ui-setting/button-input';
import { useAuth } from '../util/context-user';
const { TextArea } = Input;

const CreateFormPublicDonation = ({ user }: { user: UserModel }) => {
  const { userStorage: userBayer } = useAuth() as any;
  const initialPrice = String(user?.donationUser?.price || 0);
  const initialCurrency = user?.profile?.currency?.code;
  const [increment, setIncrement] = useState(1);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState('');
  const [isCardPay, setIsCardPay] = useState<boolean>(false);

  const newValuePrice: number = Number(price) * increment;
  const newAmount = {
    potTotal: increment,
    value: newValuePrice,
    description: description,
    currency: initialCurrency,
  };
  return (
    <>
      <div className="flex-auto justify-center p-2">
        {/* <label className="text-base font-medium text-gray-900"> Buy un pot for {user?.profile?.firstName ?? ""} {user?.profile?.lastName ?? ""}</label> */}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            <CupSodaIcon
              className={`text-${user?.profile?.color}-500 size-14`}
            />
          </p>
          <div className="ml-auto flex items-center justify-end space-x-6 rounded-md border border-gray-100 dark:border-gray-600">
            <ButtonInput
              type="button"
              variant="info"
              size="sm"
              // color={`${user?.profile?.color}`}
              disabled={increment === 1 ? true : false}
              onClick={() => setIncrement((lk) => lk - 1)}
              icon={<PlusIcon className="mr-2 size-5" />}
            />

            <span className="text-base font-semibold text-black dark:text-white">
              {increment}
            </span>

            <ButtonInput
              type="button"
              variant="info"
              size="sm"
              // color={`${user?.profile?.color}`}
              loading={false}
              onClick={() => setIncrement((lk) => lk + 1)}
              icon={<PlusIcon className="mr-2 size-5" />}
            />
          </div>
        </div>

        <div className="mt-4">
          <Input
            size="large"
            id="price"
            required={true}
            style={{ width: '100%' }}
            type="number"
            name="price"
            placeholder={`${newValuePrice}`}
            prefix={<strong>{initialCurrency}</strong>}
            min={1}
            value={newValuePrice}
            onChange={(e) => setPrice(e?.target.value)}
            className={`dark:border-gray-800 dark:bg-[#121212] dark:text-white  dark:placeholder:text-gray-500`}
          />
        </div>

        <div className="mt-4">
          <TextArea
            rows={4}
            id="description"
            name="description"
            placeholder="Your message (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`dark:border-gray-800 dark:bg-[#121212] dark:text-white  dark:placeholder:text-gray-500`}
          />
        </div>

        {newValuePrice > 0 ? (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-2xl font-bold text-black dark:text-white">
              Tipo
            </p>
            {newAmount?.value ? (
              <>
                <p className="ml-auto text-xl font-bold text-black dark:text-white">
                  {newAmount?.value ?? ''}
                </p>
                <p className="ml-1 text-xl font-bold text-black dark:text-white">
                  {initialCurrency}
                </p>
              </>
            ) : null}
          </div>
        ) : null}

        {newValuePrice > 0 ? (
          <>
            {isCardPay ? (
              <>
                <CreateCardStripe
                  paymentModel="STRIPE-DONATION"
                  data={{
                    amount: newAmount,
                    userReceiveId: user?.id,
                    userBuyerId: userBayer?.id,
                    organizationSellerId: user?.organizationId,
                    organizationBuyerId: userBayer?.organizationId,
                  }}
                />
              </>
            ) : (
              <div className="mt-2">
                <ButtonInput
                  onClick={() => setIsCardPay(true)}
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="info"
                >
                  Card Pay
                </ButtonInput>
              </div>
            )}

            <CreatePaymentPayPal
              paymentModel="PAYPAL-DONATION"
              data={{
                amount: newAmount,
                userReceiveId: user?.id,
                userBuyerId: userBayer?.id,
                organizationSellerId: user?.organizationId,
                organizationBuyerId: userBayer?.organizationId,
              }}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export { CreateFormPublicDonation };
