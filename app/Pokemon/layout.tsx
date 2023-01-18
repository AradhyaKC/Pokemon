'use client';

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();


export default function Layout(props:any){
    return (<>
    <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
    </>)
} 