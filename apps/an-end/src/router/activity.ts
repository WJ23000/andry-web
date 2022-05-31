/**
 * 活动管理
 */
 import activityManage from "@/an-end/src/views/activity/Manage.vue";
 import activityEdit from "@/an-end/src/views/activity/Edit.vue";
 
 const activityManageRouter = [
   {
     path: "/activity/manage",
     name: "activityManage",
     component: activityManage
   }
 ];
 const activityEditRouter = [
   {
     path: "/activity/edit",
     name: "activityEdit",
     component: activityEdit
   }
 ];
 
 export { activityManageRouter, activityEditRouter };
 