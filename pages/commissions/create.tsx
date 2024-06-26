import { CreateOrUpdateFormCommission } from '@/components/commission/create-or-update-form-commission';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { PrivateComponent } from '@/components/util/private-component';

const CommissionsCreate = () => {
  return (
    <>
      <LayoutDashboard title={'Commissions create'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <CreateOrUpdateFormCommission />
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(CommissionsCreate);
