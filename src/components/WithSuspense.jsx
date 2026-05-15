import { Suspense } from "react";
import Loader from "./ui/Loader";

export const withSuspense = (Component, isFullPage = false) => {
  return function SuspendedComponent(props) {
    return (
      <Suspense fallback={<Loader isGlobal={isFullPage} />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
