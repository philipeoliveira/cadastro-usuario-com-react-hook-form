import { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SpinnerGap } from '@phosphor-icons/react';
import { FieldValues, FieldErrors } from 'react-hook-form';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label: string;
   error?: FieldErrors<FieldValues>;
   required?: boolean;
   loading?: boolean;
   loadingText?: string;
}

// forwardRef é necessário para encaminhar uma referência para o elemento filho (input)
export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
   ({ label, error, required, loading, loadingText, className = '', ...props }, ref) => {
      return (
         <div className='space-y-2'>
            <label
               htmlFor={props.id}
               className='block text-md font-medium px-1 text-zinc-300'
            >
               {required && <span>*</span>}
               {label}
            </label>
            <input
               // Recebe a referência do pai (necessário para integração com React Hook Form)
               ref={ref}
               {...props}
               className={`w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600 ${className}`}
            />
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
