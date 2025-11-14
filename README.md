# PI-3-Semestre: Sistema de Gerenciamento de Loja de Construção

## 1. Visão Geral do Projeto

Este projeto implementa um sistema de gerenciamento para uma loja de construção civil. O backend (Spring Boot + MongoDB) fornece os serviços de autenticação, e o frontend (HTML, CSS, JavaScript puro) oferece as interfaces de usuário para gerenciamento de atividades e estoque.

O projeto segue uma arquitetura de três camadas (Controller, Service, Repository) no backend, garantindo a separação de responsabilidades e a manutenibilidade do código.

## 2. Tecnologias Utilizadas

| Componente | Tecnologia | Versão | Propósito |
| :--- | :--- | :--- | :--- |
| **Backend** | Spring Boot | 3.2.0 | Framework para construção da API RESTful. |
| | Java | 17+ | Linguagem de programação principal. |
| **Banco de Dados** | MongoDB | - | Banco de dados NoSQL para persistência de dados de usuários. |
| **Frontend** | HTML5 | - | Estrutura das páginas. |
| | CSS3 | - | Estilização das interfaces (estilo unificado). |
| | JavaScript (ES6+) | - | Lógica de comunicação com a API (via `fetch`) e interatividade do frontend. |

## 3. Arquitetura do Backend (Spring Boot)

O backend segue o padrão MVC (Model-View-Controller), adaptado para uma API REST, com a adição da camada de Serviço (Service) para isolar a lógica de negócio:

*   **Model:** Contém as classes `Usuario` e `Produto`, que representam as entidades de dados e as coleções no MongoDB.
*   **Repository:** Interface que estende `MongoRepository`, responsável pela comunicação direta com o banco de dados (CRUD).
*   **Service:** Contém a lógica de negócio (ex: verificar se o CPF/CNPJ já existe, autenticar o usuário). O Controller chama o Service.
*   **Controller:** Responsável por receber as requisições HTTP, chamar o Service e retornar as respostas HTTP.

## 4. Telas de Frontend Implementadas

O frontend foi desenvolvido em HTML, CSS e JavaScript puro, mantendo um estilo visual unificado.

| Tela | Arquivo | Funcionalidade |
| :--- | :--- | :--- |
| **Login** | `login.html` | Autenticação de usuário (CPF/CNPJ e Senha). |
| **Cadastro** | `cadastro.html` | Cadastro de novos usuários. |
| **Início/Calendário** | `inicio.html` | Visualização de atividades agendadas em formato de calendário. |
| **Cadastro de Afazeres** | `cadastro_afazeres.html` | Formulário para adicionar novas atividades ao calendário. |
| **Estoque** | `estoque.html` | Gerenciamento de materiais (adicionar/retirar/visualizar). |
| **Chat** | `chat.html` | Interface simulada para comunicação com clientes. |

## 5. Requisitos

### 5.1. Requisitos Funcionais (RF)

| ID | Requisito | Status |
| :--- | :--- | :--- |
| RF01 | O sistema deve permitir o cadastro de novos usuários. | Implementado |
| RF02 | O sistema deve permitir o login de usuários. | Implementado |
| RF03 | O sistema deve redirecionar o usuário para a tela de Início após o login. | Implementado |
| RF04 | O sistema deve exibir uma tela de calendário para gerenciamento de atividades. | Implementado (Mockup) |
| RF05 | O sistema deve exibir uma tela para gerenciamento de estoque. | Implementado (Mockup) |

### 5.2. Requisitos Não Funcionais (RNF)

| ID | Requisito | Categoria |
| :--- | :--- | :--- |
| RNF01 | O backend deve ser desenvolvido utilizando Spring Boot e Java 17+. | Tecnológico |
| RNF02 | O banco de dados deve ser o MongoDB. | Tecnológico |
| RNF03 | O frontend deve ser desenvolvido em HTML, CSS e JavaScript puro (sem frameworks). | Tecnológico |
| RNF04 | O sistema deve permitir requisições CORS para desenvolvimento local. | Segurança/Infraestrutura |

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
    *   Abra o arquivo `frontend/login.html` no seu navegador.
    *   O frontend se comunicará com o backend em `http://localhost:8080`.

