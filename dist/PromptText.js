"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptText = void 0;
const StaticScreen_1 = require("./StaticScreen");
class PromptText extends StaticScreen_1.StaticScreen {
    constructor(title) {
        super();
        this.title = title;
        this.onDatahandler = (data) => {
            this.resolve(data.toString());
        };
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