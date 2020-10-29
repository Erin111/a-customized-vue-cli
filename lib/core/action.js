const {promisify} = require('util');
const download = promisify(require('download-git-repo'));

const open = require('open')
const path = require('path')


const {vueRepo} = require('../config/repo-config')

const {commandSpawn} = require("../utils/terminal")
const {compile, writeToFile, createDirSync} = require("../utils/utils")

const createProjectActions = async (project) => {
    console.log('rin helps you create your project~')
//1.clone项目
    await download(vueRepo, project, {clone: true});
//2. 执行npm install 安装依赖

    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    //cwd: Current working directory of the child process.
    await commandSpawn(command, ['install'], {cwd: `./${project}`})
//3. 进行npm run serve
    commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`});
//4.打开浏览器
    open("http://localhost:8080/")

}
//添加组件的action

const addCpnActions = async (name, dest) => {
    //1.有对应的ejs模板
    //2.编译ejs模板 得到字符串result
    const result = await compile('component.vue.ejs', {name, lowerName: name.toLowerCase()});

    //3.将result写入到.vue文件中并放到对应的文件夹中

    const targetPath = path.resolve(dest, `${name}.vue`)
    writeToFile(targetPath, result);
}
const addPageAndRoute = async (name, dest) => {
    const pageResult = await compile('component.vue.ejs', {name, lowerName: name.toLowerCase()})
    const routeResult = await compile('vue-router.js.ejs', {name, lowerName: name.toLowerCase()})
    // const targetDest = path.resolve(dest, name.toLowerCase())
    if (createDirSync(dest)) {
        const targetPagePath = path.resolve(dest, `${name}.vue`);
        const targetRoutePath = path.resolve(dest, 'router.js');
        writeToFile(targetPagePath, pageResult);
        writeToFile(targetRoutePath, routeResult);

    }

}
const addStoreActions = async (name, dest) => {
    const storeResult = await compile('vue-store.js.ejs', {})
    const typeResult = await compile('vue-types.js.ejs', {})
    // const targetDest = path.resolve(dest, name.toLowerCase())
    if (createDirSync(dest)) {
        const targetStorePath = path.resolve(dest, `${name}.js`);
        const targetTypePath = path.resolve(dest, 'types.js');
        writeToFile(targetStorePath, storeResult);
        writeToFile(targetTypePath, typeResult);

    }
}
module.exports = {
    createProjectActions,
    addCpnActions,
    addPageAndRoute,
    addStoreActions
}