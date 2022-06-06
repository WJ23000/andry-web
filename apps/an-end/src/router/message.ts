/**
 * 消息中心
 */
import messageManage from "@/an-end/src/views/message/Manage.vue";
import messageSetting from "@/an-end/src/views/message/Setting.vue";

const messageRouter = [
	{
		path: "/message/manage",
		name: "messageManage",
		component: messageManage
	},
	{
		path: "/message/setting",
		name: "messageSetting",
		component: messageSetting
	}
];

export { messageRouter };
