const urlBase = window.location.origin + '/api';

document.getElementById('formCadastro').addEventListener('submit', function(event){

    event.preventDefault(); //evita o recarregamento padrão

    const msgModal = new bootstrap.Modal(document.getElementById('modalMensagem'));

    const login = document.getElementById('login').value;
    const senha = document.getElementById('password').value;
    const nome = document.getElementById('name').value;

    const dadosLogin = {
        nome: nome,
        email: login,
        senha: senha
    }
    //efetuar post
    fetch(`${urlBase}/usuarios/`,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dadosLogin)
    }).then(response => response.json())
    .then(data =>{
        if(!data.errors){

            window.location.href = 'index.html'
        }else if(data.errors){
            const errorMessages = data.errors.map(error => error.msg).join('<br>');

            document.getElementById('mensagem').innerHTML = `<span class='text-danger'>${errorMessages} </span>`

            msgModal.show(); 
        }
        
    })


})