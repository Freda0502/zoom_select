/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core';
interface Props {
    referenceElement: HTMLElement;
    theme: ThemeVariables;
    onItemSelect: (blockIndex: number) => void;
}
interface State {
    templates: any;
}
export declare class ScreenList extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidMount(): void;
    getStyle(): import("jimu-core").SerializedStyles;
    createBlock(template: any, index: any): jsx.JSX.Element;
    render(): jsx.JSX.Element;
}
export {};
