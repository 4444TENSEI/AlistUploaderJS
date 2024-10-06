<p align="center"><img src="https://testingcf.jsdelivr.net/gh/4444TENSEI/CDN/img/avatar/AngelDog/AngelDog-rounded.png" alt="Logo"
    width="200" height="200"/></p>
<h1 align="center">AlistUploaderJS</h1>
<h3 align="center">纯前端调用Alist API往多种云储存上传文件，包括目录创建、多文件上传，不管挂载了什么类型的储存都能直接上传，例如webdav，方便集成到个人项目。</h3>
<p align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-white?style=for-the-badge&logo=javascript&logoColor=blue" />
</p>    


</p>

<br/>

<hr/>

# 使用示例(HTML): https://github.com/4444TENSEI/AlistUploaderJS/tree/main/demo/index.html

# ![](https://testingcf.jsdelivr.net/gh/4444TENSEI/CDN/img/server/readme/AlistUploaderJS/01.webp)

<hr/>

# 使用教程

## CDN引入

```html
<script src="https://testingcf.jsdelivr.net/gh/4444TENSEI/AlistUploaderJS/npm/v0.1.0/alist-uploader.js"></script>
```

## 放置表单

```html
<form id="uploadForm">
    <input type="file" id="fileInput" name="file" multiple required />
</form>
```

## 传递参数

```html
<script>
    // 自己的Alist服务域名
    const alistBaseUrl = "https://alist.example.com";
    // Alist账号
    const username = "admin";
    // Alist密码
    const password = "123456";
    // 上传到哪个目录，例如要传到"https://alist.example.com/webdav"，则照下方填写
    const uploadRootFolder = "webdav/";
    // 开启后，每次上传文件将自动在uploadRootFolder目录下新建文件夹，以14位数时间数字命名
    const createTimestampFolder = true;
    // 开启后可以在控制台看见上传状态(是否开启Debug模式)
    const debug = true;

    document.addEventListener("DOMContentLoaded", function () {
        const fileInput = document.getElementById("fileInput");
        // 监听文件是否上传，自动上传
        fileInput.addEventListener("change", async function () {
            const files = fileInput.files;
            if (files.length === 0) {
                alert("请选择文件！");
                return;
            }
            try {
                await uploadFilesToAlist(
                    alistBaseUrl,
                    username,
                    password,
                    uploadRootFolder,
                    files,
                    debug,
                    createTimestampFolder
                );
                alert("所有文件上传成功！");
            } catch (error) {
                alert("文件上传失败: " + error.message);
            }
        });
    });
</script>
```

<hr/>
