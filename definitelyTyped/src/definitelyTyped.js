const path = require('path');
const fs = require('fs');

function definitelyTyped() {
  return {
    folder: path.join('..', 'DefinitelyTyped'),
    typesFolder: path.join('..', 'DefinitelyTyped', "types"),
    getTypes() {
      return this._types || (this._types = fs.readdirSync(this.typesFolder, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name));
    }
  }
}

module.exports = definitelyTyped;
