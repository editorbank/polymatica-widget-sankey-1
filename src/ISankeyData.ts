import { Dictionary } from "lodash";

export interface ISankeyLink {
    from: string;
    to: string;
    flow: number;
}

export interface ISankeyNode {
    color?: string;
    title?: string;
    priority?: number;
}

export interface ISankeyData {
    title?: string;
    style?: {
        chart?: CSSStyleDeclaration;
        node?: CSSStyleDeclaration;
        colorMode?: 'gradient' | 'from' | 'to';
        flowColorDefault: string | 'gray';
    };
    nodes?: Dictionary<ISankeyNode>;
    links?: ISankeyLink[];

}
