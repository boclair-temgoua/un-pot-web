import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { useState } from "react";
import { useAuth } from "@/components/util/context-user";
import { SerialPrice } from "@/components/ui/serial-price";
import { GetStatisticsTransactionsAPI } from "@/api-site/transaction";
import { ButtonInput } from "@/components/ui";
import { TableTransactions } from "@/components/transaction/table-transactions";

const Donations = () => {
  const user = useAuth() as any;
  const [dayCount, setDayCount] = useState(30);
  const {
    data: transactions,
    isError,
    isPending,
    error,
  } = GetStatisticsTransactionsAPI({
    queryKey: ["statistics-transactions"],
    days: dayCount,
  });

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
                    <ButtonInput
                      status="cancel"
                      type="button"
                      shape="default"
                      size="normal"
                      loading={false}
                    >
                      Last {dayCount} days
                    </ButtonInput>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-1 lg:grid-cols-3">
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
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

                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Last {dayCount} days
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
                   <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
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
