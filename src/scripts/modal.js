const apiUrl = "http://localhost:9090/api/sendfeedback";

exports.Show = function(){
	const Y = window.scrollY;
	const X = window.scrollX;
	const modal = document.createElement('div');
	modal.setAttribute('class', 'modal grow');
	let child = document.createElement('div');
	child.setAttribute('class', 'input-block');
	let text = document.createElement('span');
	text.innerHTML = 'Would you mind a call to clear your proposals?';
	text.setAttribute('class', 'modal-text');
	child.appendChild(text);
	let leftBtn = document.createElement('button');
	leftBtn.innerText = 'Yes';
	leftBtn.setAttribute('id', 'modalYes');
	child.appendChild(leftBtn);
	let rightBtn = document.createElement('button');
	rightBtn.innerText = 'No';
	rightBtn.setAttribute('id', 'modalNo');
	child.appendChild(rightBtn);
	modal.appendChild(child);
	document.body.appendChild(modal);
	window.onscroll = () => window.scroll(X, Y);
	registerModalListeners();
}

exports.Remove = function(){
	removeModal();
}

function registerModalListeners(){
	document.querySelector('#modalYes').addEventListener('click', removeModal);
	document.querySelector('#modalNo').addEventListener('click', removeModal);
}

function removeModal(){
	const modal = document.querySelector('.modal');
  
	if (modal) {
		modal.remove();
		window.onscroll = () => window.scroll(window.scrollX, window.scrollY);
	}
}