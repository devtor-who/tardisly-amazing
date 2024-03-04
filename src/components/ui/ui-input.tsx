import type { InputHTMLAttributes } from '@builder.io/qwik';
import { component$, useId } from '@builder.io/qwik';
import { cn } from '~/libs/style.util';

export type UiInputProps = InputHTMLAttributes<HTMLInputElement> & {
  type: 'text';
};

export const UiInput = component$<UiInputProps>((props) => {
  const id = useId();
  const { class: classList, type, ...rest } = props;

  return (
    <label for={id}>
      <input
        type={type}
        class={cn(
          'rounded-md bg-indigo-700/50 px-3 py-2 outline-none', //
          'placeholder:text-indigo-400 disabled:opacity-40',
          classList,
        )}
        {...rest}
        id={id}
      />
    </label>
  );
});
