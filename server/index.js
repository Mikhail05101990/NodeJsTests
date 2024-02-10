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
  let respObject;
  var data = '';
  let fields = [];
  
  req.on('data', (chunk) => {
	  data += chunk;
  });
  
  req.on('end', () => {
	  console.log('received ' + JSON.stringify(data));
	  json = JSON.parse(data);
	  
	  if(!validator.validateName(json.name)){
		 fields.push('name');
	  }
	  if(!validator.validateMail(json.mail))
	  {
		 fields.push('mail');
	  }
	  if(!validator.validatePhone(json.phone)){
		fields.push('phone');
	  }
	  if(!validator.validateComment(json.comment))
	  {
		fields.push('comment');
	  }

	  if(fields.length > 0){
		  respObject = {
			  status: 'error',
			  fields: fields
		  };
		  console.log(respObject);
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