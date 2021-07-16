"use strict";var __awaiter=this&&this.__awaiter||function(e,i,a,c){return new(a=a||Promise)(function(r,t){function o(e){try{s(c.next(e))}catch(e){t(e)}}function n(e){try{s(c.throw(e))}catch(e){t(e)}}function s(e){var t;e.done?r(e.value):((t=e.value)instanceof a?t:new a(function(e){e(t)})).then(o,n)}s((c=c.apply(e,i||[])).next())})},__generator=this&&this.__generator||function(r,o){var n,s,i,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,s&&(i=2&t[0]?s.return:t[0]?s.throw||((i=s.return)&&i.call(s),0):s.next)&&!(i=i.call(s,t[1])).done)return i;switch(s=0,i&&(t=[2&t[0],i.value]),t[0]){case 0:case 1:i=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,s=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(!(i=0<(i=a.trys).length&&i[i.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!i||t[1]>i[0]&&t[1]<i[3])){a.label=t[1];break}if(6===t[0]&&a.label<i[1]){a.label=i[1],i=t;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(t);break}i[2]&&a.ops.pop(),a.trys.pop();continue}t=o.call(r,a)}catch(e){t=[6,e],s=0}finally{n=i=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}};Object.defineProperty(exports,"__esModule",{value:!0});var Koa=require("koa"),compress=require("koa-compress"),http=require("http"),https=require("https"),fs=require("fs"),path=require("path"),_commander=require("commander"),common_1=require("./middlewares/common"),dev_1=require("./middlewares/dev"),static_server_1=require("./middlewares/static-server");process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";var isDevEdition,mountPath,port,httpsPort,app=new Koa,commander=_commander;commander.version("0.0.1").option("--disable_gzip","Disable gzip").option("--disable_file_cache","Disable file cache in server").option("-p, --port <port>","Http port").option("--https_port <port>","Https port").option("--path <path>","Mount path").option("-h, --host_env <hostEnv>","Host env").option("-d, --dev_edition","Is Dev Edition").option("--http_only","Disable https").option("-c, --cert_folder <folder>","Folder that stores the certificate").option("--host_static_file","Host static files").parse(process.argv),global.commander=commander,init(),app.use(handleProtocol).use(supportCORS),commander.disable_gzip||app.use(compress({filter:function(e){return/(text)|(application\/javascript)|(application\/json)/i.test(e)},threshold:2048,gzip:{flush:require("zlib").constants.Z_SYNC_FLUSH},deflate:{flush:require("zlib").constants.Z_SYNC_FLUSH},br:!1})),app.use(common_1.bodyParser).use(common_1.commonRouter.routes()).use(common_1.commonRouter.allowedMethods()),isDevEdition?(app.use(dev_1.devRouter.routes()).use(dev_1.devRouter.allowedMethods()),static_server_1.getStaticServeMiddleWares().forEach(function(e){app.use(e)})):commander.host_static_file&&static_server_1.getStaticServeMiddleWares().forEach(function(e){app.use(e)}),app.on("error",function(e,t){console.log("server error",e.message)});var certFolder,httpsServer,httpServer=http.createServer(app.callback()).listen(port,function(){console.log("Http server running on port",port)});function init(){var e=commander.host_env||process.env.EXB_HOST_ENV;global.hostEnv=e||"prod",isDevEdition=commander.dev_edition,commander.dev_edition||(e=JSON.parse(fs.readFileSync(__dirname+"/setting.json","utf8")),isDevEdition=e.isDevEdition),global.isDevEdition=isDevEdition,(mountPath=commander.path||process.env.EXB_MOUNT_PATH)?/\/$/.test(mountPath)||(mountPath+="/"):mountPath="/",global.mountPath=mountPath;port=commander.port||process.env.EXB_HTTP_PORT||3e3,httpsPort=commander.https_port||process.env.EXB_HTTPS_PORT||3001}function handleConnectError(e){e&&e.on("connection",function(t){t.on("error",function(e){t.destroy()})})}function handleProtocol(t,r){var o;return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return commander.http_only?[4,r()]:[3,2];case 1:return e.sent(),[2];case 2:return"http"!==t.protocol?[3,3]:(t.URL.protocol="https",t.URL.port=httpsPort+"",null!==(o=null==t?void 0:t.URL)&&void 0!==o&&o.toString()&&t.redirect(null===(o=null==t?void 0:t.URL)||void 0===o?void 0:o.toString()),[3,5]);case 3:return[4,r()];case 4:e.sent(),e.label=5;case 5:return[2]}})})}function supportCORS(t,r){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return t.res.setHeader("Access-Control-Allow-Origin","*"),t.res.setHeader("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, HEAD, OPTIONS"),t.res.setHeader("Access-Control-Allow-Headers","Content-Type"),t.res.setHeader("Referrer-Policy","no-referrer-when-downgrade"),[4,r()];case 1:return e.sent(),[2]}})})}handleConnectError(httpServer),commander.http_only||(certFolder=commander.cert_folder||path.join(__dirname,"../cert"),fs.existsSync(certFolder)||(console.error("Certificate folder does not exist."),process.exit(0)),fs.existsSync(path.join(certFolder,"server.key"))&&fs.existsSync(path.join(certFolder,"server.cert"))||(console.error("Does not find certificate."),process.exit(0)),handleConnectError(httpsServer=https.createServer({key:fs.readFileSync(path.join(certFolder,"server.key"),"utf8"),cert:fs.readFileSync(path.join(certFolder,"server.cert"),"utf8")},app.callback()).listen(httpsPort,function(){return console.log("Https server running on port",httpsPort)})));