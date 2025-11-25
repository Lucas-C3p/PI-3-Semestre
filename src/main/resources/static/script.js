const API_BASE_URL = 'http://localhost:8080/api';

function showMessage(elementId, text, type) {
    const messageElement = document.getElementById(elementId || 'message');
    if (messageElement) {
        messageElement.textContent = text;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}

function cleanCpfCnpj(value) {
    return value.replace(/[.\-/]/g, '');
}

const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpfCnpj = cleanCpfCnpj(document.getElementById('cpfCnpj').value);
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const userData = {
            nome: nome,
            cpfCnpj: cpfCnpj,
            email: email,
            senha: senha
        };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                showMessage('message', 'Cadastro realizado com sucesso! Redirecionando para o login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                const errorText = await response.text();
                showMessage('message', `Erro no cadastro: ${errorText}`, 'error');
            }
        } catch (error) {
            showMessage('message', 'Erro de conexão com o servidor.', 'error');
            console.error('Erro:', error);
        }
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cpfCnpj = cleanCpfCnpj(document.getElementById('cpfCnpj').value);
        const senha = document.getElementById('senha').value;

        const loginData = {
            cpfCnpj: cpfCnpj,
            senha: senha
        };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                showMessage('message', 'Login bem-sucedido! Redirecionando...', 'success');
                setTimeout(() => {
                    window.location.href = 'inicio.html';
                }, 2000);
            } else {
                const errorText = await response.text();
                showMessage('message', `Erro no login: ${errorText}`, 'error');
            }
        } catch (error) {
            showMessage('message', 'Erro de conexão com o servidor.', 'error');
            console.error('Erro:', error);
        }
    });
}

async function carregarProdutos() {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos`);
        const produtos = await response.json();
        const listaProdutos = document.getElementById('listaProdutos');
        if (listaProdutos) {
            listaProdutos.innerHTML = '';
            produtos.forEach(produto => {
                const div = document.createElement('div');
                div.className = 'produto-item';
                div.innerHTML = `
                    <h4>${produto.nome}</h4>
                    <p>Descrição: ${produto.descricao}</p>
                    <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                    <p>Estoque: ${produto.quantidadeEstoque}</p>
                    <button onclick="editarProduto('${produto.id}')">Editar</button>
                    <button onclick="deletarProduto('${produto.id}')">Deletar</button>
                `;
                listaProdutos.appendChild(div);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

const formProduto = document.getElementById('formProduto');
if (formProduto) {
    formProduto.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nomeProduto').value;
        const descricao = document.getElementById('descricaoProduto').value;
        const preco = parseFloat(document.getElementById('precoProduto').value);
        const quantidadeEstoque = parseInt(document.getElementById('quantidadeProduto').value);

        const produtoData = {
            nome: nome,
            descricao: descricao,
            preco: preco,
            quantidadeEstoque: quantidadeEstoque
        };

        try {
            const response = await fetch(`${API_BASE_URL}/produtos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produtoData)
            });

            if (response.ok) {
                showMessage('mensagemProduto', 'Produto adicionado com sucesso!', 'success');
                formProduto.reset();
                carregarProdutos();
            } else {
                showMessage('mensagemProduto', 'Erro ao adicionar produto.', 'error');
            }
        } catch (error) {
            showMessage('mensagemProduto', 'Erro de conexão com o servidor.', 'error');
            console.error('Erro:', error);
        }
    });
}

