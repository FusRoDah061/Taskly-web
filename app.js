let app = require('./config/server');

let port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log('Servidor rodando com express na porta', port);
});
