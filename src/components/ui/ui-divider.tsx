import type { HTMLAttributes} from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { cn } from '~/libs/style.util';

export type UiDividerProps = HTMLAttributes<HTMLDivElement> & {};

export const UiDivider = component$<UiDividerProps>((props) => {
  const { class: className } = props;
  return (
    <div
      class={cn(
        'my-3 h-0.5 w-full rounded bg-indigo-800/80 sm:my-8',
        className,
      )}
    ></div>
  );
});
