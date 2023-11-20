import 'server-only';

import env from '@/env.mjs';
import { type DB } from '@/types/db-types';
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

export const queryBuilder = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: env.DATABASE_URL,
  }),
});
