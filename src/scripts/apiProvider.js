const apiUrl = "http://localhost:9090/api/sendfeedback";

exports.Send = function(data){
	fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		},
		body: JSON.stringify(data)
	})
   .then(response => response.json())
   .then((response) => {
	   console.log('from api: ' + JSON.stringify(response));
	   
	   return response;
   });

}