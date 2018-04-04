export function traverseAst(root: Node, visit: (node: Node) => void, skipContents?: (node: Node) => boolean): void {
    const stack = (root as any).getChildren();

    for (let node = stack.shift(); node !== undefined; node = stack.shift()) {
        visit(node);

        if (skipContents && skipContents(node)) {
            continue;
        }

        stack.unshift(...node.getChildren());
    }
}
