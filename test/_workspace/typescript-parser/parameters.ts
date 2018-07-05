function normal(p1: string): void { }

function arrBound1([p1, p2]): void { }

function arrBound2([p1, p2]: [string, Type]): void { }

function arrBound3([p1, p2]: [string]): void { }

function arrBound4([p1, p2]: [string, number, boolean]): void { }

function objBound1({ p1, p2 }): void { }

function objBound2({ p1, p2 }: Type): void { }

function objBound3({ p1, p2 }: { p1: string, p2: Type }): void { }

function objBound4({ p1, p2 }: { p1: string }): void { }

function objBound5({ p1, p2 }: { p1: string, p2: number, p3: boolean }): void { }

function mixed(p1: string, { p2, p3 }: { p2: string, p3: number }, [p4, p5]: [Type, boolean]): void { }
