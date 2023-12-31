import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/util/context-user";
import { SerialPrice } from "@/components/ui/serial-price";
import { GetStatisticsTransactionsAPI } from "@/api-site/transaction";
import { ButtonInput } from "@/components/ui";
import { TableTransactions } from "@/components/transaction/table-transactions";
import { useDebounce } from "@/utils";
import { GetStaticPropsContext } from "next";

const Donations = () => {
  const user = useAuth() as any;
  const [days, setDays] = useState(30);
  const [openDrop, setOpenDrop] = useState(false);


  const debouncedFilter = useDebounce(days, 100);
  const isEnabled = Boolean(debouncedFilter)
  const {
    data: transactions,
    isError,
    isPending,
    error,
  } = GetStatisticsTransactionsAPI({
    queryKey: ["statistics-transactions"],
    days: debouncedFilter,
    isEnabled: isEnabled,
  });


  const handleDaysChange = (newDays: number) => {
    setDays(newDays);
  };

  // useEffect(() => {
  //   handleDaysChange(days);
  // }, [days, debouncedFilter]);

  if (isPending) {
    return "";
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const transaction = transactions?.find((item) => item.model === "DONATION");

  return (
    <>
      <LayoutDashboard title={"Donations"}>

        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">

            <HorizontalNavDonation />

            <div className="flow-root">
              <div className="flex items-center mt-4">
                <div className="ml-auto">
                  <div className="flex items-center space-x-4">
                    <div className="max-w-xs mx-auto">
                      <ButtonInput
                        status="cancel"
                        type="button"
                        shape="default"
                        size="normal"
                        loading={false}
                        onClick={() => setOpenDrop(lk => !lk)}
                      >
                        Last {days} days
                      </ButtonInput>

                      {openDrop && (
                        <div className="relative mt-2 w-full z-10">
                          <div className="border-gray-300 dark:border-gray-800 bg-white dark:bg-[#121212] shadow border rounded-lg w-full block text-sm px-4 py-2 space-y-2">

                            <ul className="flex flex-col">
                              <li onClick={() => { handleDaysChange(2), setOpenDrop(false) }} className="w-full rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" >Last 2 days</li>
                              <li onClick={() => { handleDaysChange(120), setOpenDrop(false) }} className="w-full rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Last 120 days</li>
                              <li className="w-full rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">All time</li>
                            </ul>

                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-1 lg:grid-cols-3">
                <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Donator
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {transaction?.statistic?.count ?? 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Last {days} days
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        <SerialPrice
                          className="text-xl font-bold text-gray-900 dark:text-white"
                          value={Number(transaction?.statistic?.amount)}
                          currency={{
                            code: user?.profile?.currency?.code,
                            amount: String(user?.profile?.currency?.amount),
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </div>

                {user?.organizationId ? (
                  <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
                    <div className="px-5 py-4">
                      <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                        All-time
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          <SerialPrice
                            className="text-xl font-bold text-gray-900 dark:text-white"
                            value={Number(user?.donation?.amount)}
                            currency={{
                              code: user?.profile?.currency?.code,
                              amount: String(
                                user?.profile?.currency?.amount
                              ),
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {user?.organizationId ? (
                <TableTransactions
                  model="DONATION"
                  organizationId={user?.organizationId}
                />
              ) : null}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Donations);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../lang/${locale}/index.json`)).default,
    },
  };
}