import { z } from 'zod';
import discogsClient from '../../../services/discogs';
import {
  GetFolderReleasesResponse,
  GetFolderResponse,
} from '../../../types/discogs';
import { buildUrl } from '../../../utils';
import { procedure, router } from '../../trpc';

const { DISCOGS_USERNAME } = process.env;

export const userCollectionRouter = router({
  folders: procedure.query(async () => {
    const url = buildUrl(`users/${DISCOGS_USERNAME}/collection/folders`);
    const result: GetFolderResponse = await discogsClient(url);
    return result;
  }),
  releases: procedure
    .input(
      z.object({
        folder: z.optional(
          z.object({
            count: z.number(),
            id: z.number(),
            name: z.string(),
            resource_url: z.string(),
          })
        ),
        page: z.optional(z.number().min(1)).default(1),
        perPage: z.union([z.literal(16), z.literal(32)]).default(16),
      })
    )
    .query(async ({ input }) => {
      const url = buildUrl(
        `users/${DISCOGS_USERNAME}/collection/folders/${
          input.folder ? input.folder.id : 0
        }/releases`,
        { page: input.page.toString(), per_page: input.perPage.toString() }
      );
      const result: GetFolderReleasesResponse = await discogsClient(url);
      return result;
    }),
});
