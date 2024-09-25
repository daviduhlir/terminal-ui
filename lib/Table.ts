export class Table<T extends string[]> {
  static print<T extends string[]>(headers: T, data: (any[] | {[K in T[number]]: any})[], minColumnWidth: number = 0) {
    return new Table(headers, data, minColumnWidth).print()
  }

  constructor(readonly headers: T, readonly data: (any[] | {[K in T[number]]: any})[], readonly minColumnWidth: number = 0) {}
  print() {
    const data = this.headers.reduce((acc, header, index) => {
      const values = this.data.map(row => (Array.isArray(row) ? row[index] : row[header]).toString())
      return {
        ...acc,
        [header]: {
          values,
          length: values.reduce((acc, value) => value.length > acc ? value.length : acc, 0),
        }
      }
    }, {})

    let content = '\x1b[100m\x1b[4m\x1b[1m'
    for(let i = 0; i < this.headers.length; i++) {
      const header = this.headers[i]
      const len = Math.max(data[header].length, this.minColumnWidth)
      content += i === 0 ? `${Table.fixedLenText(header, len, 2)}` : `| ${Table.fixedLenText(header, len, 2)} `
    }
    content += '\x1b[0m\n\x1b[4m'

    for(let j = 0; j < this.data.length; j++) {
      /*if (j === Math.max(this.data.length - 1, 0)) {
        content += '\x1b[0m'
      }*/
      for(let i = 0; i < this.headers.length; i++) {
        const header = this.headers[i]
        const len = Math.max(data[header].length, this.minColumnWidth)
        content += i === 0 ? `${Table.fixedLenText(data[header].values[j], len, 2)}` : `| ${Table.fixedLenText(data[header].values[j], len, 2)} `
      }
      content += '\n'
    }
    content += '\x1b[0m'

    console.log(content)
  }

  protected static fixedLenText(text: string, length: number, addPadding: number = 0) {
    const padding = ((length - text.length) / 2) + addPadding
    return `${(new Array(Math.floor(padding) + 1)).join(' ')}${text}${(new Array(Math.ceil(padding) + 1)).join(' ')}`
  }

  protected static fill(length: number, fill: string) {
    return (new Array(length + 1)).join(fill)
  }
}
