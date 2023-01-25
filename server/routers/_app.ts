import { router } from '../trpc';
import { userCollectionRouter } from './user-collection';

export const appRouter = router({
  userCollection: userCollectionRouter
});

export type AppRouter = typeof appRouter;