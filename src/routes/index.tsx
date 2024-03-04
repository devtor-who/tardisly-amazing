import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { concat, concatMap, delay, from, interval, map, of, take } from 'rxjs';
import { cn } from '~/libs/style.util';
import styles from './style.module.css';
import { UiButton } from '~/components/ui/ui-button';

export const head: DocumentHead = {
  title: 'Tardisly-Amazing!!',
  meta: [
    {
      name: 'Tardisly-Amazing!!',
      content: 'Tardisly-Amazing!!',
    },
  ],
};

export default component$(() => {
  const nav = useNavigate();
  const typeWriteDoneSig = useSignal(false);
  const lines = [
    'Never Cruel,',
    'Never Cowardly.',
    'Never Give up,',
    'Never Give in.',
  ];

  const linesStore = useStore<string[]>(lines.map(() => ''));

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    from(lines)
      .pipe(
        concatMap((word, i) =>
          concat(
            interval(50).pipe(
              map((x) => (linesStore[i] = word.substring(0, x + 1))),
              take(word.length),
            ),
            of('').pipe(delay(i < lines.length - 1 ? 250 : 100)),
          ),
        ),
      )
      .subscribe({
        complete() {
          typeWriteDoneSig.value = true;
        },
      });
  });

  return (
    <section class={[cn('h-screen px-4'), styles.background]}>
      <section
        class={[
          cn(
            'container mx-auto h-full',
            'grid grid-rows-2 items-center lg:grid-cols-2 lg:grid-rows-1',
          ),
        ]}
      >
        <article class={cn('space-y-8 lg:space-y-12')}>
          <h1
            class={cn(
              'text-3xl sm:text-5xl md:text-6xl xl:text-7xl',
              'font-semibold italic font-playfair',
              'leading-tight tracking-wider',
            )}
          >
            {linesStore.map((text, i) => (
              <p key={i}>
                <span class="inline-block w-0 opacity-0">{i}</span> {text}
              </p>
            ))}
          </h1>
          <h3
            class={cn(
              'text-sm text-indigo-400 opacity-0 sm:text-base',
              typeWriteDoneSig.value && 'animate-fade-up',
            )}
          >
            원하는 메뉴를 선택해보세요
          </h3>
        </article>
        <article
          class={cn(
            'flex flex-col justify-center gap-y-2 sm:gap-y-4',
            'mx-auto w-full lg:max-w-md',
          )}
        >
          <UiButton
            class={cn(
              'text-sm opacity-0 sm:text-base',
              typeWriteDoneSig.value
                ? 'animate-fade-up animate-delay-700'
                : 'pointer-events-none',
            )}
            onClick$={() => nav('/anon-posts')}
          >
            익명게시판
          </UiButton>

          {/* <UiButton
            class={cn(
              'text-sm opacity-0 font-poppins sm:text-base',
              typeWriteDoneSig.value
                ? 'animate-fade-up animate-delay-1000'
                : 'pointer-events-none',
            )}
            onClick$={() => nav('/games')}
          >
            Games
          </UiButton> */}
        </article>
      </section>
    </section>
  );
});
