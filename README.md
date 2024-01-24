# NodeBlog

Apenas um projetinho bem básico para fixar os conhecimentos com Node.JS
Neste microblog o admin tem controle total da criação de conteúdo, enquanto os usuários normais apenas lêem (bem simples)

## Instalação

- Instale as dependências com:

```npm install ```

- Após isso, você precisa rodar o script para criar o db.js e garantir as possíveis conexões:

```node createDB.js  ```

Um arquivo db.js foi criado no diretório "config". Caso utilize um banco de dados por alguma DBaaS, apenas colar seu url de conexão.
Lembre-se de incluir no ".gitignore" o arquivo criado para evitar vazamento de suas credenciais.

- Antes da primeira execução, incluir no arquivo "usuario.js" na linha 53 o código:

```isadmin: 1 ```

Feito isso, garantirá que o usuário cadastrado seja o admin (Após a criação do usuário, caso queira ser o único admin, retirar esta linha de código)

- Após a instalação das dependências e configuração do "db.js":

```npm start ```


## Uso

Use a vontade como um blog pessoal

## Contribuição

Fiquem a vontade para contribuir como quiserem
