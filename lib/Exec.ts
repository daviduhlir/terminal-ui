import { spawn } from 'child_process'

export class Exec {
  static async cmd(command: string, ...args: any[]) {
    return new Promise((resolve, reject) => {
      const cmd = spawn(command, args)
      let result = null
      let error = null
      cmd.stdout.on('data', data => {
        if (!result) {
          result = data
        } else {
          result = Buffer.concat([result, data])
        }
      })

      cmd.stderr.on('data', data => {
        if (!error) {
          error = data
        } else {
          error = Buffer.concat([error, data])
        }
      })

      cmd.on('close', () => {
        if (error) {
          reject(error.toString('utf-8'))
        } else {
          resolve(result.toString('utf-8'))
        }
      })
    })
  }
}