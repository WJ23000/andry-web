/**
 * 素材管理
 */
 import materialManage from "@/an-end/src/views/home/Index.vue";
 import materialEdit from "@/an-end/src/views/home/Index.vue";
 
 const materialManageRouter = [
   {
     path: "/material/manage",
     name: "materialManage",
     component: materialManage
   }
 ];
 const materialEditRouter = [
   {
     path: "/material/edit",
     name: "materialEdit",
     component: materialEdit
   }
 ];
 
 export { materialManageRouter, materialEditRouter };
 