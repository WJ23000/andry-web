/**
 * 访问控制
 */
 import adminManage from "@/an-end/src/views/access-control/admin/Manage.vue";
 import classManage from "@/an-end/src/views/access-control/class/Manage.vue";
 import roleManage from "@/an-end/src/views/access-control/role/Manage.vue";
 import studentManage from "@/an-end/src/views/access-control/student/Manage.vue";
 
 const accessControlRouter = [
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
     path: "/user/student-manage",
     name: "studentManage",
     component: studentManage
   }
 ];
 

 
 export { accessControlRouter };
 