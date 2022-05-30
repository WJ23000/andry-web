/**
 * 订单管理
 */
import orderManage from "@/an-end/src/views/home/Index.vue";
import orderEdit from "@/an-end/src/views/home/Index.vue";

const orderManageRouter = [
	{
		path: "/order/manage",
		name: "orderManage",
		component: orderManage
	}
];
const orderEditRouter = [
	{
		path: "/order/edit",
		name: "orderEdit",
		component: orderEdit
	}
];

export { orderManageRouter, orderEditRouter };
