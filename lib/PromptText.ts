import { StaticScreen } from './StaticScreen'

export class PromptText extends StaticScreen {
  constructor(readonly title: string) {
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
    this.resolve(data.toString())
  }
}
