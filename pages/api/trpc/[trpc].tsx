import { initTRPC } from '@trpc/server';
import {z} from 'zod';
import * as trpcNext from '@trpc/server/adapters/next';    
 
const t = initTRPC.create();
 
const router = t.router;
 
export const appRouter = router({
    greeting:t.procedure
    .input(z.object({
        name:z.string()
    }))
    .query((req)=>{
        var input = req.input;
        console.log(req);
        return {
            msg:'Hello from ' +input.name,
        }
    })
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
    router:appRouter,
    createContext:()=>({}),
});