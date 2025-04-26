export function Header() {
   return (
      <div className='flex flex-col items-center justify-center gap-1 w-full max-w-3xl bg-linear-to-t from-teal-600 to-teal-800 md:rounded-t-lg border-b border-teal-500 p-4 pb-5'>
         <h1 className='text-2xl font-semibold text-shadow-sm text-shadow-teal-800'>
            Cadastro de Usuário
         </h1>
         <h2 className='text-zinc-300'>Formulário com React Hook Form e Zod</h2>
      </div>
   );
}
