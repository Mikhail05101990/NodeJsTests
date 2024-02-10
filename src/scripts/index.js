import "../styles/style.scss";
import IMASK from 'imask';
import i18next from 'i18next';

const validator = require('../scripts/inputValidator.js');
const modal = require('../scripts/modal.js');
const provider = require('../scripts/apiProvider.js');
const i18n = i18next;
i18n.init({
  lng: "ru",
  fallbackLng: 'en',
  resources: {
	en: {
	  translation: {
		yourName: 'Name',
		mail: 'E-mail',
		phone: 'Mobile',
		comment: 'Message',
		leaveFeedback: 'Live your feedback here',
		developedBy: 'Developed by Mikhail Paulovich',
		feedbackPage: 'Feebacks',
		orderCall: 'Call me',
		yes: 'Yes',
		no: 'No',
		areYouSure: 'Are you ready to discuss your impression by phone call?'
	  },
	},
	ru: {
	  translation: {
		yourName: 'Имя',
		mail: 'E-mail',
		phone: 'Телефон',
		comment: 'Сообщение',
		leaveFeedback: 'Опишите ваши впечатления',
		developedBy: 'Разработал Павлович Михаил',
		feedbackPage: 'Отзывы',
		orderCall: 'Позвоните мне',
		areYouSure: 'Вы готовы обсудить впечатления по телефону?',
		yes: 'Да',
		no: 'Нет'
	  },
	},
  },
});

function getFeedbackView()
{
	const el = document.createElement('form');
	el.setAttribute('class', 'input-block');
	el.setAttribute('method', 'post');
	el.setAttribute('action', 'http://localhost:9090/api/sendfeedback');
	buildHeader(el);
	buildNameBlock(el);
	buildMailBlock(el);
	buildPhoneBlock(el);
	buildCommentBlock(el);
	buildSubmitBtn(el);
	buildFooter(el);
	
	return el;
}

document.body.appendChild(getFeedbackView());
registerListeners();

function buildHeader(el)
{
	let container = document.createElement('div');
	let header = document.createElement('h3');
	header.setAttribute('class', 'view-header');
	header.innerHTML = i18n.t('feedbackPage');
	container.appendChild(header);
	let btn = document.createElement('button');
	btn.setAttribute('class', 'corner-btn');
	btn.innerText = i18n.t('orderCall');
	container.appendChild(btn);
	el.appendChild(container);
}

function buildNameBlock(el)
{
	let lbl = document.createElement('label');
	lbl.innerHTML = i18n.t('yourName');
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

function buildMailBlock(el)
{
	let lbl = document.createElement('label');
	lbl.innerHTML = i18n.t('mail');
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

function buildPhoneBlock(el)
{
	let lbl = document.createElement('label');
	lbl.innerHTML = i18n.t('phone');
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

function buildCommentBlock(el)
{
	let comment = document.createElement('textarea');
	comment.setAttribute('class', 'comment');
	comment.placeholder=i18n.t('leaveFeedback');
	el.appendChild(comment);
	let warn = document.createElement('label');
	warn.setAttribute('class', 'warning');
	warn.setAttribute('id', 'warnComment');
	el.appendChild(warn);
}

function buildSubmitBtn(el)
{
	let btn = document.createElement('input');
	btn.setAttribute('type', 'submit');
	el.appendChild(btn);
	let msg = document.createElement('label');
	msg.setAttribute('class', 'message');
	msg.setAttribute('id', 'msg');
	el.appendChild(msg);
}

function buildFooter(el){
	let spn = document.createElement('span');
	spn.setAttribute('class', 'input-block');
	spn.innerText = i18n.t('developedBy');
	el.appendChild(spn);
}

function nameChangeHandler(e)
{
	document.querySelector('#nameId').value = e.target.value;
	
	if(validator.validateName(e.target.value))
		document.querySelector('#warnName').innerText = '';
	else
		document.querySelector('#warnName').innerText = 'Invalid value';
}

function mailChangeHandler(e){
	document.querySelector('#mailId').value = e.target.value;
	
	if(validator.validateMail(e.target.value))
		document.querySelector('#warnMail').innerText = '';
	else
		document.querySelector('#warnMail').innerText = 'Invalid value';
}

function phoneChangeHandler(e){
	document.querySelector('#phoneId').value = e.target.value;
	
	if(phoneMask.masked.isComplete)
		document.querySelector('#warnPhone').innerText = '';
	else
		document.querySelector('#warnPhone').innerText = 'Invalid value';
}

function commentChangeHandler(e){
	document.querySelector('textarea').value = e.target.value;
	
	if(validator.validateComment(e.target.value))
		document.querySelector('#warnComment').innerText = '';
	else
		document.querySelector('#warnComment').innerText = 'Too short. Please, be more expressive.';
}

function showModal(e){
	e.preventDefault();
	let question = i18n.t('areYouSure');
	let yes = i18n.t('yes');
	let no = i18n.t('no');
	modal.Show(question, yes, no);
}



async function submitFeedback(e){
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
	const json = await provider.Send(params);
	let mes = document.querySelector('#msg');
	
	if(json.status === 'success'){
		name.value = '';
		mail.value = '';
		phone.value = '';
		comment.value = '';
		
		mes.innerHTML = json.msg;
	}else{
		let str = '';
		
		for (const key in json.fields) {
			if(key)
				str += `${key}: ${json.fields[key]}; `;
		}
		
		mes.innerHTML = str;
	}
}

function registerListeners(){
	document.querySelector('#nameId').addEventListener('change', nameChangeHandler);
	document.querySelector('#mailId').addEventListener('change', mailChangeHandler);
	let phoneInput = document.querySelector("#phoneId");
	const phoneMask = new IMASK(phoneInput, {
	  mask: "+{375}(00)000-00-00",
	});
	document.querySelector('#phoneId').addEventListener('change', phoneChangeHandler);
	document.querySelector('textarea').addEventListener('change', commentChangeHandler);
	document.querySelector('button').addEventListener('click', showModal);
	document.querySelector('[type="submit"]').addEventListener('click', submitFeedback);
}