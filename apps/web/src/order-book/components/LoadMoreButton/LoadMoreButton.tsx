import type { VFC } from "react";
import cc from "classcat";
import shallow from "zustand/shallow";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useOrderBookStore } from "../../state/order-book.store";

export const LoadMoreButton: VFC = () => {
  const [fetchStatus, fetchNextPage] = useOrderBookStore(
    (state) => [state.fetchStatus, state.fetchNextPage],
    shallow
  );

  return (
    <button
      className={cc([
        "min-w-[33%] rounded-full h-14 flex items-center justify-center",
        "bg-gray-900 border-2 border-gray-900 font-medium text-white",
        "active:scale-95 transition",
        "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black"
      ])}
      onClick={fetchNextPage}
      disabled={fetchStatus === "loading"}
    >
      {fetchStatus === "idle" && "Load more"}

      {fetchStatus === "loading" && (
        <span className="flex items-center gap-x-2">
          Loading
          <AiOutlineLoading3Quarters className="text-xl animate-spin" />
        </span>
      )}
    </button>
  );
};
