"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function traverseAst(root, visit, skipContents) {
    const stack = root.getChildren();
    for (let node = stack.shift(); node !== undefined; node = stack.shift()) {
        visit(node);
        if (skipContents && skipContents(node)) {
            continue;
        }
        stack.unshift(...node.getChildren());
    }
}
exports.traverseAst = traverseAst;
