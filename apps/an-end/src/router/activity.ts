/**
 * 活动管理
 */
 import activityManage from "@/an-end/src/views/home/Index.vue";
 import activityEdit from "@/an-end/src/views/home/Index.vue";
 
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
 