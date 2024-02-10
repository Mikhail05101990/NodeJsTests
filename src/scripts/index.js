import "../styles/style.scss";
import IMASK from 'imask';

const validator = require('../scripts/inputValidator.js');
const provider = require('../scripts/apiProvider.js');

function getFeedbackView()
{
	const el = document.createElement('form');
	el.setAttribute('class', 'input-block');
	el.setAttribute('method', 'post');
	el.setAttribute('action', 'http://localhost:9090/api/sendfeedback');
	BuildHeader(el);
	BuildNameBlock(el);
	BuildMailBlock(el);
	BuildPhoneBlock(el);
	BuildCommentBlock(el);
	BuildSubmitBtn(el);

	return el;
}

document.body.appendChild(getFeedbackView());
document.querySelector('#nameId').addEventListener('change', NameChangeHandler);
document.querySelector('#mailId').addEventListener('change', MailChangeHandler);
let phoneInput = document.querySelector("#phoneId");
const phoneMask = new IMASK(phoneInput, {
  mask: "+{375}(00)000-00-00",
});
document.querySelector('#phoneId').addEventListener('change', PhoneChangeHandler);
document.querySelector('textarea').addEventListener('change', CommentChangeHandler);
document.querySelector('button').addEventListener('click', showModal);
document.querySelector('[type="submit"]').addEventListener('click', submitFeedback);

function BuildHeader(el)
{
	let container = document.createElement('div');
	let header = document.createElement('h3');
	header.setAttribute('class', 'view-header');
	header.innerHTML = 'Your feedback';
	container.appendChild(header);
	let btn = document.createElement('button');
	btn.setAttribute('class', 'corner-btn');
	btn.innerText = 'Info';
	container.appendChild(btn);
	el.appendChild(container);
}

function BuildNameBlock(el)
{
	let lbl = document.createElement('label');
	lbl.innerHTML = 'Your name';
	el.appendChild(lbl);
	let inp = document.createElement('input');
	inp.setAttribute('class', 'param-value');
	inp.setAttribute('id', 'nameId');
	inp.setAttribute('type', 'text');
	el.appendChild(inp);
	let warn = document.createElement('label');
	warn.setAttribute('class', 'warning');
	warn.setAttribute('id', 'warnName');
	el.appendChild(warn);
}

function BuildMailBlock(el)
{
	let lbl = document.createElement('label');
	lbl.innerHTML = 'Mail';
	el.appendChild(lbl);
	let inp = document.createElement('input');
	inp.setAttribute('class', 'param-value');
	inp.setAttribute('id', 'mailId');
	inp.setAttribute('type', 'mail');
	el.appendChild(inp);
	let warn = document.createElement('label');
	warn.setAttribute('class', 'warning');
	warn.setAttribute('id', 'warnMail');
	el.appendChild(warn);
}

function BuildPhoneBlock(el)
{
	let lbl = document.createElement('label');
	lbl.innerHTML = 'Phone';
	el.appendChild(lbl);
	let inp = document.createElement('input');
	inp.setAttribute('class', 'param-value');
	inp.setAttribute('id', 'phoneId');
	inp.setAttribute('type', 'text');
	el.appendChild(inp);
	let warn = document.createElement('label');
	warn.setAttribute('class', 'warning');
	warn.setAttribute('id', 'warnPhone');
	el.appendChild(warn);
}

function BuildCommentBlock(el)
{
	let comment = document.createElement('textarea');
	comment.setAttribute('class', 'comment');
	comment.placeholder='Live your feedback here';
	el.appendChild(comment);
	let warn = document.createElement('label');
	warn.setAttribute('class', 'warning');
	warn.setAttribute('id', 'warnComment');
	el.appendChild(warn);
}

function BuildSubmitBtn(el)
{
	let btn = document.createElement('input');
	btn.setAttribute('type', 'submit');
	el.appendChild(btn);
}

function NameChangeHandler(e)
{
	document.querySelector('#nameId').value = e.target.value;
	
	if(validator.validateName(e.target.value))
		document.querySelector('#warnName').innerText = '';
	else
		document.querySelector('#warnName').innerText = 'Invalid value';
}

function MailChangeHandler(e){
	document.querySelector('#mailId').value = e.target.value;
	
	if(validator.validateMail(e.target.value))
		document.querySelector('#warnMail').innerText = '';
	else
		document.querySelector('#warnMail').innerText = 'Invalid value';
}

function PhoneChangeHandler(e){
	document.querySelector('#phoneId').value = e.target.value;
	
	if(phoneMask.masked.isComplete)
		document.querySelector('#warnPhone').innerText = '';
	else
		document.querySelector('#warnPhone').innerText = 'Invalid value';
}

function CommentChangeHandler(e){
	document.querySelector('textarea').value = e.target.value;
	
	if(validator.validateComment(e.target.value))
		document.querySelector('#warnComment').innerText = '';
	else
		document.querySelector('#warnComment').innerText = 'Too short. Please, be more expressive.';
}

function showModal(e){
	e.preventDefault();
	alert('');
}

function submitFeedback(e){
	e.preventDefault();
	let name = document.querySelector('#nameId');
	let mail = document.querySelector('#mailId');
	let phone = document.querySelector("#phoneId");
	let comment = document.querySelector('textarea');
	let params = {
		"name": name.value,
		"mail": mail.value,
		"phone": phone.value,
		"comment": comment.value
	};

	var json = provider.Send(params);
	
	console.log('passed: ' + JSON.stringify(json));
	
	if(json.status === 'success'){
		name.value = '';
		mail.value = '';
		phone.value = '';
		comment.value = '';
	}	
}