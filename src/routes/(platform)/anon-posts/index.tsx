import { $, component$ } from '@builder.io/qwik';
import type { DocumentHead} from '@builder.io/qwik-city';
import { routeLoader$, useNavigate } from '@builder.io/qwik-city';
import { createSupabaseDB } from '~/libs/db.util';
import { cn } from '~/libs/style.util';

export const head: DocumentHead = {
  title: '익명게시판 | Tardisly-Amazing!!',
  meta: [
    {
      name: 'Tardisly-Amazing!! 익명게시판',
      content: 'Tardisly-Amazing!! 익명게시판',
    },
  ],
};

export const usePostTopics = routeLoader$(async (requestEv) => {
  const topics = await createSupabaseDB(requestEv)
    .from('anonymous_post_topic')
    .select()
    .or(`closed_at.is.null,closed_at.gt.${new Date().toISOString()}`);
  return topics;
});

export default component$(() => {
  const postTopics = usePostTopics();

  const nav = useNavigate();

  const changeTopic = $((topicId: string) => {
    nav(`/anon-posts/${topicId}`);
  });

  return (
    <section>
      <p
        class={cn(
          'rounded-md bg-indigo-900/70 p-4 text-xs text-indigo-300 sm:text-sm md:text-base',
        )}
      >
        아래에서 원하는 게시판 주제를 선택해주세요
      </p>

      <section class={cn('mt-8')}>
        <h3 class={cn('text-base font-medium sm:text-lg md:text-xl')}>
          주제 선택
        </h3>

        <ul class={cn('mt-2 space-y-1.5 text-sm sm:text-base')}>
          {postTopics.value.data?.map(({ topic_name, id }) => (
            <li
              key={id}
              class={cn(
                'rounded bg-indigo-800/70 px-2 py-1.5 md:px-3 md:py-2',
                'cursor-pointer transition-colors duration-200 hover:bg-indigo-800/40',
              )}
              onClick$={() => changeTopic(id)}
            >
              {topic_name}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
});
