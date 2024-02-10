const apiUrl = "http://localhost:9090/api/sendfeedback";

exports.Send = async function(data){
	return fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		},
		body: JSON.stringify(data)
	})
   .then(response => response.json());
}