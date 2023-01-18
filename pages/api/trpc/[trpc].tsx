import { initTRPC } from '@trpc/server';
import {z} from 'zod';
import * as trpcNext from '@trpc/server/adapters/next';    
 
const t = initTRPC.create();
 
const router = t.router;
 
export const appRouter = router({
    greeting:t.procedure
    .query((req)=>{
        var input = req.input;
        console.log(req);
        return {
            msg:'Hello ! maybe this get req will work',
        }
    })
    // .input(z.object({name:z.string()})),

});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
    router:appRouter,
    createContext:()=>({}),
});