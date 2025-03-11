"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exec = void 0;
const child_process_1 = require("child_process");
class Exec {
    static async cmd(command, ...args) {
        return new Promise((resolve, reject) => {
            const cmd = child_process_1.spawn(command, args);
            let result = null;
            let error = null;
            cmd.stdout.on('data', data => {
                if (!result) {
                    result = data;
                }
                else {
                    result = Buffer.concat([result, data]);
                }
            });
            cmd.stderr.on('data', data => {
                if (!error) {
                    error = data;
                }
                else {
                    error = Buffer.concat([error, data]);
                }
            });
            cmd.on('close', () => {
                if (error) {
                    reject(error.toString('utf-8'));
                }
                else {
                    resolve(result.toString('utf-8'));
                }
            });
        });
    }
}
exports.Exec = Exec;
//# sourceMappingURL=Exec.js.map