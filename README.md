# PI-3-Semestre: Sistema de Gerenciamento de Loja de Construção

## 1. Visão Geral do Projeto

Este projeto foi desenvolvido como parte de uma atividade acadêmica, implementando um sistema simples de gerenciamento para uma loja de construção civil. O foco inicial é a criação de um módulo de autenticação (Login e Cadastro) para usuários (representando a loja ou seus administradores).

O projeto segue uma arquitetura de três camadas (Controller, Service, Repository) no backend, garantindo a separação de responsabilidades e a manutenibilidade do código.

## 2. Tecnologias Utilizadas

| Componente | Tecnologia | Versão | Propósito |
| :--- | :--- | :--- | :--- |
| **Backend** | Spring Boot | 3.2.0 | Framework para construção da API RESTful. |
| | Java | 17+ | Linguagem de programação principal. |
| **Banco de Dados** | MongoDB | - | Banco de dados NoSQL para persistência de dados de usuários. |
| **Frontend** | HTML5 | - | Estrutura das páginas de Login e Cadastro. |
| | CSS3 | - | Estilização das interfaces, seguindo um design simples e moderno. |
| | JavaScript (ES6+) | - | Lógica de comunicação com a API (via `fetch`) e validação de formulário. |

## 3. Arquitetura do Backend (Spring Boot)

O backend segue o padrão MVC (Model-View-Controller), adaptado para uma API REST, com a adição da camada de Serviço (Service) para isolar a lógica de negócio:

*   **Model:** Contém a classe `Usuario`, que representa a entidade de dados e a coleção no MongoDB.
*   **Repository:** Interface que estende `MongoRepository`, responsável pela comunicação direta com o banco de dados (CRUD).
*   **Service:** Contém a lógica de negócio (ex: verificar se o CPF/CNPJ já existe, autenticar o usuário). O Controller chama o Service.
*   **Controller:** Responsável por receber as requisições HTTP, chamar o Service e retornar as respostas HTTP.

## 4. Requisitos

### 4.1. Requisitos Funcionais (RF)

| ID | Requisito | Status |
| :--- | :--- | :--- |
| RF01 | O sistema deve permitir o cadastro de novos usuários (Nome, CPF/CNPJ, E-mail, Senha). | Implementado |
| RF02 | O sistema deve permitir o login de usuários utilizando CPF/CNPJ e Senha. | Implementado |
| RF03 | O sistema deve validar se o CPF/CNPJ já está cadastrado durante a criação de um novo usuário. | Implementado |
| RF04 | O sistema deve permitir a navegação entre as telas de Login e Cadastro. | Implementado |

### 4.2. Requisitos Não Funcionais (RNF)

| ID | Requisito | Categoria |
| :--- | :--- | :--- |
| RNF01 | O backend deve ser desenvolvido utilizando Spring Boot e Java 17+. | Tecnológico |
| RNF02 | O banco de dados deve ser o MongoDB. | Tecnológico |
| RNF03 | O sistema deve ser responsivo e ter um design simples e intuitivo. | Usabilidade |
| RNF04 | O sistema deve permitir requisições CORS para desenvolvimento local. | Segurança/Infraestrutura |

## 5. Endpoints da API

Todos os endpoints estão prefixados com `/api/auth`.

| Método | URL | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Cadastra um novo usuário. |
| `POST` | `/api/auth/login` | Autentica um usuário existente. |

## 6. Como Rodar o Projeto

### Pré-requisitos

*   Java Development Kit (JDK) 17+
*   Apache Maven
*   Servidor MongoDB rodando na porta padrão (27017)

### Passos

1.  **Navegue** até o diretório raiz do projeto (`PI-3-Semestre`).
2.  **Inicie o Backend (Spring Boot):**
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
3.  **Acesse o Frontend:**
    *   Abra o arquivo `frontend/login.html` ou `frontend/cadastro.html` no seu navegador.
    *   O frontend se comunicará com o backend em `http://localhost:8080`.

**Nota:** O servidor Spring Boot deve permanecer rodando no terminal enquanto você testa o frontend. Pressione `Ctrl + C` para pará-lo.
