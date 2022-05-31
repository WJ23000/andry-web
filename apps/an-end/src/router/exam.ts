/**
 * 考试管理
 */
import questionManage from "@/an-end/src/views/exam/question/Manage.vue";
import questionEdit from "@/an-end/src/views/exam/question/Edit.vue";
import paperManage from "@/an-end/src/views/exam/paper/Manage.vue";
import paperEdit from "@/an-end/src/views/exam/paper/Edit.vue";

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
