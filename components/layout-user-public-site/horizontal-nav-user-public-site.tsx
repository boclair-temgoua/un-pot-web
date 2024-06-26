import { UserModel } from '@/types/user.type';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CreateModalPublicDonation } from '../donation/create-modal-public-donation';
import { NavbarProps } from '../layout-dashboard/vertical-nav-dashboard';
import { useAuth } from '../util/context-user';

import { logoutUsersAPI } from '@/api-site/user';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { CreateOrUpdateFormFollow } from '../like-follow/create-or-update-form-follow';
import { ThemeToggle } from '../ui-setting';
import { HorizontalNavPublicUser } from '../user/horizontal-nav-public-user';

interface Props {
  user?: UserModel;
  showDrawer?: () => void;
}

const HorizontalNavUserPublicSite = ({ user, showDrawer }: Props) => {
  const t = useIntl();
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { userStorage: userVisiter } = useAuth() as any;
  const pathname = usePathname();
  const username = user?.username;
  const [navigation] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.HOME' })}`,
      status: true,
      count: 1,
      href: `/${username}`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.GALLERY' })}`,
      status: true,
      count: user?.gallery?.count,
      href: `/${username}/gallery`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.MEMBERSHIP' })}`,
      status: true,
      count: user?.membership?.count,
      href: `/${username}/memberships`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.POST' })}`,
      status: true,
      count: user?.post?.count,
      href: `/${username}/posts`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.SHOP' })}`,
      status: user?.profile?.enableShop,
      count: user?.product?.count,
      href: `/${username}/shop`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.COMMISSION' })}`,
      status: user?.profile?.enableCommission,
      count: user?.commission?.count,
      href: `/${username}/commissions`,
    },
  ]);

  const logoutUserItem = async () => {
    await logoutUsersAPI();
    push(`/login`);
    location.reload();
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-gray-300 bg-white dark:border-gray-800 dark:bg-[#1c1b22]">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            <div className="-m-3 flex items-center lg:hidden">
              <Button onClick={showDrawer} type="button" variant="ghost">
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="ml-2 flex xl:ml-0">
              <Link href="/">
                <div className="flex shrink-0 items-center">
                  <div className="block h-8 w-auto lg:hidden">
                    <div className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        <img
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                          alt={process.env.NEXT_PUBLIC_NAME_SITE}
                        />
                      </div>

                      <div className="ml-2 cursor-pointer">
                        <p className="text-lg font-bold">
                          {process.env.NEXT_PUBLIC_NAME_SITE}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden h-8 w-auto lg:block">
                    <div className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        <img
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                          alt={process.env.NEXT_PUBLIC_NAME_SITE}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <nav className="ml-4 hidden w-auto space-x-10 lg:block">
              {navigation
                .filter(
                  (item) => item?.status === true && Number(item?.count) >= 1,
                )
                .map((item: any, index: number) => {
                  //const isActive = pathname === item.href;
                  const isActive = pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={index}
                      href={`${item?.href}`}
                      title={item?.title}
                      className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `text-${user?.profile?.color}-600 border-${user?.profile?.color}-600`
                          : `border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-300`
                      } `}
                    >
                      {item?.icon}

                      {item?.title}
                    </Link>
                  );
                })}
            </nav>

            <div className="ml-auto flex items-center justify-end">
              {user?.id ? <HorizontalNavPublicUser user={user} /> : null}
              <div className="flex items-center">
                <ThemeToggle />
                {userVisiter?.id !== user?.id ? (
                  <CreateOrUpdateFormFollow item={user} />
                ) : null}
                {/* <ButtonInput
                  type="button"
                  className="w-full"
                  size="sm"
                  variant="info"
                  icon={<PlusIcon className="mr-2 size-4" />}
                >
                  Create
                </ButtonInput> */}
                {userVisiter?.id ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="link"
                          className="-m-3 bg-white text-gray-700 hover:text-gray-900 dark:bg-[#1c1b22] dark:hover:text-white"
                        >
                          <svg
                            className="size-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#1c1b22]">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/dashboard`)}>
                            <span className="cursor-pointer">
                              {t.formatMessage({ id: 'MENU.DASHBOARD' })}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => push(`/settings`)}>
                          <span className="cursor-pointer">
                            {t.formatMessage({ id: 'MENU.SETTING' })}
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logoutUserItem()}>
                          <span className="cursor-pointer">
                            {t.formatMessage({ id: 'MENU.LOGOUT' })}
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      {openModal ? (
        <CreateModalPublicDonation
          openModal={openModal}
          setOpenModal={setOpenModal}
          user={user}
        />
      ) : null}
    </>
  );
};

export { HorizontalNavUserPublicSite };
