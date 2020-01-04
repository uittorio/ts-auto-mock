import * as ts from 'typescript';
import { KeyCounter } from './keyCounter';

export type PossibleDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration;

export class FactoryUniqueName {
    private _keyCounter: KeyCounter;

    constructor() {
        this._keyCounter = new KeyCounter();
    }

    public createForDeclaration(declaration: PossibleDeclaration): string {
        const declarationNameIdentifier: ts.Identifier = declaration.name;
        const declarationNameSanitized: string = (declarationNameIdentifier && declarationNameIdentifier.text) || 'Anonymous';
        const baseFactoryName: string = `create__${declarationNameSanitized}__mock`;
        const count: number = this._keyCounter.getFor(baseFactoryName);

        return `${baseFactoryName}_${count}`;
    }

    public createForIntersection(nodes: ts.Node[]): string {
        const nameOfDeclarations: string = nodes.reduce((acc: string, declaration: ts.Node) => {
            if (ts.isTypeLiteralNode(declaration)) {
                acc += 'literal';
            }

            if (ts.isInterfaceDeclaration(declaration) || ts.isTypeAliasDeclaration(declaration) || ts.isClassDeclaration(declaration)) {
                acc += declaration.name.text;
            }

            return acc;
        }, '');

        const declarationNameSanitized: string = nameOfDeclarations || 'Anonymous';
        const baseFactoryName: string = `create__${declarationNameSanitized}__mock`;
        const count: number = this._keyCounter.getFor(baseFactoryName);

        return `${baseFactoryName}_${count}`;
    }
}
