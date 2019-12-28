import * as ts from 'typescript';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { GetMockFactoryCall } from '../../mockFactoryCall/mockFactoryCall';
import { Scope } from '../../scope/scope';
import { isTypeReferenceReusable } from '../../typeReferenceReusable/typeReferenceReusable';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetTypescriptType, IsTypescriptType } from '../tsLibs/typecriptLibs';

function isTypeAlreadyMocked(declaration: ts.Declaration): boolean {
    return MockDefiner.instance.hasMockForDeclaration(declaration);
}

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode, scope: Scope): ts.Expression {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);

    if (isTypeAlreadyMocked(declaration)) {
        return GetMockFactoryCall(node, scope);
    }

    if (IsTypescriptType(declaration)) {
        return GetDescriptor(GetTypescriptType(node, scope), scope);
    }

    if (isTypeReferenceReusable(declaration)) {
        return GetMockFactoryCall(node, scope);
    }

    return GetDescriptor(declaration, scope);
}
