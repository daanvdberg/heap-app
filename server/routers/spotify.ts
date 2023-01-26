import { z } from 'zod';
import spotifyClient from '../../services/spotify';
import { SpotifySearchResponse } from '../../types/spotify';
import { buildUrl } from '../../utils';
import { procedure, router } from '../trpc';

const searchTypeSchema = z.union([
  z.literal('album'),
  z.literal('artist'),
  z.literal('playlist'),
  z.literal('track'),
  z.literal('show'),
  z.literal('episode'),
  z.literal('audiobook')
]);

export const SpotifyRouter = router({
  search: procedure
    .input(z.object({
      query: z.string(),
      type: searchTypeSchema.default('album'),
      limit: z.number().min(0).max(50).default(10)
    }))
    .query(async ({ input }) => {
      const url = buildUrl(`search`, { query: input.query, limit: input.limit, type: input.type });
      const result: SpotifySearchResponse = await spotifyClient(url);
      return result;
    })
});
