import { z } from 'zod';
import discogsClient from '../../../services/discogs';
import { GetReleaseResponse, Pagination, SearchRelease, SearchResponse, SearchResult } from '../../../types/discogs';
import { buildUrl } from '../../../utils';
import { procedure, router } from '../../trpc';

const typeSchema = z.union([z.literal('release'), z.literal('master'), z.literal('artist'), z.literal('label')]);

const releaseCurrencySchema = z.union([
  z.literal('USD'),
  z.literal('GBP'),
  z.literal('EUR'),
  z.literal('CAD'),
  z.literal('AUD'),
  z.literal('JPY'),
  z.literal('CHF'),
  z.literal('MXN'),
  z.literal('BRL'),
  z.literal('NZD'),
  z.literal('SEK'),
  z.literal('ZAR'),
]);

export const resourcesRouter = router({
  searchBarcode: procedure.input(z.object({ barcode: z.string().nullish() })).query(async ({ input }) => {
    if (!input.barcode) return;

    const url = buildUrl(`database/search`, {
      type: 'release',
      barcode: input.barcode,
    });

    interface ReleaseSearchResponse {
      pagination: Pagination;
      results: SearchRelease[];
    }

    const result: ReleaseSearchResponse = await discogsClient(url);
    return result;
  }),
  release: procedure
    .input(
      z.object({
        id: z.string().min(1),
        currency: releaseCurrencySchema.default('EUR'),
      })
    )
    .query(async ({ input }) => {
      const url = buildUrl(`releases/${input.id}`, {
        currency: input.currency.toString(),
      });
      const result: GetReleaseResponse = await discogsClient(url);
      return result;
    }),
});
