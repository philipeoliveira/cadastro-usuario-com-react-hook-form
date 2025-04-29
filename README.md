# Cadastro de Usuário

Código em React e TypeScript, utilizando a biblioteca Hook Forms, para a criação de um formulário de Cadastro de Usuário. Contém uma área com campos para Dados Pessoais, outra para Credenciais de login e uma para Termos de Uso.

## 🚀 Funcionalidades

-  Formulário de cadastro com validação de campos
-  Feedback visual para o usuário:
   -  Máscaras nos campos Telefone, CPF e CEP
   -  Mensagens de validações do front-end e vindas do back-end
   -  Recurso de mostrar/esconder senhas
   -  Loading no botão que envia os dados do formulário
   -  Loading para informar a busca por CEP ao clicar fora do mesmo campo
-  Preenchimento automático da Cidade e Estado através do campo CEP
-  Interface responsiva e moderna

## 🔌 APIs

-  O campo CEP faz uma requisição para a API do site Brasil API.
-  O cadastro utiliza uma API da plataforma de cursos Codante.

## 🛠️ Tecnologias Utilizadas

-  React
-  TypeScript
-  React Hook Form
-  Use Mask Input
-  Axios
-  Tailwind CSS
-  Phosphor (ícones)

## 📋 Pré-requisitos

-  Node.js (versão 14 ou superior)
-  npm ou yarn

## 🔧 Instalação

1. Clone o repositório

```bash
git clone [https://github.com/philipeoliveira/cadastro-usuario-com-react-hook-form]
```

2. Instale as dependências

```bash
npm install
```

## 🚀 Como executar

Para rodar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`
