"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptText = void 0;
const StaticScreen_1 = require("./StaticScreen");
class PromptText extends StaticScreen_1.StaticScreen {
    constructor(title, pattern) {
        super();
        this.title = title;
        this.pattern = pattern;
        this.onDatahandler = (data) => {
            let value = data.toString();
            value = value.substring(0, value.length - 1);
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(0);
            if (this.pattern && !this.pattern.test(value)) {
                this.prompt();
            }
            else {
                this.resolve(value);
            }
        };
    }
    static async prompt(title, pattern) {
        return (new PromptText(title, pattern)).prompt();
    }
    async prompt() {
        this.print();
        process.stdin.once('data', this.onDatahandler);
        return this.await();
    }
    print() {
        let content = `\x1b[1m${this.title}\x1b[0m\n`;
        this.setContent(content);
    }
}
exports.PromptText = PromptText;
//# sourceMappingURL=PromptText.js.map