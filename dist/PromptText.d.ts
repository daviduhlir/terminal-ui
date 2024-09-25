/// <reference types="node" />
import { StaticScreen } from './StaticScreen';
export declare class PromptText extends StaticScreen {
    readonly title: string;
    constructor(title: string);
    prompt(): Promise<any>;
    protected print(): void;
    protected onDatahandler: (data: Buffer) => void;
}
