import { forwardRef, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SpinnerGap, Eye, EyeSlash } from '@phosphor-icons/react';
import { FieldValues, FieldErrors } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label: string;
   error?: FieldErrors<FieldValues>;
   required?: boolean;
   loading?: boolean;
   loadingText?: string;
   type?: 'text' | 'password' | 'email' | 'tel';
}

// forwardRef é necessário para encaminhar uma referência para o elemento filho (input)
export const Input = forwardRef<HTMLInputElement, InputProps>(
   (
      {
         label,
         error,
         required,
         loading,
         loadingText,
         type = 'text',
         className = '',
         ...props
      },
      ref
   ) => {
      const [isPasswordVisible, setIsPasswordVisible] = useState(false);

      return (
         <div className='space-y-2'>
            <label
               htmlFor={props.id}
               className='block text-md font-medium px-1 text-zinc-300'
            >
               {required && <span>*</span>}
               {label}
            </label>
            <div className='relative'>
               <input
                  // Recebe a referência do pai (necessário para integração com React Hook Form)
                  ref={ref}
                  type={type === 'password' && isPasswordVisible ? 'text' : type}
                  {...props}
                  className={`w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600 ${className}`}
               />
               {type === 'password' && (
                  <button
                     type='button'
                     className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                     onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                     title={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                     aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                     {isPasswordVisible ? <Eye size={24} /> : <EyeSlash size={24} />}
                  </button>
               )}
            </div>
            <p className='text-orange-400 text-sm px-1'>
               {loading && loadingText && (
                  <span className='flex items-center gap-1'>
                     <SpinnerGap size={20} className='animate-spin' />
                     {loadingText}
                  </span>
               )}
               <ErrorMessage errors={error} name={props.name || ''} />
            </p>
         </div>
      );
   }
);
