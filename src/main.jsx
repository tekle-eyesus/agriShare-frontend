import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalErrorPage from "./pages/global/GlobalError";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: true,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      useErrorBoundary: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary
            onReset={() => window.location.reload()}
            FallbackComponent={GlobalErrorPage}
          >
            <App />
          </ErrorBoundary>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  </React.StrictMode>,
);
