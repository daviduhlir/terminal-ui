import { StaticScreen } from './StaticScreen'

export const ROTARY_ANIMATION = ['-', '/', '|', '\\']
export const SLIDING_ANIMATION = ['[=   ]', '[ =  ]', '[  = ]', '[   =]', '[  = ]', '[ =  ]']

export class Loader extends StaticScreen {
  protected interval = null
  protected step = 0

  constructor(readonly title: string, readonly animation: string[] = SLIDING_ANIMATION, speed: number = 100) {
    super()
    this.interval = setInterval(this.renderHandler, speed)
  }

  close() {
    clearInterval(this.interval)
    super.close()
  }

  protected renderHandler = () => {
    this.setContent(`\x1b[1m${this.animation[this.step]}\x1b[0m ${this.title}\n`)
    this.step = (this.step + 1) % this.animation.length
  }
}
