import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../util/context-user";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";

const HorizontalNavSetting: React.FC = () => {
  const { profile } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Profile",
      href: "/settings",
    },
    {
      title: "Payout",
      href: "/settings/payout",
    },
    {
      title: "Configurations",
      href: "/settings/config",
    },
    {
      title: "Billing",
      href: "/settings/billing",
    },
    {
      title: "Payout",
      href: "/payout-settings",
    },
    {
      title: "Notifications",
      href: "/settings/notifications",
    },
    {
      title: "Subscribers",
      href: "/settings/subscribers",
    },
    {
      title: "Followings",
      href: "/settings/followings",
    },
    {
      title: "Followers",
      href: "/settings/followers",
    },
  ]);

  return (
    <>
      <div className="px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
        <nav className="flex flex-wrap gap-4">
          {navigation.map((item: any, index: number) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={`${item.href}`}
                title={item.title}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg group whitespace-nowrap ${
                  isActive
                  ? `text-white bg-${profile?.color}-600`
                  : `hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white`
                } `}
              >
                {item?.icon}

                {item?.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* <div className="px-3 py-2 border-gray-200 border-b">
                <nav className="flex flex-wrap gap-4">

                    {navigation.map((item: any, index: number) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={`${item.href}`}
                                title=""
                                className={`py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${isActive
                                    ? "text-indigo-600 border-indigo-600"
                                    : "border-transparent hover:border-gray-300"
                                    } `}
                            >
                                {item?.icon}

                                {item?.title}
                            </Link>
                        );
                    })}

                </nav>
            </div> */}
    </>
  );
};

export { HorizontalNavSetting };
