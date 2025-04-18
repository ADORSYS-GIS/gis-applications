import { useField } from 'formik';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export function ToggleInputComponent({
  label,
  ...props
}: Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'defaultChecked' | 'defaultValue'
> & {
  label: string;
  name: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ onChange: ignored, ...field }, { touched, error }, { setValue }] =
    useField(props);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setValue(e.target.checked);
  };

  return (
    <div className='form-control w-full'>
      <label className='label w-full cursor-pointer'>
        <span className='label-text opacity-60 tracking-tight text-base-content mr-auto text-wrap'>
          {label ?? field.name}
        </span>
        <input
          defaultChecked={field.value}
          type='checkbox'
          {...field}
          {...props}
          onChange={onChange}
          className={twMerge('toggle toggle-primary', props.className)}
        />
      </label>

      {touched && error && (
        <div className='label'>
          <span className='label-text-alt text-error'>{error}</span>
        </div>
      )}
    </div>
  );
}
