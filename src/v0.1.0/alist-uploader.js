(function (global) {
    function AlistUploader(alistBaseUrl, username, password, uploadRootFolder, createTimestampFolder = false, debug = false) {
        this.alistBaseUrl = alistBaseUrl;
        this.username = username;
        this.password = password;
        this.uploadRootFolder = uploadRootFolder;
        this.createTimestampFolder = createTimestampFolder;
        this.debug = debug;
    }

    console.log('%cAlistUploaderJS v0.1.0%c ', `
        color: white;
        background: rgb(120,160,200);
        padding: 6px;
        border: 3px solid rgb(80,120,160);
        border-radius: 6px;
    `, '');

    AlistUploader.prototype.login = async function () {
        const response = await fetch(`${this.alistBaseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Username: this.username, Password: this.password }),
        });
        const data = await response.json();
        if (this.debug) {
            console.log("登录响应:", data);
        }
        if (data.code !== 200) {
            throw new Error("登录出错: " + data.message);
        }
        return data.data.token;
    };

    AlistUploader.prototype.listFolders = async function (token) {
        const response = await fetch(`${this.alistBaseUrl}/api/fs/list`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        });
        const data = await response.json();
        return data.data;
    };

    AlistUploader.prototype.createFolder = async function (token) {
        if (this.createTimestampFolder) {
            const folderName = new Date()
                .toISOString()
                .replace(/[-:.TZ]/g, "")
                .substring(0, 14);
            const response = await fetch(`${this.alistBaseUrl}/api/fs/mkdir`, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path: `${this.uploadRootFolder}/${folderName}` }),
            });
            const data = await response.json();
            if (this.debug) {
                console.log("为本次上传自动创建文件夹:", folderName);
            }
            if (data.code !== 200) {
                throw new Error("本次上传自动创建文件夹出错: " + data.message);
            }
            return `${this.uploadRootFolder}/${folderName}`;
        } else {
            return this.uploadRootFolder;
        }
    };

    AlistUploader.prototype.uploadFile = async function (token, folderPath, file) {
        if (this.debug) {
            console.log(`文件 "${file.name}" 开始上传`);
        }
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${this.alistBaseUrl}/api/fs/form`, {
            method: "PUT",
            headers: {
                Authorization: token,
                "file-path": `${folderPath}/${encodeURIComponent(file.name)}`,
            },
            body: formData,
        });
        const data = await response.json();
        if (this.debug) {
            console.log(`√上传成功, 上传至: "${folderPath}/${file.name}"`);
        }
        if (data.code !== 200) {
            throw new Error("上传出错: " + data.message);
        }
    };

    AlistUploader.prototype.uploadFiles = async function (files) {
        const token = await this.login();
        const folderPath = await this.createFolder(token);
        for (const file of files) {
            await this.uploadFile(token, folderPath, file);
        }
        return folderPath;
    };

    global.uploadFilesToAlist = function (alistBaseUrl, username, password, uploadRootFolder, files, debug, createTimestampFolder) {
        const uploader = new AlistUploader(alistBaseUrl, username, password, uploadRootFolder, debug, createTimestampFolder);
        return uploader.uploadFiles(files).then(folderPath => {
            return folderPath;
        });
    };

})(window);
