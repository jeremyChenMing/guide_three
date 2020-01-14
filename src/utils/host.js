const url = window.location.href;
let host = '';
if (url.indexOf('develop' >= 0)) {
	host = 'http://gateway.develop.chuangkepark.com';
} else {
	host = 'http://gateway.develop.chuangkepark.com';
}

export default host;
