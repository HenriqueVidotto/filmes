use('test')
db.usuarios.insertOne({
    'nome': 'Henrique Vidotto',
    'email': 'henrique@teste.com',
    'senha':'teste123',
    'ativo':true,
    'tipo':'Cliente',
    'avatar': 'https://ui-avatars.com/api?name=Henrique&background=F00&color=FFF'
})

db.usuarios.createIndex({'email':1},{unique:true})

db.usuarios.find({},{senha:0})
