import { z } from 'zod';
import discogsClient from '../../services/discogs';
import { GetFolderReleasesResponse, GetReleaseResponse } from '../../types/discogs';
import { buildUrl } from '../../utils';
import { procedure, router } from '../trpc';

const { DISCOGS_USERNAME } = process.env;

const releaseCurrencySchema = z.union([
  z.literal("USD"),
  z.literal("GBP"),
  z.literal("EUR"),
  z.literal("CAD"),
  z.literal("AUD"),
  z.literal("JPY"),
  z.literal("CHF"),
  z.literal("MXN"),
  z.literal("BRL"),
  z.literal("NZD"),
  z.literal("SEK"),
  z.literal("ZAR")
]);

export const releasesRouter = router({
  all: procedure
    .input(z.object({
      folder: z.optional(z.number()).default(0),
      page: z.optional(z.number().min(1)).default(1),
      perPage: z.optional(z.union([z.literal(16), z.literal(32)])).default(16)
    }))
    .query(async ({ input }) => {
      const url = buildUrl(
        `users/${DISCOGS_USERNAME}/collection/folders/${input.folder}/releases`,
        [{ key: 'page', value: input.page.toString() }, { key: 'per_page', value: input.perPage.toString() }]
      );
      const result: GetFolderReleasesResponse = await discogsClient(url);
      return result;
    }),
  byId: procedure
    .input(z.object({
      id: z.string().min(1),
      currency: releaseCurrencySchema.default('EUR')
    }))
    .query(async ({ input }) => {
      const url = buildUrl(
        `releases/${input.id}`,
        [{ key: 'currency', value: input.currency.toString() }]
      );
      const result: GetReleaseResponse = await discogsClient(url);
      return result;
    })
});