import { component$ } from '@builder.io/qwik';
import {
  DocumentHead,
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { UiButton } from '~/components/ui/ui-button';
import { UiDivider } from '~/components/ui/ui-divider';
import { UiInput } from '~/components/ui/ui-input';
import { UiLoader } from '~/components/ui/ui-loader';
import { UiTextarea } from '~/components/ui/ui-textarea';
import { createSupabaseDB } from '~/libs/db.util';
import { cn } from '~/libs/style.util';

export const head: DocumentHead = ({ resolveValue, params }) => {
  const topic = resolveValue(useTopic);
  const topicName = topic.data ? topic.data[0].topic_name : '';
  return {
    title: `"${topicName}" | Tardisly-Amazing!!`,
    meta: [
      {
        name: 'description',
        content: `Tardisly-Amazing!! 익명게시판 주제 ${topicName}`,
      },
    ],
  };
};

export const useTopic = routeLoader$(async (requestEv) => {
  const { topicId } = requestEv.params;
  const topic = await createSupabaseDB(requestEv)
    .from('anonymous_post_topic')
    .select('topic_name')
    .eq('id', topicId);

  return topic;
});

export const usePosts = routeLoader$(async (requestEv) => {
  const { topicId } = requestEv.params;
  const posts = await createSupabaseDB(requestEv)
    .from('anonymous_post')
    .select()
    .order('created_at', { ascending: false })
    .eq('topic_id', topicId);

  return posts;
});

export const useCreatePostAction = routeAction$(
  async ({ writer_name, content }, requestEv) => {
    const topic_id = requestEv.params.topicId || '';

    const result = await createSupabaseDB(requestEv)
      .from('anonymous_post')
      .insert([{ writer_name, content, topic_id }]);

    return result;
  },
  zod$({
    writer_name: z.string().min(1),
    content: z.string().min(1),
  }),
);

export default component$(() => {
  const topic = useTopic();
  const posts = usePosts();
  const createPostAction = useCreatePostAction();

  return (
    <section>
      <h1 class={cn('mb-2 mt-6 text-lg font-bold')}>
        {topic.value.data && topic.value.data[0].topic_name}
      </h1>

      <p
        class={cn(
          'rounded-md bg-indigo-900/70 p-4 text-xs text-indigo-300 sm:text-sm md:text-base',
        )}
      >
        ** 주의사항 ** <br />
        한번 작성된 게시글은 수정, 삭제가 불가능합니다!! <br />
      </p>

      <UiDivider class={cn('my-6')} />

      <Form
        class={cn('flex flex-col gap-y-2')}
        action={createPostAction}
        spaReset
      >
        <section class={cn('flex flex-col gap-y-0.5')}>
          <UiInput
            type="text"
            name="writer_name"
            class={cn(
              'w-32 ',
              createPostAction.value?.fieldErrors?.writer_name
                ? 'border border-rose-700 '
                : '',
            )}
            placeholder="작성자"
            disabled={createPostAction.isRunning}
          />
          <section class={cn('ml-1')}>
            {createPostAction.value?.fieldErrors?.writer_name ? (
              <span class={cn('text-xs font-bold text-rose-500 sm:text-sm')}>
                작성자는 필수입력입니다.
              </span>
            ) : (
              <></>
            )}
          </section>
        </section>

        <section class={cn('flex flex-col gap-y-0.5')}>
          <UiTextarea
            class={cn(
              'resize-none',
              createPostAction.value?.fieldErrors?.content
                ? 'border border-rose-700 '
                : '',
            )}
            name="content"
            rows={5}
            placeholder="내용을 입력해주세요"
            disabled={createPostAction.isRunning}
          ></UiTextarea>
          <section class={cn('ml-1')}>
            {createPostAction.value?.fieldErrors?.content ? (
              <span class={cn('text-xs font-bold text-rose-500 sm:text-sm')}>
                내용은 필수입력입니다.
              </span>
            ) : (
              <></>
            )}
          </section>
        </section>

        <section>
          <UiButton
            type="submit"
            class={cn(
              createPostAction.isRunning
                ? 'pointer-events-none bg-opacity-50'
                : '',
            )}
          >
            {createPostAction.isRunning ? <UiLoader /> : <span>등록</span>}
          </UiButton>
        </section>
      </Form>

      <UiDivider class={cn('my-6')} />

      <section class={cn('relative mb-8 space-y-4')}>
        <div
          class={cn(
            'absolute bottom-0 left-4 top-0 -z-50 w-px bg-indigo-800/60',
          )}
        ></div>
        {posts.value.data?.map(({ id, content, created_at, writer_name }) => (
          <article
            key={id}
            class={cn('rounded border border-indigo-800/60 bg-indigo-950')}
          >
            <h3 class={cn('space-x-1 bg-indigo-900/60 px-2 py-2')}>
              <span class={cn('font-semibold')}>{writer_name}</span>{' '}
              <span class={cn('text-xs font-light opacity-50')}>
                {new Date(created_at).toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                })}
              </span>
            </h3>

            <UiDivider class={cn('my-0 h-px bg-indigo-800/60')} />

            <section class={cn('px-2 py-3')}>{content}</section>
          </article>
        ))}
      </section>
    </section>
  );
});
