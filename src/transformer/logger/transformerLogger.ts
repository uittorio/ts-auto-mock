import { Logger } from '../../logger/logger';
import { ILogger } from '../../logger/logger.interface';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { PropertySignatureCache } from '../descriptor/property/cache';

let logger: ILogger;

export interface TransformerLogger {
  circularGenericNotSupported(nodeName: string): void;
  unexpectedCreateMock(mockFileName: string, expectedFileName: string): void;
  typeNotSupported(type: Readonly<string>): void;
  typeNotSupported(type: Readonly<string>, name: Readonly<string>): void;
  typeOfFunctionCallNotFound(node: string): void;
  indexedAccessTypeFailed(propertyName: string, nodeText: string): void;
}

export function TransformerLogger(): TransformerLogger {
  logger = logger || Logger('Transformer');

  return {
    circularGenericNotSupported(nodeName: string): void {
      logger.warning(
        `Found a circular generic of \`${nodeName}' and such generics are currently not supported. ` +
          'The generated mock will be incomplete.'
      );
    },
    unexpectedCreateMock(mockFileName: string, expectedFileName: string): void {
      logger.warning(`I\'ve found a mock creator but it comes from a different folder
            found: ${mockFileName}
            expected: ${expectedFileName}`);
    },
    typeNotSupported(
      type: Readonly<string>,
      name: Readonly<string> = TypescriptHelper.GetStringPropertyName(
        PropertySignatureCache.instance.get()
      )
    ): void {
      if (name && name.length > 0) {
        logger.warning(
          `Not supported type: ${type} for \`${name}\` - it will convert to null`
        );
      } else {
        logger.warning(`Not supported type: ${type} - it will convert to null`);
      }
    },
    typeOfFunctionCallNotFound(node: string): void {
      logger.warning(
        `Cannot find type of function call: ${node} - it will convert to null`
      );
    },
    indexedAccessTypeFailed(propertyName: string, nodeText: string): void {
      logger.warning(
        `IndexedAccessType transformation failed: cannot find property ${propertyName} of - ${nodeText}`
      );
    },
  };
}
