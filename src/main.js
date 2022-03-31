console.log($ === jQuery);
let $siteList = $('.siteList');
let $last = $('.siteList').children('.last');
let hashMap = [];
const hashMapOrigin = [
	{ siteName: '必应', url: 'https://cn.bing.com', logoType: 'img',
	logo: '<img src="./images/bing-logo.jpg" alt="bing">', link: 'cn.bing.com'},
	{ siteName: 'BILIBILI', url: 'https://www.bilibili.com', logoType: 'img',
	logo: '<img src="./images/bilibili-logo.jpg" alt="bilibili">', link: 'bilibili.com'},
	{ siteName: 'MDN文档', url: 'https://developer.mozilla.org/zh-CN/docs/Web', logoType: 'img',
	logo: '<img src="./images/MDN-logo.jpg" alt="MDN">', link: 'developer.mozilla.org'},
	{ siteName: '知乎', url: 'https://zhihu.com', logoType: 'img',
	logo: '<img src="./images/zhihu-logo.jpg" alt="zhihu">', link: 'zhihu.com'}
];

// 判断页面关闭或刷新时，localStorage存储网页数据
const setStorage = (data) => {
	let str = JSON.stringify(data);
	console.log('页面将缓存');
	console.log(str);
	window.localStorage.setItem('data', str);
}

// 读取缓存数据，如没有则赋予初始值
if(!window.localStorage.getItem('data')) {
	console.log('no storage');
	hashMap = hashMapOrigin;
	setStorage(hashMapOrigin);
} else {
	console.log('get storage');
	hashMap = JSON.parse(window.localStorage.getItem('data'));
	console.log(hashMap);
}

// 根据存储的网站信息重建页面
const render = () => {
	console.log('重建页面');
	$siteList.children('li:not(.last)').remove();
	hashMap.forEach((node) => {
	let $li = $(`<li class="site">
	<div class="btn">
		<button class="delete"><span class="iconfont icon-close1"></button>
		<button class="rename"><span class="iconfont icon-more"></button>
		<button class="reorder"><span class="iconfont icon-trangle"></span></button>
	</div>
	<a href="${node.url}">
	<div class="siteName">${node.siteName}</div>
	<div class="logo">${node.logoType==='img'? node.logo:node.logo[0].toUpperCase()}</div>
	<div class="link">${node.link}</div>
	</a>
	</li>`).insertBefore($last);
	});
}
// 先执行一次页面加载
render();
// 页面刷新或关闭时，缓存数据
window.onbeforeunload = setStorage(hashMap);

// 做一个过滤简化输入网址函数
const simplify = (url) => {
	if(typeof url === 'string') {
		return url.replace('https://', '').replace('http://', '').replace('www.', '')
		.replace('HTTPS://', '').replace('HTTP://', '').replace('WWW.', '')
		.replace(/\/.*/, '');
	} else {
		return undefined;
	}
}

// 扩展定义几个按钮的函数
$.extend ({
	// 自定义网站名称按钮
	renameSite: function() {
		$('.rename')
		.on('click', function() {
			console.log($(this));
			let name = window.prompt('请问您希望重命名该网站的名称是？请输入');
			if(!!name) {
				console.log('rename');
				let index = $(this).parent().parent().index();
				console.log(index);
				hashMap[index].siteName = name;
				setStorage(hashMap);
				$(this).parent().parent().children('a').children('.siteName').text(name);
			}
		});
	},
// 删除网页按钮
	delSite: function() {
		$('.delete')
		.on('click', function() {
			console.log($(this));
			let flag = window.confirm('您确定要删除该网站吗？');
			if(!!flag) {
				console.log('delSite');
				let index = $(this).parent().parent().index();
				console.log(index);
				hashMap.splice(index, 1);
				setStorage(hashMap);
				$(this).parent().parent().remove();
			}
		});
	},
	//用户自行改变顺序
	reorder: function() {
		$('.reorder')
		.on('click', function() {
			let input = window.prompt('请输入您需要改变该网站的序号，数字1~99');
			let matchInp = (!input) ? null : (input.match(/\b\d{1,2}\b/g));
			if(!!matchInp && (input-1) < hashMap.length) {
				let index = $(this).parent().parent().index();
				input -= 1;   // 注意序号-1
				if(input < index) {
					hashMap.splice(input, 0, hashMap[index]);
					hashMap.splice(index+1, 1);
				} else {
					console.log('>');
					hashMap.splice(input+1, 0, hashMap[index]);
					hashMap.splice(index, 1);
				}
				setStorage(hashMap);
				render();
				$.delSite();
				$.renameSite();
				$.reorder();
			}
		});
	}
});
// 执行一下按钮点击函数
$.delSite();
$.renameSite();
$.reorder();
// 点击添加按钮，存入新的网站
$('.addButton')
.on('click', () => {
	let newInput = window.prompt('请问您需要添加的网址是？请在下方输入');
	let newSimp = simplify(newInput);
	console.log(newSimp);
	if(!!newSimp) {
		let newUrl = newInput;
		if(newUrl.indexOf('http') !== 0) {
			newUrl = 'https://' + newUrl;
		}
		hashMap.push({
			siteName: newSimp, url: newUrl, logoType: 'text',
			logo: newSimp[0].toUpperCase(), link: newSimp
		});
		render();
		setStorage(hashMap);
		$.delSite();
		$.renameSite();
		$.reorder();
	} else {console.log('空页面');}
});

/*
$('.addButton')
.on('click', () => {
	let newInput = window.prompt('请问您需要添加的网址是？请复制下');
	let newUrl = newInput;
	if(newUrl.indexOf('http') !== 0) {
		newUrl = 'https://' + newUrl;
	}
	console.log(newInput, newUrl);
	let $siteList = $('.siteList');
	let $last = $('.last');
	let $li = $(`<li class="site">
	<a href="${newUrl}">
	<div class="siteName">${newInput}</div>
	<div class="logo">${newInput[0].toUpperCase()}</div>
	<div class="link">${newInput}</div>
	</a>
	</li>`).insertBefore($last);
})
*/
// 快捷键敲首字母快速定位打开相应网站
function listenKey() {
	$(document).on('keypress', (e) => {
	let key = e.key;
	console.log(key);
	for(let i=0; i<hashMap.length; i++) {
		if(hashMap[i].link[0].toLowerCase() === key) {
			window.open(hashMap[i].url)
		}
	}
	});
}
listenKey();
// 输入框内打字会冲突怎么办，很简单删除监听器即可,blur了再添加
$('.searchForm>input').on('focus', (e) => {
	console.log('focus');
	$(document).off('keypress');
});
$('.searchForm>input').on('blur', (e) => {
	console.log('blur');
	listenKey();
});


