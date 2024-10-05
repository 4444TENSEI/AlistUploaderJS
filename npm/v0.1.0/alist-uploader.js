!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict";!function(t){function o(t,o,e,i,n=!1,a=!1){this.alistBaseUrl=t,this.username=o,this.password=e,this.uploadRootFolder=i,this.createTimestampFolder=n,this.debug=a}console.log("%cAlistUploader v0.1.0%c ","\n        color: white;\n        background: rgb(120,160,200);\n        padding: 6px;\n        border: 3px solid rgb(80,120,160);\n        border-radius: 6px;\n    ",""),o.prototype.login=async function(){const t=await fetch(`${this.alistBaseUrl}/api/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({Username:this.username,Password:this.password})}),o=await t.json();if(this.debug&&console.log("登录响应:",o),200!==o.code)throw new Error("登录出错: "+o.message);return o.data.token},o.prototype.listFolders=async function(t){const o=await fetch(`${this.alistBaseUrl}/api/fs/list`,{method:"GET",headers:{Authorization:t}});return(await o.json()).data},o.prototype.createFolder=async function(t){if(this.createTimestampFolder){const o=(new Date).toISOString().replace(/[-:.TZ]/g,"").substring(0,14),e=await fetch(`${this.alistBaseUrl}/api/fs/mkdir`,{method:"POST",headers:{Authorization:t,"Content-Type":"application/json"},body:JSON.stringify({path:`${this.uploadRootFolder}/${o}`})}),i=await e.json();if(this.debug&&console.log("为本次上传自动创建文件夹:",o),200!==i.code)throw new Error("本次上传自动创建文件夹出错: "+i.message);return`${this.uploadRootFolder}/${o}`}return this.uploadRootFolder},o.prototype.uploadFile=async function(t,o,e){this.debug&&console.log(`文件 "${e.name}" 开始上传`);const i=new FormData;i.append("file",e);const n=await fetch(`${this.alistBaseUrl}/api/fs/form`,{method:"PUT",headers:{Authorization:t,"file-path":`${o}/${encodeURIComponent(e.name)}`},body:i}),a=await n.json();if(this.debug&&console.log(`√上传成功, 上传至: "${o}/${e.name}"`),200!==a.code)throw new Error("上传出错: "+a.message)},o.prototype.uploadFiles=async function(t){const o=await this.login(),e=await this.createFolder(o);for(const i of t)await this.uploadFile(o,e,i);return e},t.uploadFilesToAlist=function(t,e,i,n,a,s,r){return new o(t,e,i,n,s,r).uploadFiles(a).then((t=>t))}}(window)}));
