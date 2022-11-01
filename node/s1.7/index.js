var http = require("http"),
	url = require("url"),
	server = http.createServer();

server.on('request', function (req, res) {
	console.log("--incoming request--", req.url);
	var incommingUrl = url.parse(req.url, true);
	console.log(incommingUrl);

	if (incommingUrl.path === '/hello') {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end("Hello World");
	} else if (incommingUrl.path === '/goodbye') {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end("Goodbye");
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end("Resource not found on this serve..");
	}

	
});

server.listen(7000);