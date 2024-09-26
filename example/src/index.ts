import { PromptText, PromptSelect, Loader, ProgressBar, Table } from '@david.uhlir/terminal-ui'

console.log('Table1')
Table.print(['a', 'b'], [['a1', 'b1 jiefjfi'], ['a2', 'b2']], 20)
console.log('Table2')
Table.print(['a', 'b'], [['a1', 'b1']], 20)
console.log('Table3')
Table.print(['a', 'b'], [['a1', 'b1'], ['a1', 'b1 jiefjfi'], ['a1', 'b1 jiefjfi'], ['a1', 'b1 jiefjfi']], 10)


async function main() {
  const options = [
    {value: 'prepatch', text: 'Prepatch'},
    {value: 'patch', text: 'Patch (\x1b[33mDefault\x1b[0m)'},
    {value: 'minor', text: 'Minor'},
    {value: 'major', text: 'Major'},
    {value: 'custom', text: 'Custom'},
  ]
  const selected = await PromptSelect.prompt('Please select option:', options, ['patch'])
  if (selected === 'custom') {
    console.log('Version:', await PromptText.prompt('Enter custom version:', /^([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})$/))
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

main().then(() => process.exit())
