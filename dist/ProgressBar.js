"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const StaticScreen_1 = require("./StaticScreen");
class ProgressBar extends StaticScreen_1.StaticScreen {
    constructor(title) {
        super();
        this.title = title;
        this.internalValue = 0;
        this.renderHandler = () => {
            let content = `${this.title} [`;
            for (let i = 0; i < 50; i++) {
                if (this.internalValue / 2 > i) {
                    content += '=';
                }
                else {
                    content += ' ';
                }
            }
            content += `] ${Math.floor(this.internalValue)}%\n`;
            this.setContent(content);
        };
    }
    get value() {
        return this.internalValue;
    }
    set value(value) {
        this.internalValue = Math.max(Math.min(value, 100), 0);
        this.renderHandler();
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=ProgressBar.js.map