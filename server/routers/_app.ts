import { router } from '../trpc';
import { releasesRouter } from './releases';

export const appRouter = router({
  releases: releasesRouter
});

export type AppRouter = typeof appRouter;