// 调用
/**返回的是两个key，name：浏览器内核的名称---version：浏览器的版本号*/
export interface Browser {
  version: number;
  name: string;
  [other: string]: any;
}

export function isBrowser() {
  //检测浏览器内核--返回的是两个key，name：浏览器内核的名称---version：浏览器的版本号

  const _browser: Browser = {
    version: 0,
    name: ""
  };
  const sUserAgent = navigator.userAgent;
  const isOpera = sUserAgent.indexOf("Opera") > -1;
  if (isOpera) {
    //首先检测Opera是否进行了伪装
    if (navigator.appName == "Opera") {
      //如果没有进行伪装，则直接后去版本号
      _browser.version = parseFloat(navigator.appVersion);
    } else {
      const reOperaVersion = new RegExp("Opera (\\d+.\\d+)");
      //使用正则表达式的test方法测试并将版本号保存在RegExp.$1中
      reOperaVersion.test(sUserAgent);
      _browser.version = parseFloat(RegExp["$1"]);
    }
    _browser.opera = true;
    _browser.name = "opera";
  }
  const isChrome = sUserAgent.indexOf("Chrome") > -1;
  if (isChrome) {
    const reChorme = new RegExp("Chrome/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?");
    reChorme.test(sUserAgent);
    _browser.version = parseFloat(RegExp["$1"]);
    _browser.chrome = true;
    _browser.name = "chrome";
  }
  //排除Chrome信息，因为在Chrome的user-agent字符串中会出现Konqueror/Safari的关键字
  const isKHTML =
    (sUserAgent.indexOf("KHTML") > -1 ||
      sUserAgent.indexOf("Konqueror") > -1 ||
      sUserAgent.indexOf("AppleWebKit") > -1) &&
    !isChrome;
  if (isKHTML) {
    //判断是否基于KHTML，如果时的话在继续判断属于何种KHTML浏览器
    const isSafari = sUserAgent.indexOf("AppleWebKit") > -1;
    const isKonq = sUserAgent.indexOf("Konqueror") > -1;
    if (isSafari) {
      const reAppleWebKit = new RegExp("Version/(\\d+(?:\\.\\d*)?)");
      reAppleWebKit.test(sUserAgent);
      // let fAppleWebKitVersion = parseFloat(RegExp["$1"]);
      _browser.version = parseFloat(RegExp["$1"]);
      _browser.safari = true;
      _browser.name = "safari";
    } else if (isKonq) {
      const reKong = new RegExp("Konqueror/(\\d+(?:\\.\\d+(?:\\.\\d)?)?)");
      reKong.test(sUserAgent);
      _browser.version = parseFloat(RegExp["$1"]);
      _browser.konqueror = true;
      _browser.name = "konqueror";
    }
  }
  // !isOpera 避免是由Opera伪装成的IE
  const isIE =
    sUserAgent.indexOf("compatible") > -1 &&
    sUserAgent.indexOf("MSIE") > -1 &&
    !isOpera;
  if (isIE) {
    const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(sUserAgent);
    _browser.version = parseFloat(RegExp["$1"]);
    _browser.msie = true;
    _browser.name = "msie";
  }

  const isIE11 = sUserAgent.indexOf("rv:11.0) like Gecko") > -1;
  if (isIE11) {
    _browser.version = 11;
    _browser.msie = true;
    _browser.name = "msie";
    return _browser;
  }

  const isEdge = sUserAgent.indexOf("Edge") > -1;

  if (isEdge) {
    const reEdge = new RegExp("Edge/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?");
    reEdge.test(sUserAgent);
    _browser.version = parseFloat(RegExp["$1"]);
    _browser.Edge = true;
    _browser.name = "Edge";
  }

  // 排除Chrome 及 Konqueror/Safari 的伪装
  const isMoz = sUserAgent.indexOf("Gecko") > -1 && !isChrome && !isKHTML;
  if (isMoz) {
    const reMoz = new RegExp("rv:(\\d+\\.\\d+(?:\\.\\d+)?)");
    reMoz.test(sUserAgent);
    _browser.version = parseFloat(RegExp["$1"]);
    _browser.mozilla = true;
    _browser.name = "mozilla";
  }
  console.log(_browser, "_browser");
  return _browser;
}
