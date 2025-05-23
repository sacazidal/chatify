import { EyeClosedIcon, EyeIcon } from "lucide-react";

const BtnShowPassword = ({
  onClick,
  show,
}: {
  onClick: () => void;
  show: boolean;
}) => {
  return (
    <button
      type="button"
      className="absolute right-3 top-[34px]"
      onClick={onClick}
      aria-label={show ? "Скрыть пароль" : "Показать пароль"}
    >
      {show ? <EyeIcon size={18} /> : <EyeClosedIcon size={18} />}
    </button>
  );
};
export default BtnShowPassword;
