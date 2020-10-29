//编译ejs模板
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const compile = (template, data) => {
    //  下面函数要传入一个路径，进行路径拼接
    const templatePosition = `../templates/${template}`
    const templatePath = path.resolve(__dirname, templatePosition);
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, {data}, {}, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
                return
            }
            resolve(result)

        });
    })
}
//path:用户传入的路径：source/components/category
const createDirSync = (pathName) => {
    if (fs.existsSync(pathName)) {
        // fs.mkdirSync('./'+`${name.toLowerCase()}`);
        return true;
    } else {
        //拿到父路径，看是否存在,不存在，再去看fulujing
        // if (fs.existsSync(path.dirname)){
        //     fs.mkdirSync(path)
        // }else {
        //     if(fs.existsSync(path.dirname(path.dirname(path)))){
        //
        //     }
        // }
        //写成递归形式
        if (createDirSync(path.dirname(pathName))) {
            fs.mkdirSync(pathName)
            return true;
        }
    }
}
//写入文件的方法
const writeToFile = (path, content) => {
    //  判断当前的路径是否存在，如果不存在会创建对应的文件夹
    //  作业??回看
    //  需要递归创建：判断父文件夹存不存在，不存在就创建
    return fs.promises.writeFile(path, content)
}
module.exports = {
    compile,
    writeToFile,
    createDirSync
}