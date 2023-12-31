import { ColorType } from "@/types/profile.type";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface SizeInterface {
  [key: string]: string;
}

const sizeType: SizeInterface = {
  huge: "5",
  large: "4",
  normal: "3.5",
  medium: "2.5",
  small: "0.2",
};

const shapeType: SizeInterface = {
  round: "full",
  default: "md",
};

interface Props {
  ref?: (node?: Element | null) => void;
  className?: string;
  disabled?: boolean;
  status?: "default" | "cancel";
  size?: "large" | "medium" | "normal" | "small" | "huge";
  loading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  type: "button" | "submit";
  color?: ColorType;
  shape?: "round" | "default";
  minW?: "fit" | "full";
  onClick?: () => void;
}

const ButtonInput: React.FC<Props> = ({
  ref,
  type,
  size,
  shape,
  color = "indigo",
  icon,
  loading,
  children,
  className,
  onClick,
  minW,
  disabled,
  status = "default",
}) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 18, color: "#ffff" }} spin />
  );

  return (
    <>
      {status === "default" ? (
        <button
          ref={ref}
          type={loading ? "button" : type}
          onClick={onClick}
          disabled={loading || disabled ? true : false}
          className={
            className +
            `
       rounded-${shapeType[String(shape ?? "default")]}
       inline-flex 
       items-center 
       justify-center 
       min-w-${minW ?? "fit"}
       w-full
       px-4 
       py-${sizeType[String(size ?? "normal")]} 
       text-sm 
       font-semibold 
       leading-3
       text-center  
       text-white 
       transition-all 
       duration-200 
       bg-${loading || disabled ? color : color}-600
       border-1
       border-transparent
       focus:outline-none 
       focus:ring-2 
       focus:ring-offset-2 
       focus:ring-${color}-500
       hover:bg-${color}-${loading || disabled ? "200" : "700"}
    `
          }
        >
          {loading ? (
            <Spin indicator={antIcon} className="mr-2 h-3 w-3" />
          ) : (
            <>
              {icon ? <span className="mr-1">{icon}</span> : null}
              {children}
            </>
          )}
        </button>
      ) : (
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          disabled={loading || disabled ? true : false}
          className={`
        inline-flex
        items-center
        justify-center
        min-w-${minW ?? "fit"}
        w-full
        px-4
        py-${sizeType[String(size ?? "normal")]} 
        text-sm 
        font-semibold 
        leading-3 
        text-gray-600 
        dark:text-white
        transition-all 
        duration-200 
        bg-white 
        dark:bg-[#121212]
        border 
        border-gray-200
        dark:border-gray-800
        rounded-md 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-gray-200 
        hover:bg-gray-200
        `}
        >
          {icon ? <span className="mr-1">{icon}</span> : null}
          {children}
        </button>
      )}
    </>
  );
};

export { ButtonInput };
