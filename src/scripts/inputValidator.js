exports.validateName = function(name) 
{
  if(name == '' || name == null)
	  return false;
  
  if(name.length < 1 || isNumber(name.charAt(0)))
	  return false;
  else
	  return true;
}

exports.validateMail = function(mail) 
{
	if(mail == '' || mail == null)
		return false;
	 
	let dogNum = mail.match(/[@]/g) ?? 0;
	
	if(mail.length < 3 || mail.charAt(0) === '@' || mail.charAt(mail.length-1) === '@' || dogNum.length !== 1 )
		return false;
	else
		return true;
}

exports.validatePhone = function(phone) 
{
	if(phone == '' || phone == null)
	  return false;
  
  if(phone.length < 17 )
	  return false;
  else
	  return true;
}

exports.validateComment = function(message){
	if(message == '' || message == null)
	  return false;
  
	if(message.length > 2)
		return true;
	else
		return false;
}

function isNumber(n) { 
	return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
}