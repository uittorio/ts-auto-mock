import { createMock } from 'ts-auto-mock';
import { NameSpaceInterfaceImport } from '../utils/namespace/namespace';
import Interface2 = NameSpaceInterfaceImport.Interface2;
import SubInterface = NameSpaceInterfaceImport.SubNamespace.SubInterface;
import Enum = NameSpaceInterfaceImport.Enum;

describe('import equal', () => {
    it('should use the correct import for an interface', () => {
        const mock: Interface2 = createMock<Interface2>();
        expect(mock.a).toBe('');
    });

    it('should use the correct import for a literal', () => {
        interface InterfaceWithEnumFromModule {
            enum: Enum;
        }
        const mock: InterfaceWithEnumFromModule = createMock<InterfaceWithEnumFromModule>();
        expect(mock.enum).toBe(Enum.A);
    });

    it('should use the correct import for a sub module interface', () => {
        const mock: SubInterface = createMock<SubInterface>();
        expect(mock.a).toBe('');
    });
});
