import { InfoIcon } from "lucide-react";

interface ErrorMessageCompProps {
  errorMessage: FormData | string;
}

const ErrorMessageComp = ({ errorMessage }: ErrorMessageCompProps) => {
  return (
    <>
      {errorMessage && (
        <>
          <InfoIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage as string}</p>
        </>
      )}
    </>
  );
};

export default ErrorMessageComp;
