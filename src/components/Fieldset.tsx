interface FieldsetProps {
   children: React.ReactNode;
   legend: string;
}

export function Fieldset({ children, legend }: FieldsetProps) {
   return (
      <fieldset className='flex flex-col gap-3 bg-zinc-700/20 border border-zinc-700 rounded-lg p-5'>
         <legend className='pt-1 pb-1.5 px-3 md:px-8 bg-zinc-800 border border-zinc-700 rounded-lg text-lg font-semibold text-zinc-300'>
            {legend}
         </legend>
         {children}
      </fieldset>
   );
}
