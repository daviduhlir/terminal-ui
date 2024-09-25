import { PromptText, PromptSelect, Loader, ProgressBar } from '@david.uhlir/terminal-ui'

async function main() {
  const options = [
    {value: 'prepatch', text: 'Prepatch'},
    {value: 'patch', text: 'Patch (\x1b[33mDefault\x1b[0m)'},
    {value: 'minor', text: 'Minor'},
    {value: 'major', text: 'Major'},
    {value: 'custom', text: 'Custom'},
  ]
  const selected = await (new PromptSelect('Please select option:', options, ['patch'])).prompt()
  if (selected === 'custom') {
    console.log('Version:', await (new PromptText('Enter custom version:')).prompt())
  }

  const loader = new Loader('Waiting...', )
  setTimeout(() => loader.close(), 1000)
  await loader.await()

  const progressBar = new ProgressBar('Waiting to be done')
  const interval = setInterval(() => {
    if (progressBar.value === 100) {
      progressBar.close()
      clearInterval(interval)
    } else {
      progressBar.value = progressBar.value + 1
    }
  }, 20)
}

main()
