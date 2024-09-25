import * as readline from 'readline'

export class StaticScreen {
  protected promise = null
  protected promiseResolver = null
  protected currentCursorLeft = 0
  protected onKeyHandler?: (key) => void
  protected lines: number
  protected closed = false

  constructor() {
    this.promise = new Promise(resolve => (this.promiseResolver = resolve))
  }

  attachKeyHandler = (onKeyHandler?: (key) => void) => {
    this.onKeyHandler = onKeyHandler
    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)
    process.stdin.addListener('keypress', this.onKeyPress)
  }

  setContent(content: string) {
    if (this.closed) {
      return
    }
    this.clear()
    process.stdout.write(content)
    this.lines = content.split('\n').length
  }

  close() {
    this.clear()
    if (this.onKeyHandler) {
      process.stdin.setRawMode(false)
      process.stdin.removeListener('keypress', this.onKeyPress)
      readline.emitKeypressEvents(process.stdout)
    }
    this.promiseResolver()
    this.closed = true
  }

  async await() {
    return this.promise
  }

  protected resolve(value) {
    this.promiseResolver(value)
    this.close()
  }

  protected clear() {
    process.stdout.moveCursor(-this.currentCursorLeft, -(this.lines - 1))
    process.stdout.clearScreenDown()
    this.currentCursorLeft = 0
  }

  protected onKeyPress = (data, key) => {
    if (key.name === 'c' && key.ctrl) {
      process.exit()
    }
    if (this.onKeyHandler) {
      this.onKeyHandler(key)
    }
  }
}
