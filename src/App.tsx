import { useRef, useState } from 'react';
import { Eye, EyeSlash, SpinnerGap } from '@phosphor-icons/react';

import { FieldValues, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useHookFormMask } from 'use-mask-input';

import { Header } from './components/Header';
import { SubmitMessage } from './components/SubmitMessage';
import { Fieldset } from './components/Fieldset';
import { InputText } from './components/InputText';
import { Button } from './components/Button';

function App() {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
   const [loadingZipcode, setLoadingZipcode] = useState(false);
   // Mensagens ao submeter os dados, exibidas no topo do formulário
   const [submitSuccessMessage, setSubmitSuccessMessage] = useState('');
   const [submitErrorMessage, submitSetErrorMessage] = useState('');

   const {
      register,
      getValues,
      setValue,
      setError,
      clearErrors,
      handleSubmit,
      reset,
      formState: { isSubmitting, errors },
   } = useForm();

   const registerWithMask = useHookFormMask(register);

   // Cria uma referência para lidar com as requisições em paralelo anteriores
   const abortControllerRef = useRef<AbortController | null>(null);

   async function handleZipCodeBlur(event: React.FocusEvent<HTMLInputElement>) {
      setValue('city', '');
      setValue('state', '');
      clearErrors('zipcode');

      // Cancela a requisição anterior, se houver
      abortControllerRef.current?.abort();

      // Cria um novo AbortController para a requisição atual
      const newAbortControllerRef = new AbortController();
      abortControllerRef.current = newAbortControllerRef;

      const zipcode = event.target.value;

      setLoadingZipcode(true);

      try {
         if (zipcode === '') {
            return;
         }

         const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipcode}`, {
            signal: abortControllerRef.current?.signal,
         });

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
         // Condição que impede de mostrar o erro de requisições em paralelo anteriores
         if (getValues('city') === '') {
            // Se receber uma exceção direta do fetch (CORS ou timeout) e não uma resposta do back-end
            setError('zipcode', { type: 'manual', message: 'CEP não encontrado.' });
         }
         console.log(error);
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
         <Header />
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
            <Fieldset legend='Dados Pessoais'>
               <div className='space-y-2'>
                  <InputText
                     id='name'
                     label='Nome'
                     required
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
                     error={errors}
                  />
               </div>

               <div className='space-y-2'>
                  <InputText
                     id='lastName'
                     label='Sobrenome'
                     required
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
                     error={errors}
                  />
               </div>

               <div className='space-y-2'>
                  <InputText
                     id='phone'
                     label='Telefone celular'
                     required
                     placeholder='(__) _____-____'
                     {...registerWithMask('phone', '(99) 99999-9999', {
                        required: 'O Telefone celular deve ser preenchido.',
                        pattern: {
                           value: /^\(\d{2}\) \d{5}-\d{4}$/,
                           message: 'Telefone celular inválido.',
                        },
                     })}
                     maxLength={15}
                     error={errors}
                  />
               </div>

               <div className='space-y-2'>
                  <InputText
                     id='cpf'
                     label='CPF'
                     required
                     placeholder='___.___.___-__'
                     {...registerWithMask('cpf', '999.999.999-99', {
                        required: 'O CPF deve ser preenchido.',
                        pattern: {
                           value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                           message: 'CPF inválido.',
                        },
                     })}
                     maxLength={14}
                     error={errors}
                  />
               </div>

               <div className='space-y-2'>
                  <InputText
                     id='zipcode'
                     label='CEP'
                     required
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
                     error={errors}
                     loading={loadingZipcode}
                     loadingText='Buscando informações do CEP...'
                  />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-[minmax(200px,_1fr)_150px] gap-4'>
                  <div className='space-y-2'>
                     <InputText
                        id='address'
                        label='Endereço'
                        required
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
                        error={errors}
                     />
                  </div>

                  <div className='space-y-2'>
                     <InputText
                        id='addressNumber'
                        label='Número'
                        type='number'
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
                        error={errors}
                     />
                  </div>
               </div>

               <div className='grid grid-cols-1 md:grid-cols-[minmax(200px,_1fr)_150px] gap-4'>
                  <div className='space-y-2'>
                     <InputText
                        id='city'
                        label='Cidade'
                        required
                        className='disabled:bg-zinc-800'
                        {...register('city', {
                           required: 'Obtenha a Cidade através do CEP.',
                        })}
                        disabled
                        error={errors}
                     />
                  </div>

                  <div className='space-y-2'>
                     <InputText
                        id='state'
                        label='Estado'
                        required
                        className='disabled:bg-zinc-800'
                        {...register('state', {
                           required: 'Obtenha o Estado através do CEP.',
                        })}
                        disabled
                        error={errors}
                     />
                  </div>
               </div>
            </Fieldset>

            <Fieldset legend='Credenciais'>
               <div className='space-y-2'>
                  <InputText
                     id='email'
                     label='E-mail'
                     type='email'
                     required
                     {...register('email', {
                        required: 'O E-mail deve ser preenchido.',
                        pattern: {
                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                           message: 'E-mail inválido.',
                        },
                     })}
                     error={errors}
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
            </Fieldset>

            <Fieldset legend='Termos de Uso'>
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
            </Fieldset>

            <p className='text-sm text-zinc-400'>* Campos obrigatórios</p>

            <Button isSubmitting={isSubmitting}>
               {isSubmitting ? (
                  <>
                     <SpinnerGap size={20} className='animate-spin' />
                     Cadastrando...
                  </>
               ) : (
                  'Cadastrar'
               )}
            </Button>
         </form>
      </main>
   );
}

export default App;
