<p align="center"><img src="https://testingcf.jsdelivr.net/gh/4444TENSEI/CDN/img/avatar/AngelDog/AngelDog-rounded.png" alt="Logo"
    width="200" height="200"/></p>
<h1 align="center">AlistUploaderJS</h1>
<h4 align="center">纯前端调用Alist API往多种云储存上传文件，需要自行部署Alist并至少添加一个在线储存。实现的功能包括：目录创建、多文件上传，不管你挂载了什么储存都能上传，例如webdav、各类云盘，推荐CDN在线引入，方便集成到小型个人项目。</h4>
<p align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-white?style=for-the-badge&logo=javascript&logoColor=blue" />
</p>    


</p>

<br/>

<hr/>

#  版本v0.1.1-使用示例(HTML):



- #### 只是调用上传的简易示例：https://github.com/4444TENSEI/AlistUploaderJS/tree/main/demo/sample.html

- #### 包含数据展示的完整示例：https://github.com/4444TENSEI/AlistUploaderJS/tree/main/demo/index.html

# ![](https://testingcf.jsdelivr.net/gh/4444TENSEI/CDN/img/server/readme/AlistUploaderJS/02.webp)

<hr/>

# 使用教程

## CDN引入

```html
<script src="https://testingcf.jsdelivr.net/gh/4444TENSEI/AlistUploaderJS@v0.1.1/npm/alist-uploader.js"></script>
```

## 放置上传按钮

```html
<input type="file" id="fileInput" multiple />
<button type="button" onclick="uploadFiles()">上传</button>
```

## 传递参数

```html
<script>
  // 配置Alist上传器
  const alistUploaderOptions = new AlistUploader({
    // [必须]你的Alist服务地址
    baseUrl: "https://alist.example.com",
    // [必须]Alist账号
    username: "admin",
    // [必须]Alist密码
    password: "123456",
    // [必须]上传到哪个目录，例如要传到"https://alist.example.com/webdav"，则照下方填写
    uploadRootFolder: "webdav",

    // [可选]上传并发数量, 默认值为 1。
    concurrency: 3,
    // [可选]为每次上传自动创建以时间命名(14位数字)的文件夹, 默认值为 false。
    createTimestampFolder: true,
    // [可选]控制台调试开关, 默认值为 false。
    debug: true,
    // [可选]版本号信息输出开关, 默认值为 true。
    showVersionInfo: true,
    // [可选]上传类型, 默认值为 "stream"也就是流式传输, 也可设置为"form"表单方式。
    uploadMethod: "stream",
  });

  // 上传按钮
  function uploadFiles() {
    const files = document.getElementById("fileInput").files;
    alistUploaderOptions.on("complete", (allSuccess) => {
      alert(allSuccess ? "所有文件上传完成！" : "部分文件上传失败。");
    });
    alistUploaderOptions.uploadFiles(files).catch((error) => {
      console.error("上传出错:", error);
    });
  }
</script>
```

