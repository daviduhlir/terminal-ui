"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticScreen = void 0;
const readline = require("readline");
class StaticScreen {
    constructor() {
        this.promise = null;
        this.promiseResolver = null;
        this.currentCursorLeft = 0;
        this.closed = false;
        this.attachKeyHandler = (onKeyHandler) => {
            this.onKeyHandler = onKeyHandler;
            readline.emitKeypressEvents(process.stdin);
            process.stdin.setRawMode(true);
            process.stdin.addListener('keypress', this.onKeyPress);
        };
        this.onKeyPress = (data, key) => {
            if (key.name === 'c' && key.ctrl) {
                process.exit();
            }
            if (this.onKeyHandler) {
                this.onKeyHandler(key);
            }
        };
        this.promise = new Promise(resolve => (this.promiseResolver = resolve));
    }
    setContent(content) {
        if (this.closed) {
            return;
        }
        this.clear();
        process.stdout.write(content);
        this.lines = content.split('\n').length;
    }
    close() {
        this.clear();
        if (this.onKeyHandler) {
            process.stdin.setRawMode(false);
            process.stdin.removeListener('keypress', this.onKeyPress);
            readline.emitKeypressEvents(process.stdout);
        }
        this.promiseResolver();
        this.closed = true;
    }
    async await() {
        return this.promise;
    }
    resolve(value) {
        this.promiseResolver(value);
        this.close();
    }
    clear() {
        process.stdout.moveCursor(-this.currentCursorLeft, -(this.lines - 1));
        process.stdout.clearScreenDown();
        this.currentCursorLeft = 0;
    }
}
exports.StaticScreen = StaticScreen;
//# sourceMappingURL=StaticScreen.js.map