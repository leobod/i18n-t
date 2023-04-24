import fs from 'fs'
import path from 'path'

/**
 * $t获取keyword处理过程队列定义
 */
interface DollarTProcessQueue {
  dir: string[]
  file: string[]
  dtKey: string[]
}

const queue: DollarTProcessQueue = {
  dir: [],
  file: [],
  dtKey: []
}

const getAllDirsAndFiles = (rootPath) => {
  if (fs.existsSync(rootPath)) {
    getSubDirsAndFiles(rootPath).then(async () => {
      /* 先目录后文件 */
      while (queue.dir.length > 0) {
        await getSubDirsAndFiles(queue.dir.shift() as string)
      }
      for (const filePath of queue.file) {
        await getDtKeys(filePath)
      }
      console.log(queue.dtKey)
    })
  } else {
    console.warn('指定目录不存在')
  }
}

const getSubDirsAndFiles = (currentPath: string): Promise<null> => {
  return new Promise((resolve) => {
    fs.promises
      .readdir(currentPath, { withFileTypes: true })
      .then((files) => {
        for (const file of files) {
          if (['api', 'assets', 'icons', 'lang', 'router', 'styles'].indexOf(file.name) !== -1) {
            continue
          }
          if (file.isDirectory()) {
            queue.dir.push(path.join(currentPath, file.name as string))
          } else {
            queue.file.push(path.join(currentPath, file.name as string))
          }
        }
      })
      .catch((err) => {
        console.warn('readdir', err)
      })
      .finally(() => {
        resolve(null)
      })
  })
}

const getDtKeys = (dtPath: string): Promise<null> => {
  return new Promise((resolve) => {
    // const dtPath = '/views/Notify/WeChatTemplate.vue'
    fs.promises
      .readFile(dtPath, 'utf8')
      .then((content) => {
        // console.log(content)
        // const reg = new RegExp('\\$t\\(.+\\)', 'g')
        const reg = new RegExp("\\$t\\('.+?'\\)", 'g')
        const keyListWithDT = content.match(reg) || []
        const keyList = keyListWithDT.map((item) => {
          const reg2 = new RegExp("\\$t\\('(.+)'\\)", 'g')
          const val = item.replace(reg2, '$1')
          return val
        })
        for (const key of keyList) {
          if (queue.dtKey.indexOf(key) === -1) {
            queue.dtKey.push(key)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        resolve(null)
      })
  })
}

const main = () => {
  const args = process.argv.slice(2)
  console.log(args)
  // const rootPath = 'D:\\project\\Visitor2.0\\main\\Vistor2.0Web\\src'
  let rootPath = ''
  let idxOfPath = -1
  args.forEach((item, idx) => {
    if (item === '--path') {
      idxOfPath = idx + 1
    }
  })
  if (idxOfPath !== -1) {
    rootPath = args[idxOfPath]
    getAllDirsAndFiles(rootPath)
  }
}

export { getAllDirsAndFiles }
