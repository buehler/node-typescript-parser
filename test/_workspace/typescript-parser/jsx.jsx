import React from 'react';
import $ from 'jquery';

export class ES6Class {
    render() {
        return (
            <div>
                <Foobar />
                <AnotherBar blub="">
                    <p>Children {sortFunc()}</p>
                </AnotherBar>
            </div>
        );
    }
}

export default ES6Class;
