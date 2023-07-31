import { SmileOutlined } from "@ant-design/icons";
import { Select, Space } from "antd";
import { Control, Controller } from "react-hook-form";
const { Option } = Select;

interface Props {
  control: Control<any>;
  dataItem: any;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  firstOptionName: string;
  optionType: "currency" | "other";
}

const SelectSearchInput: React.FC<Props> = ({
  control,
  dataItem,
  label = "",
  name,
  errors,
  placeholder = "",
  optionType,
  firstOptionName = "",
}) => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            showSearch
            size="large"
            style={{ width: "100%" }}
            id={name}
            placeholder={placeholder}
            status={errors?.[name]?.message ? "error" : ""}
            filterOption={(input, option) =>
              (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
            }
            {...field}
          >
            <>
              {dataItem?.length > 0
                ? dataItem?.map((item: any, index: number) => (
                    <Option key={index} value={item?.id} name={item?.name}>
                      <Space>
                        {item?.name}
                      </Space>
                    </Option>
                  ))
                : null}
            </>
          </Select>
        )}
      />
      {errors?.[name] && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { SelectSearchInput };
