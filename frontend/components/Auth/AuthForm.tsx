import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import LoaderComponent from "../LoaderComponent";
import { AuthFormProps } from "@/types";

const AuthForm = ({
  onSubmit,
  title,
  children,
  error,
  loading,
  secondAction,
  action,
  footerText,
}: AuthFormProps) => {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-6 p-5 md:p-6")}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
      </div>
      <div className="grid gap-4">
        {children}
        {error && (
          <div className="text-xs md:text-sm text-center text-red-500">
            {error}
          </div>
        )}
        <Button
          type="submit"
          className="w-full cursor-pointer h-8 md:h-full"
          disabled={loading}
        >
          {loading ? <LoaderComponent title={secondAction} /> : action}
        </Button>
      </div>
      <div className="text-center text-xs md:text-sm">{footerText}</div>
    </form>
  );
};
export default AuthForm;
