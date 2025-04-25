import { useState } from 'react';
import { Eye, EyeSlash, SpinnerGap } from '@phosphor-icons/react';
import { FieldValues, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useHookFormMask } from 'use-mask-input';
import { SubmitMessage } from './components/SubmitMessage';

function App() {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
   const [loadingZipcode, setLoadingZipcode] = useState(false);
   // Mensagens ao submeter os dados, exibidas no topo do formulário
   const [submitSuccessMessage, setSubmitSuccessMessage] = useState('');
   const [submitErrorMessage, submitSetErrorMessage] = useState('');

   const {
      register,
      setValue,
      setError,
      clearErrors,
      handleSubmit,
      reset,
      formState: { isSubmitting, errors },
   } = useForm();

   const registerWithMask = useHookFormMask(register);

   async function handleZipCodeBlur(event: React.FocusEvent<HTMLInputElement>) {
      setValue('city', '');
      setValue('state', '');
      clearErrors('zipcode');

      const zipcode = event.target.value;

      setLoadingZipcode(true);

      try {
         if (zipcode === '') {
            return;
         }

         const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipcode}`);

         if (!response.ok) {
            throw new Error('Erro ao buscar informações do CEP.');
         }

         const data = await response.json();

         // Preenchendo os campos Cidade e Estado com os dados do CEP
         setValue('city', data.city);
         setValue('state', data.state);

         clearErrors('zipcode');
         clearErrors('city');
         clearErrors('state');
      } catch (error) {
         // Se receber uma exceção direta do fetch (CORS ou timeout) e não uma resposta do back-end
         setError('zipcode', { type: 'manual', message: 'CEP não encontrado.' });
      } finally {
         setLoadingZipcode(false);
      }
   }

   async function onSubmit(data: FieldValues) {
      setSubmitSuccessMessage('');
      submitSetErrorMessage('');

      try {
         const response = await fetch(
            'https://apis.codante.io/api/register-user/register',
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
            }
         );

         const resData = await response.json();

         if (!response.ok) {
            for (const field in resData.errors) {
               submitSetErrorMessage('Erro ao cadastrar usuário.');
               // Exibindo mensagem de erro no campo vinda do back-end
               setError(field, { type: 'manual', message: resData.errors[field] });
               console.log(resData);
            }
         } else {
            reset();
            setSubmitSuccessMessage(resData.message);
            console.log(resData);
         }
      } catch (error) {
         submitSetErrorMessage('Erro ao enviar os dados, tente mais tarde.');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
   }

   return (
      <main className='min-h-screen flex flex-col items-center justify-center md:p-4'>
         <div className='flex flex-col items-center justify-center gap-1 w-full max-w-3xl bg-linear-to-t from-teal-600 to-teal-800 md:rounded-t-lg border-b border-teal-500 p-4 pb-5'>
            <h1 className='text-2xl font-semibold text-shadow-sm text-shadow-teal-800'>
               Cadastro de Usuário
            </h1>
            <h2 className='text-zinc-300'>Formulário com React Hook Form e Zod</h2>
         </div>
         {submitSuccessMessage && (
            <SubmitMessage
               textColor='text-teal-600'
               messageText={`${submitSuccessMessage} (Usuário cadastrado com sucesso!)`}
            />
         )}
         {submitErrorMessage && (
            <SubmitMessage textColor='text-orange-400' messageText={submitErrorMessage} />
         )}
         <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full max-w-3xl bg-zinc-800 rounded-b-lg shadow-xl p-6 space-y-6'
         >
            <fieldset className='flex flex-col gap-3 bg-zinc-700/20 border border-zinc-700 rounded-lg p-5'>
               <legend className='pt-1 pb-1.5 px-3 md:px-8 bg-zinc-800 border border-zinc-700 rounded-lg text-lg font-semibold text-zinc-300'>
                  Dados Pessoais
               </legend>

               <div className='space-y-2'>
                  <label
                     htmlFor='name'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     <span>*</span>Nome
                  </label>
                  <input
                     type='text'
                     id='name'
                     {...register('name', {
                        required: 'O Nome deve ser preenchido.',
                        minLength: {
                           value: 2,
                           message: 'O Nome deve ter no mínimo 2 caracteres.',
                        },
                        maxLength: {
                           value: 40,
                           message: 'O Nome deve ter no máximo 40 caracteres.',
                        },
                     })}
                     maxLength={40}
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
                  <p className='text-orange-400 text-sm px-1'>
                     <ErrorMessage errors={errors} name='name' />
                  </p>
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
                     {...register('lastName', {
                        required: 'O Sobrenome deve ser preenchido.',
                        minLength: {
                           value: 2,
                           message: 'O Sobrenome deve ter no mínimo 2 caracteres.',
                        },
                        maxLength: {
                           value: 100,
                           message: 'O Sobrenome deve ter no máximo 100 caracteres.',
                        },
                     })}
                     maxLength={100}
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
                  <p className='text-orange-400 text-sm px-1'>
                     <ErrorMessage errors={errors} name='lastName' />
                  </p>
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
                     placeholder='(__) _____-____'
                     {...registerWithMask('phone', '(99) 99999-9999', {
                        required: 'O Telefone celular deve ser preenchido.',
                        pattern: {
                           value: /^\(\d{2}\) \d{5}-\d{4}$/,
                           message: 'Telefone celular inválido.',
                        },
                     })}
                     maxLength={15}
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
                  <p className='text-orange-400 text-sm px-1'>
                     <ErrorMessage errors={errors} name='phone' />
                  </p>
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
                     placeholder='___.___.___-__'
                     {...registerWithMask('cpf', '999.999.999-99', {
                        required: 'O CPF deve ser preenchido.',
                        pattern: {
                           value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                           message: 'CPF inválido.',
                        },
                     })}
                     maxLength={14}
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
                  <p className='text-orange-400 text-sm px-1'>
                     <ErrorMessage errors={errors} name='cpf' />
                  </p>
               </div>

               <div className='space-y-2'>
                  <label
                     htmlFor='zipcode'
                     className='block text-md font-medium px-1 text-zinc-300'
                  >
                     <span>*</span>CEP
                  </label>
                  <input
                     type='text'
                     id='zipcode'
                     placeholder='_____-___'
                     {...registerWithMask('zipcode', '99999-999', {
                        required: 'O CEP deve ser preenchido.',
                        pattern: {
                           value: /^\d{5}-\d{3}$/,
                           message: 'CEP inválido.',
                        },
                        onBlur: handleZipCodeBlur,
                     })}
                     maxLength={9}
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
                  <p className='text-orange-400 text-sm px-1'>
                     {loadingZipcode && (
                        <span className='flex items-center gap-1'>
                           <SpinnerGap size={20} className='animate-spin' />
                           Buscando informações do CEP...
                        </span>
                     )}
                     <ErrorMessage errors={errors} name='zipcode' />
                  </p>
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
                        {...register('address', {
                           required: 'O Endereço deve ser preenchido.',
                           minLength: {
                              value: 2,
                              message: 'O Endereço deve ter no mínimo 2 caracteres.',
                           },
                           maxLength: {
                              value: 100,
                              message: 'O Endereço deve ter no máximo 100 caracteres.',
                           },
                        })}
                        maxLength={100}
                        className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                     />
                     <p className='text-orange-400 text-sm px-1'>
                        <ErrorMessage errors={errors} name='address' />
                     </p>
                  </div>

                  <div className='space-y-2'>
                     <label
                        htmlFor='addressNumber'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        Número
                     </label>
                     <input
                        type='number'
                        id='addressNumber'
                        {...register('addressNumber', {
                           maxLength: {
                              value: 6,
                              message:
                                 'O número do endereço deve ter no máximo 6 caracteres.',
                           },
                           pattern: {
                              value: /^\d{1,6}$/,
                              message: 'Número inválido.',
                           },
                        })}
                        maxLength={6}
                        className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                     />
                     <p className='text-orange-400 text-sm px-1'>
                        <ErrorMessage errors={errors} name='addressNumber' />
                     </p>
                  </div>
               </div>

               <div className='grid grid-cols-1 md:grid-cols-[minmax(200px,_1fr)_150px] gap-4'>
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
                        {...register('city', {
                           required: 'Obtenha a Cidade através do CEP.',
                        })}
                        disabled
                        className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:bg-zinc-800'
                     />
                     <p className='text-orange-400 text-sm px-1'>
                        <ErrorMessage errors={errors} name='city' />
                     </p>
                  </div>

                  <div className='space-y-2'>
                     <label
                        htmlFor='state'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        <span>*</span>Estado
                     </label>
                     <input
                        type='text'
                        id='state'
                        {...register('state', {
                           required: 'Obtenha o Estado através do CEP.',
                        })}
                        disabled
                        className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:bg-zinc-800'
                     />
                     <p className='text-orange-400 text-sm px-1'>
                        <ErrorMessage errors={errors} name='state' />
                     </p>
                  </div>
               </div>
            </fieldset>

            <fieldset className='flex flex-col gap-3 bg-zinc-700/20 border border-zinc-700 rounded-lg p-5'>
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
                     {...register('email', {
                        required: 'O E-mail deve ser preenchido.',
                        pattern: {
                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                           message: 'E-mail inválido.',
                        },
                     })}
                     className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                  />
                  <p className='text-orange-400 text-sm px-1'>
                     <ErrorMessage errors={errors} name='email' />
                  </p>
               </div>

               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                     <label
                        htmlFor='password'
                        className='block text-md font-medium px-1 text-zinc-300'
                     >
                        <span>*</span>Senha
                     </label>
                     <div className='relative space-y-2'>
                        <input
                           type={isPasswordVisible ? 'text' : 'password'}
                           id='password'
                           {...register('password', {
                              required: 'A Senha deve ser preenchida.',
                              minLength: {
                                 value: 8,
                                 message: 'A Senha deve ter no mínimo 8 caracteres.',
                              },
                              maxLength: {
                                 value: 24,
                                 message: 'A Senha deve ter no máximo 24 caracteres.',
                              },
                           })}
                           maxLength={24}
                           className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                        />
                        <p className='text-orange-400 text-sm px-1'>
                           <ErrorMessage errors={errors} name='password' />
                        </p>
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
                     <div className='relative space-y-2'>
                        <input
                           type={isConfirmPasswordVisible ? 'text' : 'password'}
                           id='confirmPassword'
                           {...register('password_confirmation', {
                              required: 'A Confirmação de senha deve ser preenchida.',
                              minLength: {
                                 value: 8,
                                 message:
                                    'A Confirmação deve ter no mínimo 8 caracteres.',
                              },
                              maxLength: {
                                 value: 24,
                                 message:
                                    'A Confirmação deve ter no máximo 24 caracteres.',
                              },
                              validate: (value, formValues) => {
                                 if (value !== formValues.password) {
                                    return 'As senhas não coincidem.';
                                 }
                              },
                           })}
                           maxLength={24}
                           className='w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-md text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600'
                        />
                        <p className='text-orange-400 text-sm px-1'>
                           <ErrorMessage errors={errors} name='password_confirmation' />
                        </p>
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

            <fieldset className='flex flex-col gap-1 bg-zinc-700/20 border border-zinc-700 rounded-lg p-5'>
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
                        {...register('terms', {
                           required: 'Os termos de uso devem ser aceitos.',
                        })}
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
               <p className='text-orange-400 text-sm px-1'>
                  <ErrorMessage errors={errors} name='terms' />
               </p>
            </fieldset>

            <p className='text-sm text-zinc-400'>* Campos obrigatórios</p>

            <button
               type='submit'
               disabled={isSubmitting}
               className='flex items-center justify-center gap-2 w-full bg-teal-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
               {isSubmitting ? (
                  <>
                     <SpinnerGap size={20} className='animate-spin' />
                     Cadastrando...
                  </>
               ) : (
                  'Cadastrar'
               )}
            </button>
         </form>
      </main>
   );
}

export default App;
