import { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

function App() {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

   return (
      <main className='min-h-screen flex flex-col items-center justify-center md:p-4'>
         <div className='flex flex-col items-center justify-center gap-1 w-full max-w-3xl bg-linear-to-t from-teal-600 to-teal-800 md:rounded-t-lg border-b border-teal-500 p-4 pb-5'>
            <h1 className='text-2xl font-semibold text-shadow-sm text-shadow-teal-800'>
               Cadastro de Usuário
            </h1>
            <h2 className='text-zinc-300'>Formulário com React Hook Form e Zod</h2>
         </div>
         <form className='w-full max-w-3xl bg-zinc-800 rounded-b-lg shadow-xl p-6 space-y-6'>
            <fieldset className='flex flex-col gap-5 bg-zinc-700/20 border border-zinc-700 rounded-lg p-5'>
               <legend className='pt-1 pb-1.5 px-3 md:px-8 bg-zinc-800 border border-zinc-700 rounded-lg text-lg font-semibold text-zinc-300'>
                  Dados Pessoais
               </legend>

               <div className='space-y-2'>
                  <label
                     htmlFor='firstName'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     <span>*</span>Nome
                  </label>
                  <input
                     type='text'
                     id='firstName'
                     name='firstName'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='lastName'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     <span>*</span>Sobrenome
                  </label>
                  <input
                     type='text'
                     id='lastName'
                     name='lastName'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='phone'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     <span>*</span>Telefone celular
                  </label>
                  <input
                     type='tel'
                     id='phone'
                     name='phone'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='cpf'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     <span>*</span>CPF
                  </label>
                  <input
                     type='text'
                     id='cpf'
                     name='cpf'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='cep'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     <span>*</span>CEP
                  </label>
                  <input
                     type='text'
                     id='cep'
                     name='cep'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-[minmax(200px,_1fr)_150px] gap-4'>
                  <div className='space-y-2'>
                     <label
                        htmlFor='address'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        <span>*</span>Endereço
                     </label>
                     <input
                        type='text'
                        id='address'
                        name='address'
                        required
                        className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
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
                        className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                     />
                  </div>
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='city'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     <span>*</span>Cidade
                  </label>
                  <input
                     type='text'
                     id='city'
                     name='city'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
               </div>
            </fieldset>

            <fieldset className='flex flex-col gap-5 bg-zinc-700/20 border border-zinc-700 rounded-lg p-5'>
               <legend className='pt-1 pb-1.5 px-3 md:px-8 bg-zinc-800 border border-zinc-700 rounded-lg text-lg font-semibold text-zinc-300'>
                  Credenciais
               </legend>

               <div className='space-y-2'>
                  <label
                     htmlFor='email'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     <span>*</span>E-mail
                  </label>
                  <input
                     type='email'
                     id='email'
                     name='email'
                     required
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                     <label
                        htmlFor='password'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        <span>*</span>Senha
                     </label>
                     <div className='relative'>
                        <input
                           type={isPasswordVisible ? 'text' : 'password'}
                           id='password'
                           name='password'
                           required
                           className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                        />
                        <span className='absolute right-3 top-2'>
                           <button
                              type='button'
                              className='cursor-pointer'
                              title={
                                 isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'
                              }
                              aria-label={
                                 isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'
                              }
                              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                           >
                              {isPasswordVisible ? (
                                 <Eye size={24} />
                              ) : (
                                 <EyeSlash size={24} />
                              )}
                           </button>
                        </span>
                     </div>
                  </div>
                  <div className='space-y-2'>
                     <label
                        htmlFor='confirmPassword'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        <span>*</span>Confirmar senha
                     </label>
                     <div className='relative'>
                        <input
                           type={isConfirmPasswordVisible ? 'text' : 'password'}
                           id='confirmPassword'
                           name='confirmPassword'
                           required
                           className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                        />
                        <span className='absolute right-3 top-2'>
                           <button
                              type='button'
                              className='cursor-pointer'
                              title={
                                 isConfirmPasswordVisible
                                    ? 'Ocultar senha'
                                    : 'Mostrar senha'
                              }
                              aria-label={
                                 isConfirmPasswordVisible
                                    ? 'Ocultar senha'
                                    : 'Mostrar senha'
                              }
                              onClick={() =>
                                 setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                              }
                           >
                              {isConfirmPasswordVisible ? (
                                 <Eye size={24} />
                              ) : (
                                 <EyeSlash size={24} />
                              )}
                           </button>
                        </span>
                     </div>
                  </div>
               </div>
            </fieldset>

            <fieldset className='flex flex-col gap-5 bg-zinc-700/20 border border-zinc-700 rounded-lg p-5'>
               <legend className='pt-1 pb-1.5 px-3 md:px-8 bg-zinc-800 border border-zinc-700 rounded-lg text-lg font-semibold text-zinc-300'>
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
                        className='w-4 h-4 text-gray-600 bg-zinc-700 border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 accent-teal-400'
                     />
                     <span className='text-sm text-zinc-300'>
                        <span>*</span>Aceito todos os{' '}
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

            <p className='text-sm text-zinc-400'>* Campos obrigatórios</p>

            <button
               type='submit'
               className='w-full bg-teal-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-colors cursor-pointer'
            >
               Cadastrar
            </button>
         </form>
      </main>
   );
}

export default App;
