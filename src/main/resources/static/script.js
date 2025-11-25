
async function carregarProdutos() {
  try {
    const res = await fetch('http://localhost:8080/api/produtos');
    if (!res.ok) {
      console.error('Erro HTTP ao buscar produtos:', res.status, res.statusText);
      const texto = await res.text();
      console.log('Resposta do servidor (texto):', texto);
      const listaErro = document.getElementById('listaProdutos');
      if (listaErro) listaErro.innerHTML = '<p>Erro ao carregar produtos.</p>';
      return;
    }

    const dados = await res.json();
    console.log('dados recebidos:', dados);

    if (!Array.isArray(dados)) {
      console.error('Resposta não é um array:', dados);
      const listaErro = document.getElementById('listaProdutos');
      if (listaErro) listaErro.innerHTML = '<p>Resposta inválida do servidor.</p>';
      return;
    }

    const lista = document.getElementById('listaProdutos');
    if (lista) lista.innerHTML = '';
    if (dados.length === 0) {
      if (lista) lista.innerHTML = '<p>Sem produtos cadastrados.</p>';
    } else {
      dados.forEach(p => {
        const item = document.createElement('div');
        item.className = 'item-estoque';
        const info = document.createElement('div');
        info.className = 'produto-info';
        info.innerHTML = `<strong>${p.nome}</strong><br>${p.descricao}<br>R$ ${p.preco} — Qtd: ${p.quantidade}`;
        item.appendChild(info);
        const btns = document.createElement('div');
        // You can add edit/delete buttons here in future
        item.appendChild(btns);
        if (lista) lista.appendChild(item);
      });
    }
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
    const listaErro = document.getElementById('listaProdutos');
    if (listaErro) listaErro.innerHTML = '<p>Erro ao carregar produtos.</p>';
  }
}

async function cadastrarProduto(produto) {
  try {
    const res = await fetch('http://localhost:8080/api/produtos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(produto)
    });
    if (!res.ok) {
      console.error('Erro ao cadastrar produto:', res.status, await res.text());
      const msg = document.getElementById('mensagemProduto');
      if (msg) msg.textContent = 'Erro ao cadastrar produto.';
      return;
    }
    const criado = await res.json();
    console.log('Produto criado:', criado);
    const msg = document.getElementById('mensagemProduto');
    if (msg) {
      msg.textContent = 'Produto cadastrado com sucesso!';
      setTimeout(()=> msg.textContent='', 3000);
    }
    carregarProdutos();
  } catch (err) {
    console.error('Erro no POST:', err);
    const msg = document.getElementById('mensagemProduto');
    if (msg) msg.textContent = 'Erro ao cadastrar produto.';
  }
}

// Attach form handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formProduto');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nomeProduto').value.trim();
      const descricao = document.getElementById('descricaoProduto').value.trim();
      const preco = parseFloat(document.getElementById('precoProduto').value) || 0;
      const quantidade = parseInt(document.getElementById('quantidadeProduto').value) || 0;

      if (!nome) {
        const msg = document.getElementById('mensagemProduto');
        if (msg) { msg.textContent = 'Nome é obrigatório.'; setTimeout(()=> msg.textContent='',3000); }
        return;
      }

      const produto = { nome, descricao, preco, quantidade };
      cadastrarProduto(produto);

      form.reset();
    });
  }

  // initial load
  carregarProdutos();
});


