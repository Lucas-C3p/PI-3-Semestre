const API_BASE_URL = 'http://localhost:8080/api/auth';

// Função para exibir mensagens de status
function showMessage(elementId, text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

// Função para limpar o CPF/CNPJ (remover pontos, traços e barras)
function cleanCpfCnpj(value) {
    return value.replace(/[.\-/]/g, '');
}

// Lógica para o formulário de Cadastro
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
            const response = await fetch(`${API_BASE_URL}/register`, {
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

// Lógica para o formulário de Login
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
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                // Em um projeto real, você salvaria o token de autenticação aqui
                showMessage('message', 'Login bem-sucedido! Redirecionando...', 'success');
                // Simulação de redirecionamento para a tela principal
                setTimeout(() => {
                    alert('Redirecionando para a tela principal do sistema!');
                    // window.location.href = 'dashboard.html'; // Descomente para redirecionar
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
