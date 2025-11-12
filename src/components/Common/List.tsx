import { FC } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface ListProps {
  text: string;
}

const List: FC<ListProps> = ({ text }) => {
  return (
    <div className="mb-4 flex items-center">
      <CheckCircleIcon className="h-5 w-5 text-primary mr-2" />
      <span className="text-base font-medium text-body-color dark:text-gray-300">
        {text}
      </span>
    </div>
  );
};

export default List;
