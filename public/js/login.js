const urlBase = window.location.origin + '/api';

document.getElementById('formLogin').addEventListener('submit', function(event){

    event.preventDefault(); //evita o recarregamento padrão

    const msgModal = new bootstrap.Modal(document.getElementById('modalMensagem'));

    const login = document.getElementById('login').value;
    const senha = document.getElementById('password').value;

    const dadosLogin = {
        email: login,
        senha: senha
    }
    //efetuar post

 
    fetch(`${urlBase}/usuarios/login`,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dadosLogin)
    }).then(response => response.json())
    .then(data =>{
        console.log(data);
        if(data.access_token){
            //armazenar o toke no LocalStorage
            localStorage.setItem('token',data.access_token)
            window.location.href = 'filmes.html'
        }else if(data.errors){
            const errorMessages = data.errors.map(error => error.msg).join('<br>');

            document.getElementById('mensagem').innerHTML = `<span class='text-danger'>${errorMessages} </span>`

            msgModal.show(); 
        }
        
    })


})