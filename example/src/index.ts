import { PromptText, PromptSelect, Args, ArgOptionType } from '@david.uhlir/terminal-ui'
import * as path from 'path'
import { spawn } from 'child_process'
import { promises as fs } from 'fs'

const args = Args.parse({
  version: {
    short: 'v',
    long: 'version',
    type: ArgOptionType.String,
    description: 'Type of version incrementation, or custom version'
  }
})

async function exec(command, ...args) {
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

async function promptVersion() {
  let version
  const options = [
    {value: 'prerelease', text: 'Prerelease'},
    {value: 'prepatch', text: 'Prepatch'},
    {value: 'preminor', text: 'Preminor'},
    {value: 'premajor', text: 'Premajor'},
    {value: 'patch', text: 'Patch (\x1b[33mDefault\x1b[0m)'},
    {value: 'minor', text: 'Minor'},
    {value: 'major', text: 'Major'},
    {value: 'custom', text: 'Custom'},
  ]
  version = await PromptSelect.prompt('Please select version:', options, ['patch'])
  if (version === 'custom') {
    version = await PromptText.prompt('Enter custom version:', /^([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})(-([0-9A-Za-z-_.]{1,}))?$/)
  }
  return version
}

function error(text: string) {
  console.error('Error', text)
  process.exit()
}

async function readVersion() {
  let version
  try {
    version = JSON.parse(await fs.readFile(path.resolve('./package.json'), 'utf-8')).version
  } catch(e) {
    error('Previous version can not be loaded from package.json')
  }
  return version
}

;(async function () {
  try {
    console.log('Previous version:', await readVersion())
    const version = args.version ? args.version : await promptVersion()
    await exec('npm', 'version', version)
    console.log('New version:', await readVersion())
    process.exit()
  } catch(e) {
    console.log(e)
    error(`Failed to change version: ${e.message}`)
  }
})()
