import * as ts from 'typescript';

export namespace TypescriptCreator {
    export function createArrowFunction(block: ts.Block): ts.ArrowFunction {
        return ts.createArrowFunction([], [], [], undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), block);
    }

    export function createFunctionExpression(block: ts.Block, parameter: ReadonlyArray<ts.ParameterDeclaration> = []): ts.FunctionExpression {
        return ts.createFunctionExpression([], null, undefined, [], parameter, undefined, block);
    }

    export function createEmptyProperty(): ts.PropertyDeclaration {
        return createProperty('', undefined);
    }

    export function createProperty(propertyName: string, type: ts.TypeNode): ts.PropertyDeclaration {
        return ts.createProperty([], [], propertyName, undefined, type, undefined);
    }

    export function createMethod(methodName: string, body: ts.Block, parameterNames: ts.Identifier[] = []): ts.MethodDeclaration {
        const parameters: ts.ParameterDeclaration[] = parameterNames.map((parameterName: ts.Identifier) => {
            return ts.createParameter(
                undefined,
                undefined,
                undefined,
                parameterName,
                undefined,
                undefined,
                undefined,
            );
        });
        return ts.createMethod(
            undefined,
            undefined,
            undefined,
            ts.createIdentifier(methodName),
            undefined,
            undefined,
            parameters,
            undefined,
            body,
        );
    }
}
