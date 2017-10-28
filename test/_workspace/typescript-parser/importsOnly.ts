import 'stringImport';
import { Specifier1, Specifier2, Specifier3 } from 'namedImport';
import { Specifier1 as Alias1 } from 'namedAliasedImport';
import * as namespaceImport from 'namespace';
import external = require('externalModule');
import {
    Spec1,
    Spec2 as Alias2
} from 'multiLineImport';
import Foobar from 'aFile';
import { default as DefaultAlias, Specifier1 } from 'namedImport';
import DefaultAlias, { Specifier1 } from 'namedImport';
import { default as __DefaultAlias, Specifier1 as __Specifier1 } from 'namedImport';
import __DefaultAlias, { Specifier1 as __Specifier1 } from 'namedImport';
import * as __namespaceImport from 'namespace';