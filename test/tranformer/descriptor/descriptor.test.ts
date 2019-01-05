import { createMock } from "../../../config/create-mock";

describe('descriptor', () => {
	describe('for declared interface with string', () => {
		interface Interface {
			a: string;
		}
		
		it('should set an empty string', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe("")
		});
	});
	
	describe('for declared interface with number', () => {
		interface Interface {
			a: number;
		}
		
		it('should set 0', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(0)
		});
	});
	
	describe('for declared interface with boolean', () => {
		interface Interface {
			a: boolean;
		}
		
		it('should set false', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(false)
		});
	});
	
	describe('for interface with null', () => {
		interface Interface {
			a: null;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(null)
		});
	});
	
	describe('for interface with any', () => {
		interface Interface {
			a: any;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(null)
		});
	});
	
	describe('for interface with unknown', () => {
		interface Interface {
			a: unknown;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(null)
		});
	});
	
	describe('for interface with undefined', () => {
		interface Interface {
			a: undefined;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(null)
		});
	});
	
	describe('for interface with a specific string', () => {
		interface Interface {
			a: "string2";
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe("string2")
		});
	});
	
	describe('for interface with a specific number', () => {
		interface Interface {
			a: 2;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(2)
		});
	});
	
	
	describe('for declared interface with multiple properties', () => {
		interface Interface {
			a: boolean;
			b: string;
			c: number;
		}
		
		it('should set the default properties', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(false);
			expect(properties.b).toBe("");
			expect(properties.c).toBe(0);
		});
	});
	
	describe('for declared interface with nested objects', () => {
		interface Interface {
			a: {
				b: {
					c: string;
				}
			};
		}
		
		it('should set the default properties to the nested object', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a.b.c).toBe("");
		});
	});
	
	describe('for declared interface with nested interface reference', () => {
		interface Interface {
			a: InterfaceSub
		}
		
		interface InterfaceSub {
			subA: string
		}
		
		it('should set the default properties to the nested object', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a.subA).toBe("");
		});
	});
	
	describe('for declared interface with nested type refence', () => {
		interface Interface {
			a: Type
		}
		
		type Type = string;
		
		it('should set the default property', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe("");
		});
	});
	
	describe('for declared interface with nested complex type reference', () => {
		interface Interface {
			a: Type
		}
		
		type Type = {
			e: string;
			f: number;
		};
		
		it('should set the default property', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a.e).toBe("");
			expect(properties.a.f).toBe(0);
		});
	});
});