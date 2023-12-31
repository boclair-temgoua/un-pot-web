import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CreateOnPaymentPI } from "@/api-site/payment";
import { ButtonInput } from "@/components/ui/button-input";
import { StripeProps } from "./create-payment-stripe";
import { AlertDangerNotification } from "@/utils";
import { useRouter } from "next/router";
import { TextInput } from "@/components/ui";
import * as yup from "yup";
import { generateLongUUID } from "@/utils/generate-random";
import { useReactHookForm } from "@/components/hooks/use-react-hook-form";

const schema = yup.object({
  fullName: yup
    .string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
});

const containerStyles = {
  border: "1px solid #d3d3d3",
  padding: "12px 17px 12px 17px",
  borderRadius: "10px",
  width: "100%",
};

const CARD_OPTIONS: any = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#424770",
      // lineHeight: '24px',
      fontWeight: 600,
      fontFamily:
        "Roboto, Source Code Pro, monospace, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};


const StripeCheckoutForm: React.FC<StripeProps> = ({ data, paymentModel }) => {
  const { push } = useRouter();
  const [checkoutError, setCheckoutError] = useState();
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const { mutateAsync } = CreateOnPaymentPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const stripe = useStripe();
  const elements: any = useElements();
  if (!stripe || !elements) {
    return;
  }

  const onSubmit = async (payload: any) => {
    const { email, fullName } = payload;
    setLoading(true);
    setHasErrors(false);

    try {
      const newReference = generateLongUUID(30);
      const paymentMethodReq: any = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card"),
        billing_details: {
          email: email,
          name: fullName,
        },
      });
      const { paymentMethod } = paymentMethodReq;

      if (paymentMethodReq?.error) {
        setCheckoutError(paymentMethodReq?.error.message);
        setLoading(false);
        return;
      }

      await mutateAsync({
        data: { ...data, reference: newReference, paymentMethod },
        paymentModel,
      });

      setHasErrors(false);
      setLoading(false);

      push(`/transactions/success?token=${newReference}`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {hasErrors ? (
        <div className="rounded-lg bg-red-600">
          <div className="p-3">
            <div className="flex items-start justify-between md:items-center">
              <div className="flex-1 md:flex md:items-center md:justify-between">
                <p className="text-sm font-medium text-white">{hasErrors}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-4">
        <TextInput
          control={control}
          type="text"
          name="fullName"
          placeholder="Full name or nickname"
          errors={errors}
        />
      </div>
      <div className="mt-4">
        <TextInput
          control={control}
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          errors={errors}
        />
      </div>
      <div className="mt-5">
        <div style={containerStyles}>
          <CardElement options={CARD_OPTIONS} />
        </div>
        {checkoutError ? (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {checkoutError}
          </span>
        ) : null}
      </div>
      <div className="mt-4">
        <ButtonInput
          shape="default"
          type="submit"
          size="large"
          loading={loading || !stripe || !elements}
          color={"indigo"}
        >
          Continue
        </ButtonInput>
      </div>
    </form>
  );
};

export { StripeCheckoutForm };
