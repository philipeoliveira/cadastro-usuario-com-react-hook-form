interface ButtonProps {
   isSubmitting: boolean;
   children: React.ReactNode;
}

export function Button({ isSubmitting, children }: ButtonProps) {
   return (
      <button
         type='submit'
         disabled={isSubmitting}
         className='flex items-center justify-center gap-2 w-full bg-teal-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
      >
         {children}
      </button>
   );
}