// Afazeres (tarefas)
async function carregarTarefas() {
  try {
    const res = await fetch('http://localhost:8080/api/afazeres');
    if (!res.ok) {
      console.error('Erro HTTP ao buscar afazeres:', res.status, res.statusText);
      const texto = await res.text();
      console.log('Resposta do servidor (texto):', texto);
      const listaErro = document.getElementById('listaTarefas');
      if (listaErro) listaErro.innerHTML = '<p>Erro ao carregar afazeres.</p>';
      return;
    }
    const dados = await res.json();
    console.log('afazeres recebidos:', dados);
    if (!Array.isArray(dados)) {
      console.error('Resposta não é um array:', dados);
      const listaErro = document.getElementById('listaTarefas');
      if (listaErro) listaErro.innerHTML = '<p>Resposta inválida do servidor.</p>';
      return;
    }
    const lista = document.getElementById('listaTarefas');
    if (lista) lista.innerHTML = '';
    if (dados.length === 0) {
      if (lista) lista.innerHTML = '<p>Sem afazeres cadastrados.</p>';
    } else {
      dados.forEach(t => {
        const item = document.createElement('div');
        item.className = 'item-tarefa';
        const info = document.createElement('div');
        info.className = 'tarefa-info';
        info.innerHTML = `<strong>${t.titulo}</strong><br>${t.descricao}<br>Venc.: ${t.dataVencimento} — Status: ${t.status} — Resp.: ${t.responsavel}`;
        item.appendChild(info);
        if (lista) lista.appendChild(item);
      });
    }
  } catch (err) {
    console.error('Erro ao carregar afazeres:', err);
    const listaErro = document.getElementById('listaTarefas');
    if (listaErro) listaErro.innerHTML = '<p>Erro ao carregar afazeres.</p>';
  }
}

async function cadastrarTarefa(tarefa) {
  try {
    const res = await fetch('http://localhost:8080/api/afazeres', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(tarefa)
    });
    if (!res.ok) {
      console.error('Erro ao cadastrar tarefa:', res.status, await res.text());
      const msg = document.getElementById('mensagemTarefa');
      if (msg) msg.textContent = 'Erro ao cadastrar tarefa.';
      return;
    }
    const criado = await res.json();
    console.log('Tarefa criada:', criado);
    const msg = document.getElementById('mensagemTarefa');
    if (msg) {
      msg.textContent = 'Tarefa cadastrada com sucesso!';
      setTimeout(()=> msg.textContent='', 3000);
    }
    carregarTarefas();
  } catch (err) {
    console.error('Erro no POST tarefa:', err);
    const msg = document.getElementById('mensagemTarefa');
    if (msg) msg.textContent = 'Erro ao cadastrar tarefa.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formTarefa');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const titulo = document.getElementById('tituloTarefa').value.trim();
      const descricao = document.getElementById('descricaoTarefa').value.trim();
      const dataVencimento = document.getElementById('dataVencimentoTarefa').value;
      const status = document.getElementById('statusTarefa').value;
      const responsavel = document.getElementById('responsavelTarefa').value.trim();

      if (!titulo) {
        const msg = document.getElementById('mensagemTarefa');
        if (msg) { msg.textContent = 'Título é obrigatório.'; setTimeout(()=> msg.textContent='',3000); }
        return;
      }

      const tarefa = { titulo, descricao, dataVencimento, status, responsavel };
      cadastrarTarefa(tarefa);
      form.reset();
    });
  }
});

// Autenticação: cadastro e login
async function cadastrarUsuario(usuario) {
  try {
    const res = await fetch('http://localhost:8080/api/usuarios', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(usuario)
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error('Erro ao cadastrar usuário:', res.status, txt);
      const msg = document.getElementById('mensagemCadastro');
      if (msg) msg.textContent = 'Erro ao cadastrar: ' + (txt || res.status);
      return;
    }
    const json = await res.json();
    console.log('Usuário cadastrado:', json);
    const msg = document.getElementById('mensagemCadastro');
    if (msg) { msg.textContent = 'Cadastro realizado com sucesso!'; setTimeout(()=> msg.textContent='',3000); }
    // opcional: redirecionar para login
    window.location.href = 'login.html';
  } catch (err) {
    console.error('Erro no cadastro:', err);
    const msg = document.getElementById('mensagemCadastro');
    if (msg) msg.textContent = 'Erro ao cadastrar usuário.';
  }
}

