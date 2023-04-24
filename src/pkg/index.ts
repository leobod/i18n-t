import { getAllDirsAndFiles } from './getDollarTKeywords'

import { Command } from 'commander'

const program = new Command()

program.name('sot').description('this is a tool for work').version('0.0.1')

program
  .command('get')
  .command('dt')
  .description('获取文件中的所有$t元素')
  .summary('获取文件中的所有$t元素')
  .argument('<file_path>')
  .action(function (file_path) {
    console.log('当前输入的路径为: ', file_path)
    if (file_path && file_path !== '') {
      getAllDirsAndFiles(file_path)
    }
  })

program.parse()
