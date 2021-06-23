(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"+Gs2":function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return a})),n.d(t,"default",(function(){return m}));var o=n("k0FJ"),r=n("oedh"),c=n("/FXl"),i=n("TjRS"),a=(n("aD51"),{});void 0!==a&&a&&a===Object(a)&&Object.isExtensible(a)&&!a.hasOwnProperty("__filemeta")&&Object.defineProperty(a,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/views/create-mock-list.mdx"}});var s={_frontmatter:a},l=i.a;function m(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)(l,Object(o.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h1",{id:"create-mock-list"},"Create mock list"),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"createMockList")," creates an array of mocks, so you don't have to do that tedious part yourself."),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-ts"}),"import { createMockList } from 'ts-auto-mock';\n\ninterface Person {\n  id: string;\n}\nconst mockList = createMockList<Person>(2);\nmockList.length // 2\n")),Object(c.b)("h2",{id:"property-overrides"},"Property overrides"),Object(c.b)("p",null,"You can supply a function as the second argument to override specific properties."),Object(c.b)("p",null,"The function will be supplied the index of the individual element as the callback argument, e.g.:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-ts"}),"import { createMockList } from 'ts-auto-mock';\n\ninterface Person {\n  id: string;\n}\nconst mockList = createMockList<Person>(2, (index: number) => {\n    return {\n        id: \"id\" + index\n    };\n});\nmockList[0].id // id0\nmockList[1].id // id1\n")))}void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!m.hasOwnProperty("__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/views/create-mock-list.mdx"}}),m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-views-create-mock-list-mdx-83e0c45b152e9266ad86.js.map