import { StaticScreen } from './StaticScreen'

export class ProgressBar extends StaticScreen {
  protected internalValue = 0

  constructor(readonly title: string) {
    super()
  }

  get value() {
    return this.internalValue
  }

  set value(value: number) {
    this.internalValue = Math.max(Math.min(value, 100), 0)
    this.renderHandler()
  }

  protected renderHandler = () => {
    let content = `${this.title} [\x1b[36m`
    for (let i = 0; i < 50; i++) {
      if (this.internalValue / 2 > i) {
        content += '='
      } else {
        content += ' '
      }
    }
    content += `\x1b[0m] \x1b[1m${Math.floor(this.internalValue)}%\x1b[0m\n`
    this.setContent(content)
  }
}
