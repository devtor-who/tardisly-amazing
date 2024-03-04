import { TextareaHTMLAttributes, component$ } from '@builder.io/qwik';
import { cn } from '~/libs/style.util';

export type UiTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {};

export const UiTextarea = component$<UiTextareaProps>((props) => {
  const { class: className, ...rest } = props;
  return (
    <textarea
      class={cn(
        'rounded-md bg-indigo-700/50 px-3 py-2 outline-none', //
        'placeholder:text-indigo-400 disabled:opacity-40',
        className,
      )}
      {...rest}
    ></textarea>
  );
});
