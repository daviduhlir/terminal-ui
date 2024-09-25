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
    let content = `${this.title} [`
    for (let i = 0; i < 50; i++) {
      if (this.internalValue / 2 > i) {
        content += '='
      } else {
        content += ' '
      }
    }
    content += `] ${Math.floor(this.internalValue)}%\n`
    this.setContent(content)
  }
}
