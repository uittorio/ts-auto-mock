import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';

export function GetReturnTypeFromBodyDescriptor(node: ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration | ts.FunctionDeclaration, scope: Scope): ts.Expression {
  return GetDescriptor(GetReturnNodeFromBody(node), scope);
}

export function GetReturnNodeFromBody(node: ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration | ts.FunctionDeclaration): ts.Node {
  let returnValue: ts.Node;

  const functionBody: ts.FunctionBody = node.body as ts.FunctionBody;

  if (functionBody.statements) {
    const returnStatement: ts.ReturnStatement = GetReturnStatement(functionBody);

    if (returnStatement) {
      returnValue = returnStatement.expression;
    } else {
      returnValue = ts.createNull();
    }
  } else {
    returnValue = node.body;
  }

  return returnValue;
}

function GetReturnStatement(body: ts.FunctionBody): ts.ReturnStatement {
  return body.statements.find((statement: ts.Statement) => statement.kind === ts.SyntaxKind.ReturnStatement) as ts.ReturnStatement;
}
