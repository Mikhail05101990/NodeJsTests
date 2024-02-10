const express = require("express");
const cors = require("cors");
const app = express();
const http = require('http');
const port = 9090;
const validator = require('../src/scripts/inputValidator.js');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.listen(port);

app.post("/api/registration", (req, res) => {
  if (Math.random() > 0.5) {
    res.statusCode = 400;

    setTimeout(() => {
      res.send({
        status: "error",
        message: "Bad request",
      });
    }, Math.random() * 1000);

    return;
  }

  setTimeout(() => {
    res.statusCode = 200;
    res.send({
      status: "success",
      message: "You are registered",
    });
  }, Math.random() * 1000);
});

app.post("/api/sendfeedback", (req, res) => {
  var json;
  let respObject = {};
  var data = '';
  let errsCount = 0;
  
  req.on('data', (chunk) => {
	  data += chunk;
  });
  
  req.on('end', () => {
	  console.log('received ' + JSON.stringify(data));
	  json = JSON.parse(data);

	  if(!validator.validateName(json.name)){
		errsCount++;
		let f = respObject.fields;
		let nameErr = {name: 'invalid'};
		const res = {...f, ...nameErr};
		respObject.fields = res;
	  }
	  
	  if(!validator.validateMail(json.mail))
	  {
		errsCount++;
		let f = respObject.fields;
		let mailErr = {mail: 'invalid'};
		const res = {...f, ...mailErr};
		respObject.fields = res;
	  }
	  
	  if(!validator.validatePhone(json.phone)){
		errsCount++;
		let f = respObject.fields;
		let phoneErr = {phone: 'invalid'};
		const res = {...f, ...phoneErr};
		respObject.fields = res;
	  }
	  if(!validator.validateComment(json.comment))
	  {
		errsCount++;
		let f = respObject.fields;
		let commentErr = {comment: 'invalid'};
		const res = {...f, ...commentErr};
		respObject.fields = res;
	  }

	  if(errsCount > 0){
		  respObject.status = 'error';
		  res.statusCode = 400;
		  res.send(respObject);
	  }  
	  else{
		  respObject = {
			  status: "success",
			  msg: "Ваша заявка успешно отправлена"
		  };
		  console.log(respObject);
		  res.statusCode = 201;
		  res.send(respObject);
	  }
  });
  
  
});

app.get("/api/ping", (req, res) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: "Server is ready",
    });
});