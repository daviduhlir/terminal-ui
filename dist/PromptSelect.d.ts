import { StaticScreen } from './StaticScreen';
export interface PromptSelectConfig {
    multiselect?: boolean;
    styles: {
        checked: string;
        unchecked: string;
    };
}
export declare class PromptSelect extends StaticScreen {
    readonly title: string;
    readonly options: {
        value: string;
        text: string;
    }[];
    readonly config: PromptSelectConfig;
    static prompt(title: string, options: {
        value: string;
        text: string;
    }[], preselected?: string[], config?: PromptSelectConfig): Promise<any>;
    protected pointer: any;
    protected selected: string[];
    constructor(title: string, options: {
        value: string;
        text: string;
    }[], preselected?: string[], config?: PromptSelectConfig);
    prompt(): Promise<any>;
    protected printOptions(): void;
    protected handleKeys(key: any): void;
}
