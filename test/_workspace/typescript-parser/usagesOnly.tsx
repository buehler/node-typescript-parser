export default function foobar() {
    return (
        <myComponent>
            <div>
                <complexComp>
                    <SingleComp />
                    {myFunc()}
                    {MyFunc()}
                    {foobarVariable.map(() => (
                        <AnotherComp key="" val={valFunc(val)} />
                    ))}
                </complexComp>
            </div>
        </myComponent>
    );
}
