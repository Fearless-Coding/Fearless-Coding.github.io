import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/demo/": [
        "",
        {
            text: "案例",
            icon: "laptop-code",
            children: "structure",
        },
        "slides",
    ],
    "/guide/": [
        "",
        {
            text: "文档",
            icon: "book",
            children: "structure",
        },
        "slides",
    ],
    "/data/": [
        {
            text: "消息队列",
            icon: "laptop-code",
            prefix: "消息队列/",
            children: "structure",
        },
        {
            text: "Java",
            icon: "laptop-code",
            prefix: "Java/",
            children: "structure",
        },
        {
            text: "J2EE",
            icon: "laptop-code",
            prefix: "J2EE/",
            children: "structure",
        },
        {
            text: "Web框架",
            icon: "laptop-code",
            prefix: "Web框架/",
            children: "structure",
        },
        {
            text: "数据库",
            icon: "laptop-code",
            prefix: "数据库/",
            children: "structure",
        },
        {
            text: "自我修养",
            icon: "laptop-code",
            prefix: "自我修养/",
            children: "structure",
        },
        {
            text: "容器服务",
            icon: "laptop-code",
            prefix: "容器服务/",
            children: "structure",
        },
        {
            text: "开发工具",
            icon: "laptop-code",
            prefix: "开发工具/",
            children: "structure",
        },
        {
            text: "Java工具类",
            icon: "laptop-code",
            prefix: "Java工具类/",
            children: "structure",
        },
        {
            text: "前端框架",
            icon: "laptop-code",
            prefix: "前端框架/",
            children: "structure",
        },
        {
            text: "系统架构",
            icon: "laptop-code",
            prefix: "系统架构/",
            children: "structure",
        }
    ],
    // "/data/J2EE": [
    //     {
    //         text: "导航总览",
    //         icon: "signs-post",
    //         children: "structure",
    //     }
    // ],
    "/menu/": [
        {
            text: "导航总览",
            icon: "signs-post",
            link: "README"
        }
    ]
});
