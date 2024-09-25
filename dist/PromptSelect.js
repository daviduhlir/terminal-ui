"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptSelect = void 0;
const StaticScreen_1 = require("./StaticScreen");
class PromptSelect extends StaticScreen_1.StaticScreen {
    constructor(title, options, preselected, multiselect) {
        super();
        this.title = title;
        this.options = options;
        this.multiselect = multiselect;
        this.pointer = null;
        this.selected = [];
        if (preselected) {
            this.pointer = preselected[0];
            this.selected = preselected;
        }
    }
    async prompt() {
        this.attachKeyHandler(this.handleKeys);
        this.printOptions();
        return this.await();
    }
    printOptions() {
        let content = `\x1b[1m${this.title}\x1b[0m\n`;
        for (const option of this.options) {
            if (this.selected.includes(option.value)) {
                content += `${this.multiselect && this.pointer === option.value ? '\x1b[4m' : ''} \x1b[1m[x] \x1b[36m${option.text} \x1b[0m\n`;
            }
            else {
                content += `${this.multiselect && this.pointer === option.value ? '\x1b[4m' : ''} \x1b[1m[ ] \x1b[36m${option.text} \x1b[0m\n`;
            }
        }
        this.setContent(content);
    }
    handleKeys(key) {
        if (key.name === 'up') {
            if (!this.pointer) {
                this.pointer = this.options[this.options.length - 1].value;
            }
            else {
                const index = this.options.findIndex(o => o.value === this.pointer);
                this.pointer = this.options[(this.options.length + index - 1) % this.options.length].value;
            }
            if (!this.multiselect) {
                this.selected = [this.pointer];
            }
            this.printOptions();
        }
        else if (key.name === 'down') {
            if (!this.pointer) {
                this.pointer = this.options[0].value;
            }
            else {
                const index = this.options.findIndex(o => o.value === this.pointer);
                this.pointer = this.options[(this.options.length + index + 1) % this.options.length].value;
            }
            if (!this.multiselect) {
                this.selected = [this.pointer];
            }
            this.printOptions();
        }
        else if (key.name === 'return') {
            this.resolve(this.multiselect ? this.selected : this.selected[0]);
        }
        else if (key.name === 'space') {
            if (this.multiselect) {
                const isOn = this.selected.includes(this.pointer);
                if (isOn) {
                    this.selected = this.selected.filter(o => o !== this.pointer);
                }
                else {
                    this.selected = [...this.selected, this.pointer];
                }
                this.printOptions();
            }
        }
    }
}
exports.PromptSelect = PromptSelect;
//# sourceMappingURL=PromptSelect.js.map