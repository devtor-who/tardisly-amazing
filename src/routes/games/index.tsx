import { component$, useComputed$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { UiButton } from '~/components/ui/ui-button';
import { UiInput } from '~/components/ui/ui-input';
import { UiLoader } from '~/components/ui/ui-loader';
import { cn } from '~/libs/style.util';

const validCodes = ['test'];

export const useVisitorCodeAction = routeAction$(
  async (data, requestEv) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('');
      }, 2000);
    });

    if (!validCodes.some((text) => text === data['visitor-code'])) {
      return requestEv.fail(422, { message: 'No Visitor' });
    }

    requestEv.cookie.set('visitor', 'test');
    requestEv.redirect(302, '/games/station');
  },
  zod$({
    'visitor-code': z.string(),
  }),
);

export default component$(() => {
  const visitorCodeAction = useVisitorCodeAction();
  const visitorCodeFailedMessage = useComputed$(
    () =>
      !visitorCodeAction.isRunning &&
      (visitorCodeAction.value?.fieldErrors?.['visitor-code'] ||
        visitorCodeAction.value?.message),
  );

  return (
    <main class={cn('mx-auto min-h-dvh max-w-xl px-3 py-4')}>
      <h1 class={cn('w-full text-center text-base font-normal')}>방문자확인</h1>

      <div class={cn('my-4 h-0.5 w-full rounded bg-neutral-700/80')}></div>

      <section class={cn('space-y-4 pt-2')}>
        <h3 class={cn('text-xl font-medium font-ibm-plex-sans-kr')}>
          방문자코드를 입력해주세요.
        </h3>

        <Form
          class={cn('space-y-8')}
          action={visitorCodeAction}
        >
          <fieldset disabled={visitorCodeAction.isRunning}>
            <UiInput
              type="text"
              name="visitor-code"
              class={cn(
                'w-full text-sm disabled:opacity-40',
                visitorCodeFailedMessage.value && 'border border-rose-700 ',
              )}
              placeholder="전달받은 방문자코드를 입력해주세요"
            />
            {visitorCodeFailedMessage.value ? (
              <span class={cn('text-sm font-bold text-rose-500')}>
                유효하지않은 코드입니다.
              </span>
            ) : (
              <></>
            )}
          </fieldset>

          <UiButton
            type="submit"
            class={cn(
              'text-center',
              visitorCodeAction.isRunning
                ? 'pointer-events-none bg-opacity-50 dark:bg-opacity-50'
                : '',
            )}
          >
            {visitorCodeAction.isRunning ? (
              <UiLoader />
            ) : (
              <span>코드 확인</span>
            )}
          </UiButton>
        </Form>
      </section>
    </main>
  );
});