async function loginUsuario(credentials) {
  try {
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error('Erro no login:', res.status, txt);
      const msg = document.getElementById('mensagemLogin');
      if (msg) msg.textContent = 'Credenciais inválidas.';
      return;
    }
    const json = await res.json();
    console.log('Login success:', json);
    // Simples: armazenar username no sessionStorage e redirecionar
    sessionStorage.setItem('usuario', json.username);
    console.log('Redirecionando para inicio...'); window.location.href = 'inicio.html';
  } catch (err) {
    console.error('Erro no login:', err);
    const msg = document.getElementById('mensagemLogin');
    if (msg) msg.textContent = 'Erro ao fazer login.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // cadastro.html form
  const formCad = document.getElementById('formCadastro');
  if (formCad) {
    formCad.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('usernameCadastro').value.trim();
      const senha = document.getElementById('senhaCadastro').value;
      if (!username || !senha) {
        const msg = document.getElementById('mensagemCadastro');
        if (msg) { msg.textContent = 'Preencha username e senha.'; setTimeout(()=> msg.textContent='',3000); }
        return;
      }
      cadastrarUsuario({ username, senha });
    });
  }

  // login.html form
  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('usernameLogin').value.trim();
      const senha = document.getElementById('senhaLogin').value;
      if (!username || !senha) {
        const msg = document.getElementById('mensagemLogin');
        if (msg) { msg.textContent = 'Preencha username e senha.'; setTimeout(()=> msg.textContent='',3000); }
        return;
      }
      loginUsuario({ username, senha });
    });
  }
});


// Compatibility handlers for alternative form IDs/field names
document.addEventListener('DOMContentLoaded', () => {
  // If existing handlers didn't attach because of different IDs, attach compatibility handlers.
  // Cadastro compatibility: form id 'cadastroForm' with fields 'nome' and 'senha', message id 'message'
  const cadastroForm = document.getElementById('cadastroForm');
  if (cadastroForm) {
    cadastroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cpf = document.getElementById('cpfCnpj') ? document.getElementById('cpfCnpj').value.trim() : '';
      const usernamePrefer = document.getElementById('usernameCadastro') ? document.getElementById('usernameCadastro').value.trim() : '';
      const nomePrefer = document.getElementById('nome') ? document.getElementById('nome').value.trim() : '';
      const username = cpf || usernamePrefer || nomePrefer || '';
      const senha = document.getElementById('senha') ? document.getElementById('senha').value : (document.getElementById('senhaCadastro') ? document.getElementById('senhaCadastro').value : '');
      const msgEl = document.getElementById('mensagemCadastro') || document.getElementById('message');
      if (!username || !senha) {
        if (msgEl) { msgEl.textContent = 'Preencha username (CPF/CNPJ) e senha.'; setTimeout(()=> msgEl.textContent='',3000); }
        return;
      }
      // send cpfCnpj as username to backend
      cadastrarUsuario({ username, senha });
    });
  }

  // Login compatibility: form id 'loginForm' with cpfCnpj and senha, message id 'message'
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('usernameLogin') ? document.getElementById('usernameLogin').value.trim() : (document.getElementById('cpfCnpj') ? document.getElementById('cpfCnpj').value.trim() : '');
      const senha = document.getElementById('senhaLogin') ? document.getElementById('senhaLogin').value : (document.getElementById('senha') ? document.getElementById('senha').value : '');
      const msgEl = document.getElementById('mensagemLogin') || document.getElementById('message');
      if (!username || !senha) {
        if (msgEl) { msgEl.textContent = 'Preencha username e senha.'; setTimeout(()=> msgEl.textContent='',3000); }
        return;
      }
      loginUsuario({ username, senha });
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('cpfCnpj') ? document.getElementById('cpfCnpj').value.trim() : '';
      const senha = document.getElementById('senha') ? document.getElementById('senha').value : '';
      const msgEl = document.getElementById('message');
      if (!username || !senha) {
        if (msgEl) { msgEl.textContent = 'Preencha os dados.'; setTimeout(()=> msgEl.textContent='',3000); }
        return;
      }
      loginUsuario({ username, senha });
    });
  }
});