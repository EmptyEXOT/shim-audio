import { Input } from '@/shared/component/input/ui/Input';
import clsx from 'clsx';
import {
  FieldValues,
  Path,
  useController,
  UseControllerProps,
  UseFormRegister,
} from 'react-hook-form';

interface IFormValues {
  FirstName: string;
  Age: number;
}

interface FormInputProps<FormValues extends FieldValues> {
  label: Path<FormValues>;
  className?: string;
  type?: string;
}

// Компонент FormInput
export const FormInput = function <FormValues extends FieldValues>(
  props: UseControllerProps<FormValues> & FormInputProps<FormValues>
) {
  const { field, fieldState } = useController(props);
  return (
    <div>
      <Input
        label={props.label}
        {...field}
        type={props.type || 'text'}
        className={clsx(
          props.className,
          'outline-neutral-500 dark:focus:outline-white focus:outline-black text-black dark:text-white'
        )}
      />
      {!field.value && props.rules?.required && (
        <p className='text-xs text-red-600 dark:text-red-500'>*required</p>
      )}
      <p>{fieldState.isTouched && 'Touched'}</p>
    </div>
  );
};
