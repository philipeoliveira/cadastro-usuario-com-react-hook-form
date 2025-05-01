import axios from 'axios';
import { useState } from 'react';
import { SpinnerGap } from '@phosphor-icons/react';

import { FieldValues, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useHookFormMask } from 'use-mask-input';

import { Header } from './components/Header';
import { Fieldset } from './components/Fieldset';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { SubmitMessage } from './components/SubmitMessage';

function App() {
   const [loadingZipcode, setLoadingZipcode] = useState(false);

   const {
      register,
      setValue,
      setError,
      clearErrors,
      handleSubmit,
      reset,
      formState: { isSubmitting, errors, isSubmitSuccessful, submitCount },
   } = useForm();

   const registerWithMask = useHookFormMask(register);

   function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }

   // Função para lidar com erros de validação ao submeter o form
   function onError() {
      scrollToTop();
   }

   async function handleZipCodeBlur(event: React.FocusEvent<HTMLInputElement>) {
      setValue('city', '');
      setValue('state', '');
      clearErrors('zipcode');

      const zipcode = event.target.value;

      setLoadingZipcode(true);

      try {
         /**
          * Apesar do required no input do zipcode,
          * esse if evita a requisição caso o usuário não tenha preenchido o campo
          */
         if (zipcode === '') {
            return;
         }

         const { data } = await axios.get(
            `https://brasilapi.com.br/api/cep/v2/${zipcode}`,
            { timeout: 60000 } // 60 segundos
         );

         // Preenchendo os campos Cidade e Estado com os dados do CEP
         setValue('city', data.city);
         setValue('state', data.state);

         clearErrors('zipcode');
         clearErrors('city');
         clearErrors('state');
      } catch (error) {
         // Requisição cancelada por timeout configurado no axios
         if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            setError('zipcode', {
               type: 'manual',
               message: 'A busca demorou demais, tente novamente.',
            });
         } else {
            setError('zipcode', { type: 'manual', message: 'CEP não encontrado.' });
         }
      } finally {
         setLoadingZipcode(false);
      }
   }

   async function onSubmit(data: FieldValues) {
      try {
         await axios.post('https://apis.codante.io/api/register-user/register', data, {
            timeout: 60000,
            headers: {
               'Content-Type': 'application/json',
            },
         });

         reset();
      } catch (error) {
         if (axios.isAxiosError(error) && error.response?.data?.errors) {
            const errors = error.response.data.errors;
            for (const field in errors) {
               setError(field, { type: 'manual', message: errors[field] });
            }
         }
      }

      scrollToTop();
   }

   return (
      <main className='min-h-screen flex flex-col items-center justify-center md:p-4'>
         <Header />
         {isSubmitSuccessful && (
            <SubmitMessage
               textColor='text-teal-600'
               messageText='Usuário cadastrado com sucesso!'
            />
         )}
         {submitCount > 0 && !isSubmitSuccessful && (
            <SubmitMessage
               textColor='text-orange-400'
               messageText='Erro ao cadastrar usuário. Tente novamente.'
            />
         )}
         <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className='w-full max-w-3xl bg-zinc-800 rounded-b-lg shadow-xl p-6 space-y-6'
         >
            <Fieldset legend='Dados Pessoais'>
               <div className='space-y-2'>
                  <Input
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
                     autoComplete='name'
                  />
               </div>

               <div className='space-y-2'>
                  <Input
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
                  <Input
                     id='phone'
                     label='Telefone celular'
                     type='tel'
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
                     autoComplete='tel'
                  />
               </div>

               <div className='space-y-2'>
                  <Input
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
                  <Input
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
                     disabled={loadingZipcode}
                     className={`${
                        loadingZipcode ? 'disabled:bg-zinc-800 text-zinc-400' : ''
                     }`}
                  />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-[minmax(200px,_1fr)_150px] gap-4'>
                  <div className='space-y-2'>
                     <Input
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
                        autoComplete='street-address'
                     />
                  </div>

                  <div className='space-y-2'>
                     <Input
                        id='addressNumber'
                        label='Número'
                        {...register('addressNumber', {
                           maxLength: {
                              value: 6,
                              message:
                                 'O Número do Endereço deve ter no máximo 6 caracteres.',
                           },
                           pattern: {
                              value: /^\d{0,6}$/,
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
                     <Input
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
                     <Input
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
                  <Input
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
                        maxLength: {
                           value: 100,
                           message: 'O E-mail deve ter no máximo 100 caracteres.',
                        },
                     })}
                     maxLength={100}
                     error={errors}
                     autoComplete='email'
                  />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                     <Input
                        id='password'
                        label='Senha'
                        type='password'
                        required
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
                        error={errors}
                     />
                  </div>
                  <div className='space-y-2'>
                     <Input
                        id='confirmPassword'
                        label='Confirmar senha'
                        type='password'
                        required
                        {...register('password_confirmation', {
                           required: 'A Confirmação de senha deve ser preenchida.',
                           minLength: {
                              value: 8,
                              message: 'A Confirmação deve ter no mínimo 8 caracteres.',
                           },
                           maxLength: {
                              value: 24,
                              message: 'A Confirmação deve ter no máximo 24 caracteres.',
                           },
                           validate: (value, formValues) => {
                              if (value !== formValues.password) {
                                 return 'As senhas não coincidem.';
                              }
                           },
                        })}
                        maxLength={24}
                        error={errors}
                     />
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
