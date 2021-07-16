"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.devRouter=void 0;var Apps=require("./apps"),SigninInfoRoutes=require("./signin-info"),Router=require("koa-router"),router=new Router;(exports.devRouter=router).get("/download/:appId",Apps.download),router.get("/signininfo",SigninInfoRoutes.getAll),router.post("/signininfo",SigninInfoRoutes.add),router.post("/sharing/rest/content/users/addItem",Apps.addItem),router.post("/sharing/rest/search",Apps.searchItem),router.get("/sharing/rest/search",Apps.searchItem),router.post("/sharing/rest/content/users/items/:id/update",Apps.updateAppItem),router.post("/sharing/rest/content/users/items/:id/data",Apps.getItemData),router.get("/sharing/rest/content/users/items/:id/data",Apps.getItemData),router.post("/sharing/rest/content/users/items/:id",Apps.items),router.post("/sharing/rest/content/users/items/:id/delete",Apps.removeItem),router.post("/sharing/rest/content/users/items/:id/addResources",Apps.addResources),router.post("/sharing/rest/content/users/items/:id/updateResources",Apps.updateResources),router.post("/sharing/rest/content/users/items/:id/removeResources",Apps.removeResources),router.post("/sharing/rest/content/users/items/:id/resources",Apps.resources),router.get("/sharing/rest/content/users/items/:id/resources",Apps.resources);