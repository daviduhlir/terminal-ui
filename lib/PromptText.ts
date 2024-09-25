import { StaticScreen } from './StaticScreen'

export class PromptText extends StaticScreen {
  public static async prompt(title: string, pattern?: RegExp) {
    return (new PromptText(title, pattern)).prompt()
  }

  constructor(readonly title: string, readonly pattern?: RegExp) {
    super()
  }

  async prompt() {
    this.print()
    process.stdin.once('data', this.onDatahandler)
    return this.await()
  }

  protected print() {
    let content = `\x1b[1m${this.title}\x1b[0m\n`
    this.setContent(content)
  }

  protected onDatahandler = (data: Buffer) => {
    let value = data.toString()
    value = value.substring(0, value.length - 1)

    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(0)

    if (this.pattern && !this.pattern.test(value)) {
      this.prompt()
    } else {
      this.resolve(value)
    }
  }
}
