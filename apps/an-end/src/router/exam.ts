/**
 * 考试管理
 */
import questionManage from "@/an-end/src/views/home/Index.vue";
import questionEdit from "@/an-end/src/views/home/Index.vue";
import paperManage from "@/an-end/src/views/home/Index.vue";
import paperEdit from "@/an-end/src/views/home/Index.vue";

const examManageRouter = [
	{
		path: "/question/manage",
		name: "questionManage",
		component: questionManage
	},
	{
		path: "/paper/manage",
		name: "paperManage",
		component: paperManage
	}
];
const examEditRouter = [
	{
		path: "/question/edit",
		name: "questionEdit",
		component: questionEdit
	},
  {
		path: "/paper/edit",
		name: "paperEdit",
		component: paperEdit
	}
];

export { examManageRouter, examEditRouter };
