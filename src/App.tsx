import { Eye } from '@phosphor-icons/react';

function App() {
   return (
      <main className='min-h-screen flex flex-col items-center justify-center bg-zinc-900 md:p-4'>
         <h1 className='w-full max-w-3xl text-2xl font-semibold text-center text-zinc-100 bg-linear-to-t from-gray-600 to-gray-700 md:rounded-t-lg border-b border-zinc-500 p-4 pb-5'>
            Cadastro de Usuário
         </h1>
         <form className='w-full max-w-3xl bg-zinc-800 rounded-b-lg shadow-xl p-6 space-y-6'>
            <fieldset className='space-y-5 border border-zinc-700 rounded-lg p-4'>
               <legend className='pt-1 pb-1.5 px-3 md:px-8 border border-zinc-700 rounded-lg text-lg font-semibold text-zinc-300'>
                  Dados Pessoais
               </legend>

               <div className='space-y-2'>
                  <label
                     htmlFor='firstName'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     Nome
                  </label>
                  <input
                     type='text'
                     id='firstName'
                     name='firstName'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                  />
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='lastName'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     Sobrenome
                  </label>
                  <input
                     type='text'
                     id='lastName'
                     name='lastName'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                  />
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='phone'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     Telefone celular
                  </label>
                  <input
                     type='tel'
                     id='phone'
                     name='phone'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                  />
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='cpf'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     CPF
                  </label>
                  <input
                     type='text'
                     id='cpf'
                     name='cpf'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                  />
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='cep'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     CEP
                  </label>
                  <input
                     type='text'
                     id='cep'
                     name='cep'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                  />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-[minmax(200px,_1fr)_150px] gap-4'>
                  <div className='space-y-2'>
                     <label
                        htmlFor='address'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        Endereço
                     </label>
                     <input
                        type='text'
                        id='address'
                        name='address'
                        required
                        className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                     />
                  </div>

                  <div className='space-y-2'>
                     <label
                        htmlFor='addressNumber'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        Número
                     </label>
                     <input
                        type='text'
                        id='addressNumber'
                        name='addressNumber'
                        required
                        className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                     />
                  </div>
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='city'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     Cidade
                  </label>
                  <input
                     type='text'
                     id='city'
                     name='city'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                  />
               </div>
            </fieldset>

            <fieldset className='space-y-5 border border-zinc-700 rounded-lg p-4'>
               <legend className='pt-1 pb-1.5 px-3 md:px-8 border border-zinc-700 rounded-lg text-lg font-semibold text-zinc-300'>
                  Credenciais
               </legend>

               <div className='space-y-2'>
                  <label
                     htmlFor='email'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     E-mail
                  </label>
                  <input
                     type='email'
                     id='email'
                     name='email'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                  />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                     <label
                        htmlFor='password'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        Senha
                     </label>
                     <div className='relative'>
                        <input
                           type='password'
                           id='password'
                           name='password'
                           required
                           className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                        />
                        <span className='absolute right-3 top-2'>
                           <Eye size={24} />
                        </span>
                     </div>
                  </div>
                  <div className='space-y-2'>
                     <label
                        htmlFor='confirmPassword'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        Confirmar senha
                     </label>
                     <div className='relative'>
                        <input
                           type='password'
                           id='confirmPassword'
                           name='confirmPassword'
                           required
                           className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
                        />
                        <span className='absolute right-3 top-2'>
                           <Eye size={24} />
                        </span>
                     </div>
                  </div>
               </div>
            </fieldset>

            <fieldset className='space-y-5 border border-zinc-700 rounded-lg p-4'>
               <legend className='pt-1 pb-1.5 px-3 md:px-8 border border-zinc-700 rounded-lg text-lg font-semibold text-zinc-300'>
                  Termos de Uso
               </legend>

               <div className='flex items-center'>
                  <label
                     htmlFor='terms'
                     className='flex items-center space-x-2 cursor-pointer'
                  >
                     <input
                        type='checkbox'
                        id='terms'
                        name='terms'
                        required
                        className='w-4 h-4 text-gray-600 bg-zinc-700 border-zinc-600 rounded focus:ring-gray-500'
                     />
                     <span className='text-sm text-zinc-300'>
                        Aceito todos os{' '}
                        <a
                           href='#'
                           className='border-b border-dotted hover:border-solid hover:text-white'
                        >
                           termos de uso
                        </a>
                     </span>
                  </label>
               </div>
            </fieldset>

            <button
               type='submit'
               className='w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-colors cursor-pointer'
            >
               Cadastrar
            </button>
         </form>
      </main>
   );
}

export default App;
