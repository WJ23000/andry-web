const flashChecker = function flashChecker() {
  let hasFlash = 0; //是否安装了flash
  let flashVersion = 0; //flash版本
  let isValid = 0; //是否过期

  //IE浏览器
  if ("ActiveXObject" in window) {
    try {
      const swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      hasFlash = 1;
      isValid = 1;
      const VSwf = swf.GetVariable("$version");
      flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
    } catch (e) {
      console.log(e)
    }
    //非IE浏览器
  } else {
    try {
      if (navigator.plugins && navigator.plugins.length > 0) {
        const swf = navigator.plugins["Shockwave Flash"];
        if (swf) {
          hasFlash = 1;
          isValid = 1;
          const words = swf.description.split(" ");
          for (let i = 0; i < words.length; ++i) {
            if (isNaN(parseInt(words[i]))) continue;
            flashVersion = parseInt(words[i]);
          }
          if (swf.filename && swf.filename == "internal-not-yet-present") {
            //过期
            isValid = 0;
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  return { flash: hasFlash, version: flashVersion, vaild: isValid };
};

export { flashChecker };
