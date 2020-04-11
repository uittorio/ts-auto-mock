import ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { TypescriptHelper } from '../helper/helper';

export interface MethodSignature {
  parameters?: ts.ParameterDeclaration[];
  returnValue: ts.Expression;
}

export function GetMethodDescriptor(propertyName: ts.PropertyName, methodSignatures: MethodSignature[]): ts.Expression {
  const providerGetMethod: ts.PropertyAccessExpression = CreateProviderGetMethod();

  const propertyNameString: string = TypescriptHelper.GetStringPropertyName(propertyName);
  const propertyNameStringLiteral: ts.StringLiteral = ts.createStringLiteral(propertyNameString);

  const [signatureWithMostParameters]: MethodSignature[] = [...methodSignatures].sort(
    (
      { parameters: leftParameters = [] }: MethodSignature,
      { parameters: rightParameters = [] }: MethodSignature,
    ) => rightParameters.length - leftParameters.length,
  );

  const longestParameterList: ts.ParameterDeclaration[] = signatureWithMostParameters.parameters || [];

  const block: ts.Block = ts.createBlock(
    [
      ResolveSignatureElseBranch(methodSignatures, longestParameterList),
    ],
    true,
  );

  const propertyValueFunction: ts.ArrowFunction = TypescriptCreator.createArrowFunction(
    block,
    longestParameterList,
  );

  return TypescriptCreator.createCall(providerGetMethod, [propertyNameStringLiteral, propertyValueFunction]);
}

function CreateTypeEquality(signatureType: ts.TypeNode | undefined, primaryDeclaration: ts.ParameterDeclaration): ts.Expression {
  const identifier: ts.Identifier = ts.createIdentifier(primaryDeclaration.name.getText());

  if (!signatureType) {
    return ts.createPrefix(
      ts.SyntaxKind.ExclamationToken,
      ts.createPrefix(
        ts.SyntaxKind.ExclamationToken,
        identifier,
      ),
    );
  }

  if (TypescriptHelper.isLiteralRuntimeTypeNode(signatureType)) {
    return ts.createStrictEquality(
      ts.createTypeOf(identifier),
      signatureType ? ts.createStringLiteral(signatureType.getText()) : ts.createVoidZero(),
    );
  } else {
    return ts.createBinary(identifier, ts.SyntaxKind.InstanceOfKeyword, ts.createIdentifier(signatureType.getText()));
  }
}

function CreateUnionTypeOfEquality(signatureType: ts.TypeNode | undefined, primaryDeclaration: ts.ParameterDeclaration): ts.Expression {
  const typeNodes: ts.TypeNode[] = [];

  if (signatureType) {
    if (ts.isUnionTypeNode(signatureType)) {
      typeNodes.push(...signatureType.types);
    } else {
      typeNodes.push(signatureType);
    }
  }

  const [firstType, ...remainingTypes]: ts.TypeNode[] = typeNodes;

  return remainingTypes.reduce(
    (prevStatement: ts.Expression, typeNode: ts.TypeNode) =>
      ts.createLogicalOr(
        prevStatement,
        CreateTypeEquality(typeNode, primaryDeclaration),
      ),
    CreateTypeEquality(firstType, primaryDeclaration),
  );
}

function ResolveParameterBranch(declarations: ts.ParameterDeclaration[], allDeclarations: ts.ParameterDeclaration[], returnValue: ts.Expression, elseBranch: ts.Statement): ts.Statement {
  const [firstDeclaration, ...remainingDeclarations]: ts.ParameterDeclaration[] = declarations;

  const condition: ts.Expression = remainingDeclarations.reduce(
    (prevStatement: ts.Expression, declaration: ts.ParameterDeclaration, index: number) =>
      ts.createLogicalAnd(
        prevStatement,
        CreateUnionTypeOfEquality(declaration.type, allDeclarations[index + 1]),
      ),
    CreateUnionTypeOfEquality(firstDeclaration.type, allDeclarations[0]),
  );


  return ts.createIf(condition, ts.createReturn(returnValue), elseBranch);
}

function ResolveSignatureElseBranch(signatures: MethodSignature[], longestParameterList: ts.ParameterDeclaration[]): ts.Statement {
  const [signature, ...remainingSignatures]: MethodSignature[] = signatures;

  if (remainingSignatures.length) {
    const elseBranch: ts.Statement = ResolveSignatureElseBranch(remainingSignatures, longestParameterList);

    const currentParameters: ts.ParameterDeclaration[] = signature.parameters || [];
    return ResolveParameterBranch(currentParameters, longestParameterList, signature.returnValue, elseBranch);
  } else {
    return ts.createReturn(signature.returnValue);
  }
}

function CreateProviderGetMethod(): ts.PropertyAccessExpression {
  return ts.createPropertyAccess(
    ts.createPropertyAccess(
      ts.createPropertyAccess(
        MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Extension),
        ts.createIdentifier('Provider'),
      ),
      ts.createIdentifier('instance')),
    ts.createIdentifier('getMethod'));
}
