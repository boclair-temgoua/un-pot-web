import { LayoutDashboard } from '@/components/layout-dashboard';
import { CreateOrUpdateFormShop } from '@/components/shop/create-or-update-form-shop';
import { PrivateComponent } from '@/components/util/private-component';

const ShopCreate = () => {
  return (
    <>
      <LayoutDashboard title={'New product'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <CreateOrUpdateFormShop />
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopCreate);
