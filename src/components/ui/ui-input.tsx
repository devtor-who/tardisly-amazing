import {
  component$,
  FunctionComponent,
  InputHTMLAttributes,
  useId,
} from '@builder.io/qwik';
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
          'rounded-md bg-neutral-700/50 px-3 py-2 outline-none', //
          'placeholder:text-neutral-500',
          classList,
        )}
        {...rest}
        id={id}
      />
    </label>
  );
});
