import { getStorage, setStorage } from "./storage";
import Vue from "vue";

const STORAGE_CONFIG = {};

export default {
  toggleClass(string, tString) {
    var index,
      tLength = tString.length;
    if ((index = string.indexOf(tString)) > -1) {
      let front = this.trim(string.slice(0, index)),
        after = this.trim(string.slice(index + tLength));
      return this.trim(front + " " + after);
    } else {
      return this.trim(string) + " " + tString;
    }
  },
  addClass(string, tString) {
    var index;
    if ((index = string.indexOf(tString)) < 0) {
      return this.trim(string) + " " + tString;
    } else {
      return string;
    }
  },
  removeClass(string, tString) {
    var index,
      tLength = tString.length;
    if ((index = string.indexOf(tString)) > -1) {
      let front = this.trim(string.slice(0, index)),
        after = this.trim(string.slice(index + tLength));
      return this.trim(front + " " + after);
    } else {
      return string;
    }
  },
  trim(string) {
    return string.replace(/(^\s+)|(\s+$)/g, "");
  },
  getCountTime(data) {
    let time = data / 1000;
    let milliseconds = time % 60;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 360);

    return `${hours}:${minutes}:${milliseconds}`;
  },
  formatDate(fmt, date) {
    if (!date) return "";
    date = new Date(date);
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  },
  weekFormat(date) {
    let day = new Date(date).getDay();

    switch (day) {
      case 0:
        return "星期天";
      case 1:
        return "星期一";
      case 2:
        return "星期二";
      case 3:
        return "星期三";
      case 4:
        return "星期四";
      case 5:
        return "星期五";
      case 6:
        return "星期六";
    }
  },
  createObjectURL(blob) {
    return window[window.URL ? "URL" : "webkitURL"]["createObjectURL"](blob);
  },
  showBigI(root, event) {
    var src = event.toElement.getAttribute("src");
    if (src) {
      root.$store.commit("changeShowImgMask");
      root.$store.commit("changeImgObj", src);
    }
  },
  //右侧导航变换相关
  navChange({ x, o, a }, str) {
    let _this = this;
    for (let j = 0; j < a.length; j++) {
      if (str.indexOf(a[j].getAttribute("href")) > -1) {
        let dom = a[j].parentNode.parentNode;
        for (let i = 0; i < x.length; i++) {
          if (x[i].getAttribute("match-x") == dom.getAttribute("match-o")) {
            x[i].className = _this.addClass(x[i].className, "bc bg-g");
          } else {
            x[i].className = _this.removeClass(x[i].className, "bc bg-g");
          }
        }
        dom.className = _this.addClass(dom.className, "show");
        a[j].parentNode.className = this.addClass(
          a[j].parentNode.className,
          "bc"
        );
      } else {
        a[j].parentNode.className = this.removeClass(
          a[j].parentNode.className,
          "bc"
        );
      }
    }
  },
  //个人中心针对时间先后顺序处理数据，配合comment组件
  sortPersonalData(data, obj) {
    if (data.length > 0) {
      let newData = data.slice(0, 1);
      newData[0].comments = [data[0]];
      data.shift();
      // 遍历note数组，将日期相同的内容归类
      data.forEach(item => {
        let i = 0;
        newData.forEach(ware => {
          if (
            item.createTime.split(" ")[0] == ware.createTime.split(" ")[0] &&
            item.createTime.split(" ")[1] !== ware.createTime.split(" ")[1]
          ) {
            //比较创建日期是否相同
            ware.comments.push(JSON.parse(JSON.stringify(item))); //按时间最近来排序
            i = 1;
          }
        });
        if (i == 0) {
          newData.push({ createTime: item.createTime, comments: [item] });
        }
      });
      //请求中获取不到的数据要给一级comment数组里面的对象添加,通过JSON.stringify({key: value})形式
      if (obj) {
        newData.forEach(item => {
          item.comments.forEach(ware => {
            ware = Object.assign(ware, JSON.parse(obj));
          });
        });
      }
      return newData;
    }
    return [];
  },
  //统一处理url地址
  //ruleType 规则 我的实验 “test” 自主实验 “”
  urlJadge({
    labType,
    build_type,
    protocol,
    websshIp,
    port,
    host,
    subType,
    serverUrl = "",
    labId = "",
    name = "",
    pass = "",
    vms = [{}],
    ruleType = ""
  }) {
    let sshUrl, sshUrl1;
    // host = 'ai-priva.zj-huawei.com'; // 外网访问
    if (labType === "0") {
      let userInfo = getStorage("archUser");
      let paragram = `?name=${name || "hw" + userInfo.phone}&pass=${pass ||
        userInfo.phone}&labId=${labId}&userId=${
        userInfo.id
      }&serverUrl=${serverUrl}&authtoken=${userInfo.token.accessToken}`;
      if (build_type == "inner") {
        sshUrl =
          protocol +
          "//" +
          websshIp +
          ":" +
          port +
          "/ssh/host/" +
          host +
          paragram;
      } else if (build_type == "outer") {
        sshUrl =
          protocol +
          "//" +
          window.location.host.replace(/:\d*$/, "") +
          ":" +
          port +
          "/ssh/host/" +
          host +
          paragram;
      }
    }

    if (labType === "1") {
      if (build_type == "inner") {
        sshUrl1 = protocol + "//" + host + ":" + port;
        sshUrl = protocol + "//" + host + ":" + port;
      } else if (build_type == "outer") {
        sshUrl1 = protocol + "//" + Vue.$bigDateConfig.JUPYTER_URL + ":" + port;
        sshUrl = protocol + "//" + Vue.$bigDateConfig.JUPYTER_URL + ":" + port;
      }
    }

    if (labType === "2") {
      if (build_type == "inner") {
        if (/http/.test(host)) {
          sshUrl = host;
        } else {
          sshUrl = protocol + "//" + host + ":" + port;
        }
      } else if (build_type == "outer") {
        if (/http/.test(host)) {
          sshUrl = host;
        } else {
          sshUrl =
            protocol + "//" + Vue.$bigDateConfig.JUPYTER_URL + ":" + port;
        }
      }
    }

    if (labType === "3") {
      let userInfo = getStorage("userInfo");
      let paragram = `?name=${vms[0].user}&pass=${
        vms[0].password
      }&labId=${labId}&userId=${
        userInfo.userId
      }&serverUrl=${serverUrl}&authtoken=${getStorage("token")}`;
      if (build_type == "inner") {
        sshUrl =
          protocol +
          "//" +
          websshIp +
          ":" +
          port +
          "/ssh/host/" +
          vms[0].hostIp +
          paragram;
      } else if (build_type == "outer") {
        sshUrl =
          protocol +
          "//" +
          window.location.host.replace(/:\d*$/, "") +
          ":" +
          port +
          "/ssh/host/" +
          vms[0].hostIp +
          paragram;
      }
    }

    function getUrl(subType) {
      switch (subType) {
        case "1":
          return "default-python2.ipynb";
        case "2":
          return "default-python3.ipynb";
        case "3":
          return "default-R.ipynb";
      }
    }

    return { sshUrl, sshUrl1, labType, host };
  },
  //getReportInfo，获取实验报告具体信息接口请求及处理函数
  setBackUrl() {
    setStorage("willBeBackUrl", window.location.hash);
  },
  getBackUrl() {
    return getStorage("willBeBackUrl").split("#")[1];
  },
  xssTra(str) {
    str = str.replace(/&amp;lt;|&lt;/g, "<");
    str = str.replace(/&amp;gt;|&gt;/g, ">");
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&apos;/g, "'");

    return str;
  },
  hasLabPermission(labType) {
    const permission = getStorage(STORAGE_CONFIG.LOGIN_USER).labPerList;
    return permission.findIndex(type => labType == type) > -1;
  },
  //- 1 -> A 2 -> B 3 -> C
  optionLabel(code) {
    const codeNumber = typeof code == "number" ? code : Number(code);
    return String.fromCharCode(65 + codeNumber);
  },
  // ict 删除字符串标记
  delHtmlTag(str) {
    if (typeof str == "string") {
      return str.replace(/<[^>]+>/g, "");
    } else {
      return "";
    }
  }
  // ict numberToChar
};
