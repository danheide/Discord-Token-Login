function login(token) {
	setInterval(() => { document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.token = `"${token}"`;}, 50);
	setTimeout(() => {location.reload();}, 50);
}
chrome.runtime.onMessage.addListener(function (message) {
	if (message.message === 'login') {
		login(message.token);
	}
	else if (message.message === 'disablejs') {
		setTimeout(() => {location.reload();}, 50);
	}
	else if (message.message === 'gettoken') {
		chrome.storage.local.get(null, function(a) {
			let groups = a.Group
			let selected_group = groups.find((group) => a.Selected == group.name);
			selected_group.accounts.push({ name: 'Account', token: localStorage.getItem('token').replaceAll('"',''), lastlogin:null });
			chrome.storage.local.set({Group: groups});
			location.reload();
		});
	}
});
