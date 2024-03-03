import type { RequestEventAction } from '@builder.io/qwik-city';
import { createServerClient } from 'supabase-auth-helpers-qwik';
import type { Database } from '~/types/supabase';

export const createSupabaseDB = (
  requestEv: RequestEventAction<QwikCityPlatform>,
) => {
  return createServerClient<Database>(
    requestEv.env.get('SUPABASE_URL')!,
    requestEv.env.get('SUPABASE_KEY')!,
    requestEv,
  );
};