async function deletarProduto(id) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showMessage('mensagemProduto', 'Produto deletado com sucesso!', 'success');
                carregarProdutos();
            } else {
                showMessage('mensagemProduto', 'Erro ao deletar produto.', 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}

async function carregarTarefas() {
    try {
        const response = await fetch(`${API_BASE_URL}/tarefas`);
        const tarefas = await response.json();
        const listaTarefas = document.getElementById('listaTarefas');
        if (listaTarefas) {
            listaTarefas.innerHTML = '';
            tarefas.forEach(tarefa => {
                const div = document.createElement('div');
                div.className = 'tarefa-item';
                div.innerHTML = `
                    <h4>${tarefa.titulo}</h4>
                    <p>Descrição: ${tarefa.descricao}</p>
                    <p>Vencimento: ${tarefa.dataVencimento}</p>
                    <p>Status: ${tarefa.status}</p>
                    <p>Responsável: ${tarefa.responsavel}</p>
                    <button onclick="editarTarefa('${tarefa.id}')">Editar</button>
                    <button onclick="deletarTarefa('${tarefa.id}')">Deletar</button>
                `;
                listaTarefas.appendChild(div);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
    }
}

const formTarefa = document.getElementById('formTarefa');
if (formTarefa) {
    formTarefa.addEventListener('submit', async (e) => {
        e.preventDefault();

        const titulo = document.getElementById('tituloTarefa').value;
        const descricao = document.getElementById('descricaoTarefa').value;
        const dataVencimento = document.getElementById('dataVencimentoTarefa').value;
        const status = document.getElementById('statusTarefa').value;
        const responsavel = document.getElementById('responsavelTarefa').value;

        const tarefaData = {
            titulo: titulo,
            descricao: descricao,
            dataVencimento: dataVencimento,
            status: status,
            responsavel: responsavel
        };

        try {
            const response = await fetch(`${API_BASE_URL}/tarefas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tarefaData)
            });

            if (response.ok) {
                showMessage('mensagemTarefa', 'Tarefa adicionada com sucesso!', 'success');
                formTarefa.reset();
                carregarTarefas();
            } else {
                showMessage('mensagemTarefa', 'Erro ao adicionar tarefa.', 'error');
            }
        } catch (error) {
            showMessage('mensagemTarefa', 'Erro de conexão com o servidor.', 'error');
            console.error('Erro:', error);
        }
    });
}

async function deletarTarefa(id) {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showMessage('mensagemTarefa', 'Tarefa deletada com sucesso!', 'success');
                carregarTarefas();
            } else {
                showMessage('mensagemTarefa', 'Erro ao deletar tarefa.', 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}

async function carregarMensagens() {
    try {
        const response = await fetch(`${API_BASE_URL}/mensagens`);
        const mensagens = await response.json();
        const listaChat = document.getElementById('listaChat');
        if (listaChat) {
            listaChat.innerHTML = '';
            mensagens.forEach(msg => {
                const div = document.createElement('div');
                div.className = `mensagem-item ${msg.lida ? 'lida' : 'nao-lida'}`;
                div.innerHTML = `
                    <p><strong>De:</strong> ${msg.remetente}</p>
                    <p><strong>Para:</strong> ${msg.destinatario}</p>
                    <p><strong>Mensagem:</strong> ${msg.conteudo}</p>
                    <p><strong>Data:</strong> ${msg.dataMensagem}</p>
                    <button onclick="deletarMensagem('${msg.id}')">Deletar</button>
                `;
                listaChat.appendChild(div);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
    }
}

const formChat = document.getElementById('formChat');
if (formChat) {
    formChat.addEventListener('submit', async (e) => {
        e.preventDefault();

        const remetente = document.getElementById('remetente').value;
        const destinatario = document.getElementById('destinatario').value;
        const conteudo = document.getElementById('conteudoMensagem').value;
        const dataMensagem = new Date().toLocaleString();

        const mensagemData = {
            remetente: remetente,
            destinatario: destinatario,
            conteudo: conteudo,
            dataMensagem: dataMensagem,
            lida: false
        };

        try {
            const response = await fetch(`${API_BASE_URL}/mensagens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mensagemData)
            });

            if (response.ok) {
                showMessage('mensagemChat', 'Mensagem enviada com sucesso!', 'success');
                formChat.reset();
                carregarMensagens();
            } else {
                showMessage('mensagemChat', 'Erro ao enviar mensagem.', 'error');
            }
        } catch (error) {
            showMessage('mensagemChat', 'Erro de conexão com o servidor.', 'error');
            console.error('Erro:', error);
        }
    });
}

async function deletarMensagem(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/mensagens/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showMessage('mensagemChat', 'Mensagem deletada com sucesso!', 'success');
            carregarMensagens();
        } else {
            showMessage('mensagemChat', 'Erro ao deletar mensagem.', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('listaProdutos')) {
        carregarProdutos();
    }
    if (document.getElementById('listaTarefas')) {
        carregarTarefas();
    }
    if (document.getElementById('listaChat')) {
        carregarMensagens();
    }
});
