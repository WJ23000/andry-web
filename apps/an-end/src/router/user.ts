/**
 * 访问控制
 */
 import adminManage from "@/an-end/src/views/user/admin/Manage.vue";
 import classManage from "@/an-end/src/views/user/class/Manage.vue";
 import roleManage from "@/an-end/src/views/user/role/Manage.vue";
 import memberManage from "@/an-end/src/views/user/member/Manage.vue";
 
 const userManageRouter = [
   {
     path: "/user/admin-manage",
     name: "adminManage",
     component: adminManage
   },
   {
     path: "/user/class-manage",
     name: "classManage",
     component: classManage
   },
   {
     path: "/user/role-manage",
     name: "roleManage",
     component: roleManage
   },
   {
     path: "/user/member-manage",
     name: "memberManage",
     component: memberManage
   }
 ];
 

 
 export { userManageRouter };
 