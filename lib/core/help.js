const program = require('commander')
const helpOptions = () => {
//修改help：在help里增加自己的options
    program.option('-r --rin', 'a rin cli');
    program.option('-d --dest <dest>', 'a destination folder,例如-d/src/components');
    program.option('-f --framework <framework>', 'your framework,例如vue react');
//可以监听指令
    program.on('--help', () => {
        console.log("")
        console.log('other options');
    })

    program.parse(process.argv);
}
module.exports = helpOptions;