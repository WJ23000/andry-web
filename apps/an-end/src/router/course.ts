/**
 * 课程管理
 */
 import courseManage from "@/an-end/src/views/course/Manage.vue";
 import courseEdit from "@/an-end/src/views/course/Edit.vue";
 
 const courseManageRouter = [
   {
     path: "/course/manage",
     name: "courseManage",
     component: courseManage
   }
 ];
 const courseEditRouter = [
   {
     path: "/course/edit",
     name: "courseEdit",
     component: courseEdit
   }
 ];
 
 export { courseManageRouter, courseEditRouter };
 