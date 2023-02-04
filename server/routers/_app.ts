import { router } from '../trpc';
import { discogsRouter } from './discogs';
import { spotifyRouter } from './spotify';

export const appRouter = router({
  discogs: discogsRouter,
  spotify: spotifyRouter,
});

export type AppRouter = typeof appRouter;
