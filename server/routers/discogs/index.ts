import { router } from '../../trpc';
import { resourcesRouter } from './resources';
import { userCollectionRouter } from './user-collection';

export const discogsRouter = router({
  resources: resourcesRouter,
  userCollection: userCollectionRouter,
});

export type DiscogsRouter = typeof discogsRouter;
