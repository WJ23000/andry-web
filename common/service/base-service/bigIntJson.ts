export default class BigIntJsonService {
	static parse(jsonStr) {
		/** 
      明确后端不会出现数组中嵌套数组的数据结构
      例如[1111111112222222,[11111111122222222]]不能存在
      只能匹配key:number与key:[number]场景(其他场景不允许匹配特别是用户的自定义输入内容)
      "key":1111111111111
      "key":[11111111,222222222]
    */
		let str = jsonStr.replace(
			/("[^"\s\\]+")\s*:\s*(\d{15,})\s*(,?)/g,
			`$1:"$2"$3`
		);

		str = str.replace(/("[^"\s]+")\s*:\s*(\[[^\\]+])\s*(,?)/g, function(
			string
		) {
			let str = string;
			str = str.replace(/,\s*(\d{15,})\s*]/g, `,"$1"]`);
			str = str.replace(/\[\s*(\d{15,})\s*,/g, `["$1",`);
			str = str.replace(/\[\s*(\d{15,})\s*]/g, `["$1"]`);
			str = str.replace(/,\s*(\d{15,})\s*/g, `,"$1"`); // 不使用环视 兼容ios
			return str;
		});

		str = str.replace(/("[^"\s]+")\s*:\s*("\{.*\}")\s*(,?)/g, function(string) {
			let str = string;
			str = str.replace(
				/(\\"[^"\s]+")\s*:\s*(\d{15,})\s*(,?)/g,
				`$1:\\"$2\\"$3`
			);
			return str;
		});

		return JSON.parse(str);
	}
}
