import { HTMLAttributes } from "react";

export const Divider = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLHRElement>) => (
  <hr
    className={`my-6 w-full border-gray-200 dark:border-gray-500 sm:mx-auto lg:my-8 ${className}`}
    {...props}
  />
);
