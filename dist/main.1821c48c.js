// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
console.log($ === jQuery);
var $siteList = $('.siteList');
var $last = $('.siteList').children('.last');
var hashMap = [];
var hashMapOrigin = [{
  siteName: '必应',
  url: 'https://cn.bing.com',
  logoType: 'img',
  logo: '<img src="./bing-logo.69b9f03c.jpg" alt="bing">',
  link: 'cn.bing.com'
}, {
  siteName: 'BILIBILI',
  url: 'https://www.bilibili.com',
  logoType: 'img',
  logo: '<img src="./bilibili-logo.5b52e9d9.jpg" alt="bilibili">',
  link: 'bilibili.com'
}, {
  siteName: 'MDN文档',
  url: 'https://developer.mozilla.org/zh-CN/docs/Web',
  logoType: 'img',
  logo: '<img src="./MDN-logo.fa9fd9c5.jpg" alt="MDN">',
  link: 'developer.mozilla.org'
}, {
  siteName: '知乎',
  url: 'https://zhihu.com',
  logoType: 'img',
  logo: '<img src="./zhihu-logo.74ac7a42.jpg" alt="zhihu">',
  link: 'zhihu.com'
}]; // 判断页面关闭或刷新时，localStorage存储网页数据

var setStorage = function setStorage(data) {
  var str = JSON.stringify(data);
  console.log('页面将缓存');
  console.log(str);
  window.localStorage.setItem('data', str);
}; // 读取缓存数据，如没有则赋予初始值


if (!window.localStorage.getItem('data')) {
  console.log('no storage');
  hashMap = hashMapOrigin;
  setStorage(hashMapOrigin);
} else {
  console.log('get storage');
  hashMap = JSON.parse(window.localStorage.getItem('data'));
  console.log(hashMap);
} // 根据存储的网站信息重建页面


var render = function render() {
  console.log('重建页面');
  $siteList.children('li:not(.last)').remove();
  hashMap.forEach(function (node) {
    var $li = $("<li class=\"site\">\n\t<div class=\"btn\">\n\t\t<button class=\"delete\"><span class=\"iconfont icon-close1\"></button>\n\t\t<button class=\"rename\"><span class=\"iconfont icon-more\"></button>\n\t\t<button class=\"reorder\"><span class=\"iconfont icon-trangle\"></span></button>\n\t</div>\n\t<a href=\"".concat(node.url, "\">\n\t<div class=\"siteName\">").concat(node.siteName, "</div>\n\t<div class=\"logo\">").concat(node.logoType === 'img' ? node.logo : node.logo[0].toUpperCase(), "</div>\n\t<div class=\"link\">").concat(node.link, "</div>\n\t</a>\n\t</li>")).insertBefore($last);
  });
}; // 先执行一次页面加载


render(); // 页面刷新或关闭时，缓存数据

window.onbeforeunload = setStorage(hashMap); // 做一个过滤简化输入网址函数

var simplify = function simplify(url) {
  if (typeof url === 'string') {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace('HTTPS://', '').replace('HTTP://', '').replace('WWW.', '').replace(/\/.*/, '');
  } else {
    return undefined;
  }
}; // 扩展定义几个按钮的函数


$.extend({
  // 自定义网站名称按钮
  renameSite: function renameSite() {
    $('.rename').on('click', function () {
      console.log($(this));
      var name = window.prompt('请问您希望重命名该网站的名称是？请输入');

      if (!!name) {
        console.log('rename');
        var index = $(this).parent().parent().index();
        console.log(index);
        hashMap[index].siteName = name;
        setStorage(hashMap);
        $(this).parent().parent().children('a').children('.siteName').text(name);
      }
    });
  },
  // 删除网页按钮
  delSite: function delSite() {
    $('.delete').on('click', function () {
      console.log($(this));
      var flag = window.confirm('您确定要删除该网站吗？');

      if (!!flag) {
        console.log('delSite');
        var index = $(this).parent().parent().index();
        console.log(index);
        hashMap.splice(index, 1);
        setStorage(hashMap);
        $(this).parent().parent().remove();
      }
    });
  },
  //用户自行改变顺序
  reorder: function reorder() {
    $('.reorder').on('click', function () {
      var input = window.prompt('请输入您需要改变该网站的序号，数字1~99');
      var matchInp = !input ? null : input.match(/\b\d{1,2}\b/g);

      if (!!matchInp && input - 1 < hashMap.length) {
        var index = $(this).parent().parent().index();
        input -= 1; // 注意序号-1

        if (input < index) {
          hashMap.splice(input, 0, hashMap[index]);
          hashMap.splice(index + 1, 1);
        } else {
          console.log('>');
          hashMap.splice(input + 1, 0, hashMap[index]);
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
}); // 执行一下按钮点击函数

$.delSite();
$.renameSite();
$.reorder(); // 点击添加按钮，存入新的网站

$('.addButton').on('click', function () {
  var newInput = window.prompt('请问您需要添加的网址是？请在下方输入');
  var newSimp = simplify(newInput);
  console.log(newSimp);

  if (!!newSimp) {
    var newUrl = newInput;

    if (newUrl.indexOf('http') !== 0) {
      newUrl = 'https://' + newUrl;
    }

    hashMap.push({
      siteName: newSimp,
      url: newUrl,
      logoType: 'text',
      logo: newSimp[0].toUpperCase(),
      link: newSimp
    });
    render();
    setStorage(hashMap);
    $.delSite();
    $.renameSite();
    $.reorder();
  } else {
    console.log('空页面');
  }
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
  $(document).on('keypress', function (e) {
    var key = e.key;
    console.log(key);

    for (var i = 0; i < hashMap.length; i++) {
      if (hashMap[i].link[0].toLowerCase() === key) {
        window.open(hashMap[i].url);
      }
    }
  });
}

listenKey(); // 输入框内打字会冲突怎么办，很简单删除监听器即可,blur了再添加

$('.searchForm>input').on('focus', function (e) {
  console.log('focus');
  $(document).off('keypress');
});
$('.searchForm>input').on('blur', function (e) {
  console.log('blur');
  listenKey();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.1821c48c.js.map