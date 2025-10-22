"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/query-client";

interface ReactQueryProviderProps {
  children: ReactNode;
}

function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;