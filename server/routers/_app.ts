import { router } from '../trpc';
import { userCollectionRouter } from './user-collection';
import { SpotifyRouter } from './spotify';

export const appRouter = router({
  userCollection: userCollectionRouter,
  spotify: SpotifyRouter
});

export type AppRouter = typeof appRouter;