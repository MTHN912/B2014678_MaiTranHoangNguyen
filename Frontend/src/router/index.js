import { createWebHistory, createRouter } from "vue-router";
// import account from "@/views/account/AccountRegister.vue";
// import projectadmin from "@/views/ProjectAdmin.vue";

const routes = [


    //////////////___NGƯỜI DÙNG___////////////////////
    {
        path: "/user/user",
        name: "user",
        component: () => import("@/views/user/user.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },


    {
        path: "/user/user/brand/:id",
        name: "filter",
        props: true,
        component: () => import("@/views/product/ProductFilter.vue")
    },
    ///////////////////_____QUẢN LÍ NGƯỜI DÙNG_______//////////////////////////
    {
        path: "/accounts/",
        name: "account",
        component: () => import("@/views/account/Nguoidung.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/accounts/add",
        name: "account.add",
        component: () => import("@/views/account/ThemNguoidung.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/accounts/:id",
        name: "account.edit",
        component: () => import("@/views/account/SuaNguoidung.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },


    {
        path: "/accounts/register",
        name: "account.register",
        component: () => import("@/views/account/DangkiNguoidung.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/",
        name: "account.login",
        component: () => import("@/views/account/Dangnhap.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },


    ////////////////////______SẢN PHẨM_____///////////////////////////
    {
        path: "/product/",
        name: "product",
        component: () => import("@/views/product/Product.vue"),
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/products/:id",
        name: "product.edit",
        component: () => import("@/views/product/ProductEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/products/add",
        name: "product.add",
        component: () => import("@/views/product/ProductAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    /////////////////////////_____DANH MỤC_______///////////////////////////////
    {
        path: "/brands/",
        name: "brand",
        component: () => import("@/views/brand/Danhmuc.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/brands/add",
        name: "brand.add",
        component: () => import("@/views/brand/ThemDanhmuc.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/brands/:id",
        name: "brand.edit",
        component: () => import("@/views/brand/SuaDanhmuc.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;