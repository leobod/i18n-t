import { getAllDirsAndFiles } from './getDollarTKeywords'

import { Command } from 'commander'

const program = new Command()

program.name('sot').description('this is a tool for work').version('0.0.1')

program
  .command('test')
  .description('the description for this command \n this is about how to use commander \n just a sample')
  .summary('the simple des for this command')
  .argument('<script>')
  .option('-r, --required <number>', 'required parameter', '80')
  .option('-op, --optional [number]', 'optional parameter')
  .option('-ops, --optionals [number...]', 'optional parameters')
  .action(function (script, options, command) {
    console.log('arguments script: ', script)
    console.log('options : ', options)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // console.error('Run script %s on port %s', this.args[0], this.opts().port)
  })

program.parse()

// const main = () => {
//   const args = process.argv.slice(2)
//   console.log(args)
//   // const rootPath = 'D:\\project\\Visitor2.0\\main\\Vistor2.0Web\\src'
//   let rootPath = ''
//   let idxOfPath = -1
//   args.forEach((item, idx) => {
//     if (item === '--path') {
//       idxOfPath = idx + 1
//     }
//   })
//   if (idxOfPath !== -1) {
//     rootPath = args[idxOfPath]
//     getAllDirsAndFiles(rootPath)
//   }
// }
//
// main()
