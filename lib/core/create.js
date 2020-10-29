const program = require('commander')
const fs = require('fs')
const {createProjectActions, addCpnActions,addPageAndRoute,addStoreActions} = require('./action')
const createCommands = () => {
    program.command('create <project> [others...]')
        .description('clone repository into a folder')
        .action(createProjectActions)

    program.command('addCpn <name>')
        .description('add vue component,例如：rin addCpn HelloWord')
        .action((name) => {
            addCpnActions(name, program.dest || 'src/components')
        })
    program.command('addPageAndRoute <page>')
        .description('add vue page and router config,例如：why addpage Home [-d dest]')
        .action((page)=>{
            fs.mkdirSync('src/pages/' + `${page}`, {recursive:true})
            addPageAndRoute(page,program.dest||'src/pages/'+`${page}`);

    })
    program.command('addStore <store>')
        .description('add vue store,例如：why addStore Home [-d dest]')
        .action((store)=>{
            fs.mkdirSync('src/store/modules/' + `${store}`, {recursive:true})
            addStoreActions(store,program.dest||'src/store/modules/'+ `${store}`);

        })
}
module.exports = createCommands