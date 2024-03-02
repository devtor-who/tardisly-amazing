import { component$ } from '@builder.io/qwik';
import {
  routeLoader$,
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  Form,
} from '@builder.io/qwik-city';
import { WebThemeToggle } from '~/components/web-theme/web-theme-toggle';
import { db } from '~/libs/db.util';
import { cn } from '~/libs/style.util';

export const head: DocumentHead = {
  title: 'Tardisly-Amazing!!',
  meta: [
    {
      name: 'Tardisly-Amazing!!',
      content: 'Tardisly-Amazing!!',
    },
  ],
};

export const useGetUser = routeLoader$(async () => {
  const users = await db.user.findMany();
  return users;
});

export const useCreateUser = routeAction$(
  async (data) => {
    const user = await db.user.create({
      data,
    });
    return user;
  },
  zod$({
    name: z.string(),
    email: z.string().email(),
  }),
);

export default component$(() => {
  const users = useGetUser();
  const createUserAction = useCreateUser();

  return (
    <>
      <h1>안녕하세요~!! 👋</h1>
      <WebThemeToggle />
      <p>한글로 이것저것 써보기</p>
      <p class="font-madimi-one">
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>

      <div>
        <Form action={createUserAction}>
          <label>
            Name
            <input
              class={cn(
                'border-b bg-transparent',
                'border-b-neutral-950 dark:border-b-neutral-100',
              )}
              name="name"
              value={createUserAction.formData?.get('name')}
            />
          </label>
          <label>
            Email
            <input
              class={cn(
                'border-b bg-transparent',
                'border-b-neutral-950 dark:border-b-neutral-100',
              )}
              name="email"
              value={createUserAction.formData?.get('email')}
            />
          </label>
          <button type="submit">Create</button>
        </Form>
      </div>

      <div>
        DB 데이터 Fetch 테스트!!
        {users.value.map((user) => (
          <div key={user.id}>
            {user.id} / {user.email} / {user.name}
          </div>
        ))}
      </div>
    </>
  );
});
