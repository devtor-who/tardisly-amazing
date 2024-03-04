import type { ButtonHTMLAttributes } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';
import { cn } from '~/libs/style.util';

export type UiButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export const UiButton = component$<UiButtonProps>((props) => {
  const { class: classList, ...rest } = props;
  return (
    <button
      class={cn(
        'bg-indigo-200 font-semibold text-indigo-950',
        'transition-colors duration-300 hover:bg-indigo-200/80',
        'w-full rounded-md p-2',
        classList,
      )}
      {...rest}
    >
      <Slot />
    </button>
  );
});
