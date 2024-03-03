import { HTMLAttributes, component$ } from '@builder.io/qwik';
import { cn } from '~/libs/style.util';

export type UiButtonProps = HTMLAttributes<HTMLButtonElement> & {};

export const UiButton = component$<UiButtonProps>((props) => {
  const { class: classList, ...rest } = props;
  return (
    <button
      class={cn(
        'opacity-0',
        'text-sm font-semibold font-poppins dark:bg-neutral-300 dark:text-neutral-900 md:text-base',
        'transition-colors duration-300 dark:hover:bg-neutral-300/80',
        'w-full rounded-md p-2',
        classList,
      )}
      {...rest}
    >
      Games
    </button>
  );
});
