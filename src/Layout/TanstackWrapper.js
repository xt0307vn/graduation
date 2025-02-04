"use client";

import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query';
import { useState } from "react";

export default function TanstackWrapper({ children }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
                { children }
        </QueryClientProvider>
    )
}