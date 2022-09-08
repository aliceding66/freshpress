(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common-modules"],{

/***/ "../../../node_modules/core-js/modules/es.array.iterator.js":
/*!********************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/core-js/modules/es.array.iterator.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../../node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "../../../node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "../../../node_modules/core-js/modules/es.promise.finally.js":
/*!*********************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/core-js/modules/es.promise.finally.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../node_modules/core-js/internals/export.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../node_modules/core-js/internals/is-pure.js");
var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "../../../node_modules/core-js/internals/native-promise-constructor.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../node_modules/core-js/internals/fails.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../node_modules/core-js/internals/get-built-in.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../../node_modules/core-js/internals/species-constructor.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "../../../node_modules/core-js/internals/promise-resolve.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../../node_modules/core-js/internals/redefine.js");

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}


/***/ }),

/***/ "../../../node_modules/core-js/modules/es.regexp.exec.js":
/*!*****************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/core-js/modules/es.regexp.exec.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "../../../node_modules/core-js/internals/regexp-exec.js");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es.string.iterator.js":
/*!*********************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/core-js/modules/es.string.iterator.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "../../../node_modules/core-js/internals/string-multibyte.js").charAt;
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "../../../node_modules/core-js/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es.string.replace.js":
/*!********************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/core-js/modules/es.string.replace.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../node_modules/core-js/internals/an-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../../node_modules/core-js/internals/to-length.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../../node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../../../node_modules/core-js/internals/advance-string-index.js");
var getSubstitution = __webpack_require__(/*! ../internals/get-substitution */ "../../../node_modules/core-js/internals/get-substitution.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../../node_modules/core-js/internals/regexp-exec-abstract.js");

var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!*******************************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "../../../node_modules/core-js/internals/dom-iterables.js");
var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../node_modules/core-js/internals/create-non-enumerable-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "../../../node_modules/core-js/modules/web.url-search-params.js":
/*!************************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/core-js/modules/web.url-search-params.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(/*! ../modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
var $ = __webpack_require__(/*! ../internals/export */ "../../../node_modules/core-js/internals/export.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../node_modules/core-js/internals/get-built-in.js");
var USE_NATIVE_URL = __webpack_require__(/*! ../internals/native-url */ "../../../node_modules/core-js/internals/native-url.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../../node_modules/core-js/internals/redefine.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../../node_modules/core-js/internals/redefine-all.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../../node_modules/core-js/internals/set-to-string-tag.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "../../../node_modules/core-js/internals/create-iterator-constructor.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../node_modules/core-js/internals/internal-state.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../../node_modules/core-js/internals/an-instance.js");
var hasOwn = __webpack_require__(/*! ../internals/has */ "../../../node_modules/core-js/internals/has.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../../node_modules/core-js/internals/function-bind-context.js");
var classof = __webpack_require__(/*! ../internals/classof */ "../../../node_modules/core-js/internals/classof.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../node_modules/core-js/internals/is-object.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../../node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../node_modules/core-js/internals/create-property-descriptor.js");
var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "../../../node_modules/core-js/internals/get-iterator.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../../node_modules/core-js/internals/get-iterator-method.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../node_modules/core-js/internals/well-known-symbol.js");

var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: first.value + '', value: second.value + '' });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: name + '', value: value + '' });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674
if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
  $({ global: true, enumerable: true, forced: true }, {
    fetch: function fetch(input /* , init */) {
      var args = [input];
      var init, body, headers;
      if (arguments.length > 1) {
        init = arguments[1];
        if (isObject(init)) {
          body = init.body;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            init = create(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }
        args.push(init);
      } return $fetch.apply(this, args);
    }
  });
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/web.url.js":
/*!**********************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/core-js/modules/web.url.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(/*! ../modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
var $ = __webpack_require__(/*! ../internals/export */ "../../../node_modules/core-js/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../node_modules/core-js/internals/descriptors.js");
var USE_NATIVE_URL = __webpack_require__(/*! ../internals/native-url */ "../../../node_modules/core-js/internals/native-url.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../node_modules/core-js/internals/global.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "../../../node_modules/core-js/internals/object-define-properties.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../../node_modules/core-js/internals/redefine.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../../node_modules/core-js/internals/an-instance.js");
var has = __webpack_require__(/*! ../internals/has */ "../../../node_modules/core-js/internals/has.js");
var assign = __webpack_require__(/*! ../internals/object-assign */ "../../../node_modules/core-js/internals/object-assign.js");
var arrayFrom = __webpack_require__(/*! ../internals/array-from */ "../../../node_modules/core-js/internals/array-from.js");
var codeAt = __webpack_require__(/*! ../internals/string-multibyte */ "../../../node_modules/core-js/internals/string-multibyte.js").codeAt;
var toASCII = __webpack_require__(/*! ../internals/string-punycode-to-ascii */ "../../../node_modules/core-js/internals/string-punycode-to-ascii.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../../node_modules/core-js/internals/set-to-string-tag.js");
var URLSearchParamsModule = __webpack_require__(/*! ../modules/web.url-search-params */ "../../../node_modules/core-js/modules/web.url-search-params.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../node_modules/core-js/internals/internal-state.js");

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
/* eslint-disable no-control-regex -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\u0000\t\u000A\u000D #%/:?@[\\]]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\t\u000A\u000D #/:?@[\\]]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
var TAB_AND_NEW_LINE = /[\t\u000A\u000D]/g;
/* eslint-enable no-control-regex -- safe */
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements -- TODO
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ "../../../node_modules/swiper/esm/modules/observer/observer.js":
/*!***********************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/swiper/esm/modules/observer/observer.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ "../../../node_modules/ssr-window/ssr-window.esm.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/utils */ "../../../node_modules/swiper/esm/utils/utils.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var Observer = {
  attach: function attach(target, options) {
    if (options === void 0) {
      options = {};
    }

    var window = Object(ssr_window__WEBPACK_IMPORTED_MODULE_0__["getWindow"])();
    var swiper = this;
    var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
    var observer = new ObserverFunc(function (mutations) {
      // The observerUpdate event should only be triggered
      // once despite the number of mutations.  Additional
      // triggers are redundant and are very costly
      if (mutations.length === 1) {
        swiper.emit('observerUpdate', mutations[0]);
        return;
      }

      var observerUpdate = function observerUpdate() {
        swiper.emit('observerUpdate', mutations[0]);
      };

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(observerUpdate);
      } else {
        window.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });
    swiper.observer.observers.push(observer);
  },
  init: function init() {
    var swiper = this;
    if (!swiper.support.observer || !swiper.params.observer) return;

    if (swiper.params.observeParents) {
      var containerParents = swiper.$el.parents();

      for (var i = 0; i < containerParents.length; i += 1) {
        swiper.observer.attach(containerParents[i]);
      }
    } // Observe container


    swiper.observer.attach(swiper.$el[0], {
      childList: swiper.params.observeSlideChildren
    }); // Observe wrapper

    swiper.observer.attach(swiper.$wrapperEl[0], {
      attributes: false
    });
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.observer.observers.forEach(function (observer) {
      observer.disconnect();
    });
    swiper.observer.observers = [];
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'observer',
  params: {
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  },
  create: function create() {
    var swiper = this;
    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["bindModuleMethods"])(swiper, {
      observer: _extends({}, Observer, {
        observers: []
      })
    });
  },
  on: {
    init: function init(swiper) {
      swiper.observer.init();
    },
    destroy: function destroy(swiper) {
      swiper.observer.destroy();
    }
  }
});

/***/ }),

/***/ "../../../node_modules/swiper/esm/modules/resize/resize.js":
/*!*******************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/swiper/esm/modules/resize/resize.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ "../../../node_modules/ssr-window/ssr-window.esm.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/utils */ "../../../node_modules/swiper/esm/utils/utils.js");



var supportsResizeObserver = function supportsResizeObserver() {
  var window = Object(ssr_window__WEBPACK_IMPORTED_MODULE_0__["getWindow"])();
  return typeof window.ResizeObserver !== 'undefined';
};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'resize',
  create: function create() {
    var swiper = this;
    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["extend"])(swiper, {
      resize: {
        observer: null,
        createObserver: function createObserver() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.resize.observer = new ResizeObserver(function (entries) {
            var width = swiper.width,
                height = swiper.height;
            var newWidth = width;
            var newHeight = height;
            entries.forEach(function (_ref) {
              var contentBoxSize = _ref.contentBoxSize,
                  contentRect = _ref.contentRect,
                  target = _ref.target;
              if (target && target !== swiper.el) return;
              newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
              newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
            });

            if (newWidth !== width || newHeight !== height) {
              swiper.resize.resizeHandler();
            }
          });
          swiper.resize.observer.observe(swiper.el);
        },
        removeObserver: function removeObserver() {
          if (swiper.resize.observer && swiper.resize.observer.unobserve && swiper.el) {
            swiper.resize.observer.unobserve(swiper.el);
            swiper.resize.observer = null;
          }
        },
        resizeHandler: function resizeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.emit('beforeResize');
          swiper.emit('resize');
        },
        orientationChangeHandler: function orientationChangeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.emit('orientationchange');
        }
      }
    });
  },
  on: {
    init: function init(swiper) {
      var window = Object(ssr_window__WEBPACK_IMPORTED_MODULE_0__["getWindow"])();

      if (swiper.params.resizeObserver && supportsResizeObserver()) {
        swiper.resize.createObserver();
        return;
      } // Emit resize


      window.addEventListener('resize', swiper.resize.resizeHandler); // Emit orientationchange

      window.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
    destroy: function destroy(swiper) {
      var window = Object(ssr_window__WEBPACK_IMPORTED_MODULE_0__["getWindow"])();
      swiper.resize.removeObserver();
      window.removeEventListener('resize', swiper.resize.resizeHandler);
      window.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    }
  }
});

/***/ }),

/***/ "./scripts/modules/_animations.js":
/*!****************************************!*\
  !*** ./scripts/modules/_animations.js ***!
  \****************************************/
/*! exports provided: initAnimations, animate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAnimations", function() { return initAnimations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return animate; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);

const mainAnimateClass = 'fp-animate';
const offScreenResetClass = 'fp-animate--offscreen-reset';
const animationNameRegex = /fp-animate__([a-z_]+)/g;
const initAnimations = () => {
  const intersectingOptions = {
    root: null,
    rootMargin: '0px'
  };
  setTimeout(() => {
    const animationCallback = entries => {
      entries.forEach(entry => {
        const animationClass = entry.target.className.match(animationNameRegex);

        if (animationClass && Array.isArray(animationClass) && animationClass[0]) {
          const animationOnHoverClass = "".concat(animationClass[0], "--on-hover");

          if (!entry.target.classList.contains(animationOnHoverClass)) {
            const animationTriggerClass = "".concat(animationClass[0], "--animate");

            if (!entry.target.classList.contains(animationTriggerClass) && entry.isIntersecting) {
              entry.target.classList.add(animationTriggerClass);
            } else if (entry.target.classList.contains(animationTriggerClass) && !entry.isIntersecting && entry.target.classList.contains(offScreenResetClass)) {
              const currentStyle = entry.target.getAttribute('style');
              entry.target.setAttribute('style', 'animation-delay: 0s !important; animation-duration: 0s !important; transition-delay: 0s !important; transition-duration: 0s !important;');
              entry.target.classList.remove(animationTriggerClass);
              setTimeout(() => {
                entry.target.setAttribute('style', currentStyle ? currentStyle : '');
              }, 100);
            }
          }
        }
      });
    };

    wrapMultipleAnimations(); // eslint-disable-next-line no-undef

    const animationObserver = new IntersectionObserver(animationCallback, intersectingOptions);
    document.querySelectorAll(".".concat(mainAnimateClass)).forEach(animationNode => {
      animationObserver.observe(animationNode);
    });
  }, 100);
};

const wrapMultipleAnimations = () => {
  document.querySelectorAll(".".concat(mainAnimateClass)).forEach(animationNode => {
    const foundAnimations = animationNode.className.match(animationNameRegex);

    if (foundAnimations && Array.isArray(foundAnimations)) {
      const uniqueFoundAnimations = [...new Set(foundAnimations)];

      if (uniqueFoundAnimations.length > 1) {
        //Make multiple-animation wrappers for animations that are defined after first one
        for (let i = 1; i < uniqueFoundAnimations.length; ++i) {
          const multipleAnimationWrapper = document.createElement('DIV');
          multipleAnimationWrapper.classList.add('fp-animate');
          multipleAnimationWrapper.classList.add('fp-animate--multiple-animation');
          multipleAnimationWrapper.classList.add("".concat(uniqueFoundAnimations[i]));
          animationNode.classList.remove("".concat(uniqueFoundAnimations[i]));

          if (animationNode.classList.contains("".concat(uniqueFoundAnimations[i], "--on-hover"))) {
            multipleAnimationWrapper.classList.add("".concat(uniqueFoundAnimations[i], "--on-hover"));
            animationNode.classList.remove("".concat(uniqueFoundAnimations[i], "--on-hover"));
          } else if (animationNode.classList.contains(offScreenResetClass)) {
            multipleAnimationWrapper.classList.add(offScreenResetClass);
          }

          multipleAnimationWrapper.innerHTML = animationNode.outerHTML;
          animationNode.parentNode.replaceChild(multipleAnimationWrapper, animationNode);
        }
      }
    }
  });
};

const animate = function (node, animationName) {
  if (node && node.classList) {
    node.classList.add("fp-animate__".concat(animationName));
    node.classList.add("fp-animate__".concat(animationName, "--animate"));
  }
};

/***/ }),

/***/ "./scripts/modules/_cookies.js":
/*!*************************************!*\
  !*** ./scripts/modules/_cookies.js ***!
  \*************************************/
/*! exports provided: initCookieDefaults, createCookie, readCookie, eraseCookie, createCookieIfMissing, acceptCookiePolicy, declineCookiePolicy, isCookiePolicyAccepted, isCookiePolicyDeclined, initCookieModal, initCookiesModalListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initCookieDefaults", function() { return initCookieDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCookie", function() { return createCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readCookie", function() { return readCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eraseCookie", function() { return eraseCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCookieIfMissing", function() { return createCookieIfMissing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acceptCookiePolicy", function() { return acceptCookiePolicy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "declineCookiePolicy", function() { return declineCookiePolicy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCookiePolicyAccepted", function() { return isCookiePolicyAccepted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCookiePolicyDeclined", function() { return isCookiePolicyDeclined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initCookieModal", function() { return initCookieModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initCookiesModalListener", function() { return initCookiesModalListener; });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "../../../node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_utils */ "./scripts/helpers/_utils.js");
/**
 * Cookies module.
 *
 * Uses js-cookie to manage cookies.
 */


/**
 * Set up cookie default parameters.
 *
 * @param {Object} [options={}] Options for setting default parameters. Supports `path` and `domain` params.
 */

const initCookieDefaults = (options = {}) => {
  if ('string' === typeof options.path) {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.path = options.path;
  } else {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.path = '/';
  }

  if ('string' === typeof options.domain) {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.domain = options.domain;
  } else if ('function' === typeof scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_1__["getDomainFromFQDN"]) {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.domain = Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_1__["getDomainFromFQDN"])(window.location.host);
  } else {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.domain = window.location.host;
  }
};
/**
 * Sets a cookie value using the site defaults (path = /; domain = parent domain).
 *
 * @param {string} name Name of the cookie to be set.
 * @param {string} value Cookie value to be stored.
 * @param {number} days Number of days to set the cookie for.
 * @param {Object} [options={}] Full options object for js-cookie if needed.
 */

const createCookie = (name, value, days, options = {}) => {
  if (!js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults || !js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.path || !js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.domain) {
    initCookieDefaults();
  }

  if (days) {
    options.expires = days;
  }

  js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.set(name, value, options);
};
/**
 * Gets a cookie value by name.
 *
 * @param {string} name Name of the cookie to retrieve.
 * @return {string} Cookie value.
 */

const readCookie = name => {
  if (!js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults || !js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.path || !js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.domain) {
    initCookieDefaults();
  }

  return js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get(name);
};
/**
 * Removes a cookie by name.
 *
 * @param {string} name Name of the cookie to remove.
 * @param {Object} [options={}] Full options object for js-cookie if needed.
 */

const eraseCookie = (name, options = {}) => {
  if (!js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults || !js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.path || !js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.domain) {
    initCookieDefaults();
  }

  js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.remove(name, options);
};
/**
 * If a cookie is not already set, sets a cookie value using the site defaults (path = /; domain = parent domain).
 *
 * @param {string} name Name of the cookie to be set.
 * @param {string} value Cookie value to be stored.
 * @param {number} days Number of days to set the cookie for.
 * @param {Object} [options={}] Full options object for js-cookie if needed.
 */

const createCookieIfMissing = (name, value, days = null, options = {}) => {
  if (typeof readCookie(name) === 'undefined') {
    createCookie(name, value, days, options);
  }
};
/**
 * Set a cookie denoting cookie policy accepted.
 *
 */

const acceptCookiePolicy = () => {
  createCookie('cookies-declined', 'false', 365);
};
/**
 * Set a cookie denoting cookie policy declined, and optionally redirect with DNT param.
 *
 * @param {Object} [options={redirect:true}] Optional params: redirect - Should the function redirect with the fb_dnt param.
 */

const declineCookiePolicy = (options = {
  redirect: true
}) => {
  createCookie('cookies-declined', 'true', 30);

  if (options.redirect) {
    window.location.search = window.location.search ? "".concat(window.location.search, "&fb_dnt=1") : '?fb_dnt=1';
  }
};
/**
 * Is the cookie policy explicitly accepted.
 *
 * @return {boolean} Cookie policy accepted.
 */

const isCookiePolicyAccepted = () => {
  return readCookie('cookies-declined') === 'false';
};
/**
 * Is the cookie policy explicitly declined.
 *
 * @return {boolean} Cookie policy declined.
 */

const isCookiePolicyDeclined = () => {
  return readCookie('cookies-declined') === 'true';
};
/**
 * Initialize the cookie modal.
 */

const initCookieModal = () => {
  const modalCookies = document.querySelector('#modal-cookies');

  if (modalCookies) {
    const cookieName = 'banner-cookie-consent-dismissed';
    const legacyCookieName = 'banner-cookie-policy-dismissed';
    const buttonAccept = modalCookies.querySelector('.js-cookies-accept');
    const buttonDecline = modalCookies.querySelector('.js-cookies-decline');

    if (buttonAccept) {
      buttonAccept.addEventListener('click', e => {
        e.preventDefault();
        createCookie(cookieName, 'true', 365);
        createCookie(legacyCookieName, 'true', 365);
        $(modalCookies).modal('hide');
        acceptCookiePolicy();
      });
    }

    if (buttonDecline) {
      buttonDecline.addEventListener('click', e => {
        e.preventDefault();
        createCookie(cookieName, 'true', 30);
        createCookie(legacyCookieName, 'true', 30);
        $(modalCookies).modal('hide');
        declineCookiePolicy({
          redirect: true
        });
      });
    }
  }
};
/**
 * Initialise tracking-related events.
 */

const initCookiesModalListener = () => {
  const openCookiesModalTriggers = document.querySelectorAll('.js-openCookieModal');
  const modalCookies = document.querySelector('#modal-cookies');

  if (openCookiesModalTriggers) {
    openCookiesModalTriggers.forEach(openCookieModalItem => {
      openCookieModalItem.addEventListener('click', () => {
        $(modalCookies).modal('show');
      });
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/modules/_forms.js":
/*!***********************************!*\
  !*** ./scripts/modules/_forms.js ***!
  \***********************************/
/*! exports provided: initForms, filterInputFields, getAllForms, getAllFormFields, getFieldType, getFieldValue, setFieldValue, getValidationRules, validateField, validateAllFields */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initForms", function() { return initForms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterInputFields", function() { return filterInputFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllForms", function() { return getAllForms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllFormFields", function() { return getAllFormFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFieldType", function() { return getFieldType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFieldValue", function() { return getFieldValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFieldValue", function() { return setFieldValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValidationRules", function() { return getValidationRules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateField", function() { return validateField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateAllFields", function() { return validateAllFields; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_modules_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/modules/_validation */ "./scripts/modules/_validation.js");
/* harmony import */ var scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/helpers/_attributes */ "./scripts/helpers/_attributes.js");
/* harmony import */ var scripts_modules_signup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/modules/_signup */ "./scripts/modules/_signup.js");
/* harmony import */ var scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/helpers/_strings */ "./scripts/helpers/_strings.js");


/**
 * Forms module.
 */




/**
 * Initialise all forms on a page.
 */

const initForms = () => {
  const forms = getAllForms();

  if (forms && 'forEach' in forms) {
    forms.forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();
        const fields = validateAllFields(form);
        const formValid = fields.length === fields.filter(field => field.isValid).length;

        if (formValid) {
          form.classList.remove('was-validated');
          const handler = Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["getDataAttr"])(form, 'form-handler');

          if (handler === 'handleSignup') {
            Object(scripts_modules_signup__WEBPACK_IMPORTED_MODULE_3__["handleSignup"])(form);
          } else if (typeof handler === 'function') {
            handler.call(window, form);
          }
        } else {
          form.classList.add('was-validated');
          const firstError = form.querySelector('.form-control:invalid, .form-control-checkbox:invalid');

          if (firstError) {
            firstError.focus();
          }
        }
      });
      const fields = getAllFormFields(form);
      fields.forEach(field => {
        // check if field is a Select to handle on change event
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', () => {
            validateField(field);
          });
        } else {
          field.addEventListener('keyup', () => {
            validateField(field);
          });
        }
      });
    });
  }
};
/**
 * Filter an array of DOM elements - by default filtering by 'type' attribute.
 *
 * @param {Array|NodeList}  fields   Array or NodeList (array-like) of input field DOM elements.
 * @param {Array}           excludes Array of attribute values to filter.
 * @param {string}          attr     Attribute to filter on (defaults to 'type').
 */

const filterInputFields = (fields, excludes = ['button', 'submit', 'reset', 'image'], attr = 'type') => {
  return Array.from(fields).filter(el => !excludes.includes(el[attr]));
};
/**
 * Get all forms on a page (or in a container).
 *
 * @param {string|HTMLElement} [parent=document] A selector string or DOM element.
 */

const getAllForms = parent => {
  let forms = [];

  if ('string' === typeof parent) {
    parent = document.querySelector(parent);
  } else if (!parent) {
    parent = document;
  }

  if (parent && 'querySelectorAll' in parent) {
    forms = parent.querySelectorAll('form');
  }

  return forms;
};
/**
 * Get all fields within a form.
 *
 * @param {string|HTMLFormElement} form A selector string or DOM element.
 */

const getAllFormFields = form => {
  let fields = [];

  if ('string' === typeof form) {
    form = document.querySelector(form);
  }

  if (form && form instanceof window.HTMLFormElement) {
    if (form && form.elements) {
      fields = filterInputFields(form.elements);
    }
  }

  return fields;
};
/**
 * Get the type of a field.
 *
 * @param {HTMLElement} field A DOM element.
 */

const getFieldType = field => {
  let fieldType = Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["getDataAttr"])(field, 'type');

  if (fieldType) {
    return fieldType;
  }

  if (field.tagName) {
    const tagName = field.tagName.toLowerCase();

    if (tagName === 'input' && field.type) {
      fieldType = field.type;
    } else {
      fieldType = tagName;
    }
  }

  return fieldType;
};
/**
 * Get the value of a field.
 *
 * @param {HTMLElement} field A DOM element.
 */

const getFieldValue = field => {
  const fieldType = getFieldType(field);

  if ('select' === fieldType && field.multiple && field.selectedIndex >= 0) {
    const optArray = field.selectedOptions ? Array.from(field.selectedOptions) : Array.from(field.options).filter(opt => !!opt.selected);
    return optArray.map(opt => opt.value);
  }

  if ('checkbox' === fieldType || 'radio' === fieldType) {
    return field.checked;
  }

  return field.value;
};
/**
 * Set the value of a field.
 *
 * @param {HTMLElement} field A DOM element.
 * @param {*}           value Value to set for the input field.
 * @return {HTMLElement} field element returned for chaining.
 */

const setFieldValue = (field, value) => {
  const fieldType = getFieldType(field);

  if ('select' === fieldType && field.multiple && Array.isArray(value)) {
    field.value = null;
    Array.from(field.options).filter(opt => value.includes(opt.value)).forEach(opt => {
      opt.selected = true;
    });
  } else if ('checkbox' === fieldType || 'radio' === fieldType) {
    field.checked = !!value;
  } else if (undefined !== value) {
    if (value && field.maxLength && field.maxLength > 0 && value.length > field.maxLength) {
      field.value = value.slice(0, field.maxLength);
    } else {
      field.value = value;
    }
  }

  return field;
};
/**
 * Get the validation type of a field (data-validation).
 *
 * @param {HTMLElement} field Expects a DOM element
 * @return {Array} Types of validation required for this field.
 */

const getValidationRules = field => {
  let validationRules = [];

  if (field && field.dataset && field.dataset.validation) {
    validationRules = field.dataset.validation.split(' ');
  } else {
    const fieldType = getFieldType(field);

    if (fieldType === 'email') {
      validationRules.push('isEmail');
    } else if (fieldType === 'tel') {
      validationRules.push('isPhone');
    }
  }

  if (Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["hasAttrOrData"])(field, 'required')) {
    validationRules.push('required');
  }

  return validationRules.map(rule => Object(scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_4__["toCamelCase"])(rule));
};
/**
 * Validate a field.
 *
 * @param {HTMLElement} field Expects a DOM element.
 * @return {boolean} Field validity.
 */

const validateField = field => {
  if (!field || !field.validity) {
    return;
  }

  const validationRules = getValidationRules(field);
  const fieldVal = getFieldValue(field);
  const tooltip = field.parentNode ? field.parentNode.querySelector('.invalid-tooltip') : false;
  const validationOptions = {
    allowZero: Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["hasDataAttr"])(field, 'allow-zero'),
    allowSpaces: Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["hasDataAttr"])(field, 'allow-spaces')
  };
  field.setCustomValidity(''); // Reset validity for this field.

  if (tooltip) {
    tooltip.innerHTML = field.validationMessage;
  } // Check if field is required.


  if (validationRules.includes('required') && scripts_modules_validation__WEBPACK_IMPORTED_MODULE_1__["isEmpty"](fieldVal, validationOptions)) {
    field.setCustomValidity('This field is required');

    if (tooltip) {
      tooltip.innerHTML = field.validationMessage;
    }

    return field.validity.valid;
  }

  if (!scripts_modules_validation__WEBPACK_IMPORTED_MODULE_1__["isEmpty"](validationRules)) {
    // Check field type validation.
    validationRules.forEach(rule => {
      const notRule = rule.startsWith('not') && rule.replace(/^not([A-Z])/, 'is$1');

      if (typeof scripts_modules_validation__WEBPACK_IMPORTED_MODULE_1__[rule] === 'function' && !scripts_modules_validation__WEBPACK_IMPORTED_MODULE_1__[rule](fieldVal)) {
        field.setCustomValidity('This field is invalid');
      } else if (typeof scripts_modules_validation__WEBPACK_IMPORTED_MODULE_1__[notRule] === 'function' && scripts_modules_validation__WEBPACK_IMPORTED_MODULE_1__[notRule](fieldVal)) {
        field.setCustomValidity('This field is invalid');
      }

      if (tooltip) {
        tooltip.innerHTML = field.validationMessage;
      }

      if (!field.validity.valid) {
        return field.validity.valid;
      }
    });
  } // Check the length of the field value.


  const stringFieldVal = fieldVal.toString().trim();
  const minLength = Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["getAttrOrData"])(field, 'minlength') || 0;
  const maxLength = Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["getAttrOrData"])(field, 'maxlength') || window.Number.MAX_SAFE_INTEGER;

  if (minLength > 0 || maxLength < window.Number.MAX_SAFE_INTEGER) {
    if (stringFieldVal.length < minLength) {
      field.setCustomValidity("Value is too short: minimum length is ".concat(minLength));
    } else if (stringFieldVal.length > maxLength) {
      field.setCustomValidity("Value is too long: maximum length is ".concat(maxLength));
    }

    if (tooltip) {
      tooltip.innerHTML = field.validationMessage;
    }
  } // NOTE: Disabled until isInRange fixed.
  // if ( ( minLength && minLength > 0 ) || ( maxLength && maxLength > 0 ) ) {
  // 	const lengthValidation = _validation.isInRange(
  // 		stringFieldVal.length,
  // 		minLength,
  // 		maxLength
  // 	);
  // 	if ( minLength > 0 && lengthValidation < 0 ) {
  // 		msg = `Value is too short: minimum length is ${ minLength }`;
  // 		field.setCustomValidity( msg );
  // 	} else if ( maxLength < window.Number.MAX_SAFE_INTEGER && lengthValidation > 0 ) {
  // 		msg = `Value is too long: maximum length is ${ maxLength }`;
  // 		field.setCustomValidity( msg );
  // 	}
  // }


  return field.validity.valid;
};
/**
 * Validate all fields within a form.
 *
 * @param {string|HTMLFormElement} form A selector string or DOM element.
 * @return {Array} All fields and their validity.
 */

const validateAllFields = form => {
  const fields = [];
  getAllFormFields(form).forEach(el => {
    fields.push({
      field: el,
      isValid: validateField(el)
    });
  });
  return fields;
};

/***/ }),

/***/ "./scripts/modules/_i18n.js":
/*!**********************************!*\
  !*** ./scripts/modules/_i18n.js ***!
  \**********************************/
/*! exports provided: getSiteCountryCode, getBillingCountryCode, getLanguage, getUserCountryCode, getSiteCountryCodes, getSuggestedCountryCode, getUserCountryName, getUserCurrencyCode, getUserRegionCode, setUserCountryCode, setUserCountryName, getAppCountryList, getAppCountryCodes, getAppCountryNames, setRegionCookies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSiteCountryCode", function() { return getSiteCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBillingCountryCode", function() { return getBillingCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLanguage", function() { return getLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserCountryCode", function() { return getUserCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSiteCountryCodes", function() { return getSiteCountryCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSuggestedCountryCode", function() { return getSuggestedCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserCountryName", function() { return getUserCountryName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserCurrencyCode", function() { return getUserCurrencyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserRegionCode", function() { return getUserRegionCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUserCountryCode", function() { return setUserCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUserCountryName", function() { return setUserCountryName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppCountryList", function() { return getAppCountryList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppCountryCodes", function() { return getAppCountryCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppCountryNames", function() { return getAppCountryNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRegionCookies", function() { return setRegionCookies; });
/* harmony import */ var mui_utils_country_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mui/utils/country/list */ "./vendor/magnum-ui/utils/country/list.js");
/* harmony import */ var scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/modules/_cookies */ "./scripts/modules/_cookies.js");
/* harmony import */ var scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/helpers/_strings */ "./scripts/helpers/_strings.js");
/* harmony import */ var scripts_json_country_to_currency_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/json/country-to-currency.json */ "./scripts/json/country-to-currency.json");
var scripts_json_country_to_currency_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! scripts/json/country-to-currency.json */ "./scripts/json/country-to-currency.json", 1);
/**
 * Internationalization module.
 */




const i18nVars = window.fbVars && window.fbVars.i18n ? window.fbVars.i18n : {};
/**
 * Gets site's country as 2-character code.
 *
 * @param {string} [format=upper] Set casing of return value.
 * @return {string} 2 character country code w/ chosen casing.
 */

const getSiteCountryCode = (format = 'upper') => {
  const countryCode = i18nVars.siteCountryCode || 'US';
  return format === 'lower' ? countryCode.toLowerCase() : countryCode.toUpperCase();
};
/**
 * Gets billing country code as 2-character uppercase code.
 *
 * @return {string} Uppercase billing country code.
 */

const getBillingCountryCode = () => (i18nVars.siteCountryCode || 'US').toUpperCase();
/**
 * Gets the site language as lowercase 2-character code.
 *
 * @return {string} Lowercase 2 character country code.
 */

const getLanguage = () => i18nVars.siteLangCode || 'en';
/**
 * Gets the user's country as 2-character code.
 *
 * @param {string} [format=upper] Set casing of return value.
 * @return {string} 2 character country code selected by user.
 */

const getUserCountryCode = (format = 'upper') => {
  const countryCode = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('user-country-code') || 'US';

  if (format === 'lower') {
    return countryCode.toLowerCase();
  }

  return countryCode.toUpperCase();
};
/**
 * Get the 2-character codes for all supported site countries.
 *
 * @return {Array} All supported country codes
 */

const getSiteCountryCodes = () => {
  if (i18nVars.supportedRegions) {
    const siteCountryCodes = Object.keys(i18nVars.supportedRegions);

    if (Array.isArray(siteCountryCodes)) {
      return siteCountryCodes;
    }
  }

  return ['us'];
};
/**
 * Get the 2-character country code for the site we think is the correct region for the user.
 *
 * @param {string} [format=upper] Set casing of return value.
 * @return {string} Country code based off detected location and supported list.
 */

const getSuggestedCountryCode = (format = 'upper') => {
  const countryCode = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('user-country-code');

  if (typeof countryCode === 'string') {
    const siteCountryCodes = getSiteCountryCodes();

    if (siteCountryCodes.indexOf(countryCode.toLowerCase()) !== -1) {
      return format === 'lower' ? countryCode.toLowerCase() : countryCode.toUpperCase();
    }
  }

  return format === 'lower' ? 'us' : 'US';
};
/**
 * Gets the user's country as a full name.
 *
 * @return {string} Full country name.
 */

const getUserCountryName = () => Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('user-country-name') || 'United States';
/**
 * Gets the relevant currency code for the user's country.
 *
 * @return {string} Country currency code.
 */

const getUserCurrencyCode = () => {
  const countryCodeCookie = getUserCountryCode();
  return countryCodeCookie in scripts_json_country_to_currency_json__WEBPACK_IMPORTED_MODULE_3__ ? scripts_json_country_to_currency_json__WEBPACK_IMPORTED_MODULE_3__[countryCodeCookie] : 'USD';
};
/**
 * Gets the user region as a lang-country locale code.
 *
 * @return {string} Language-Country code (ex. en-CA).
 */

const getUserRegionCode = () => "".concat(getLanguage(), "-").concat(getUserCountryCode('lower'));
/**
 * Sets a cookie with the country code (converted to uppercase) for 1 year.
 *
 * @param {string} [countryCode=US] Two letter country code
 */

const setUserCountryCode = countryCode => {
  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["createCookie"])('user-country-code', (countryCode || 'US').toUpperCase(), 365);
};
/**
 * Sets a cookie with the country name (converted to title case) for 1 year.
 *
 * @param {string} [countryName=United States] Full name of country
 */

const setUserCountryName = countryName => {
  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["createCookie"])('user-country-name', Object(scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_2__["toTitleCase"])(countryName || 'United States', {
    exceptions: /^(and|of|the)$/
  }), 365);
};
/**
 * Get an array of all FreshBooks supported countries, with both code and name returned.
 *
 * @return {Array} All supported country codes and names.
 */

const getAppCountryList = () => mui_utils_country_list__WEBPACK_IMPORTED_MODULE_0__["default"].map(el => {
  if (el.name && el.name.common && el.name.short) {
    return {
      code: el.name.short,
      name: el.name.common
    };
  }

  return false;
}).filter(el => el);
/**
 * Get an array of all FreshBooks supported country codes.
 *
 * @return {Array} All supported country codes.
 */

const getAppCountryCodes = () => getAppCountryList().map(el => el.code);
/**
 * Get an array of all FreshBooks supported country names.
 *
 * @return {Array} All supported country names.
 */

const getAppCountryNames = () => getAppCountryList().map(el => el.name);
/**
 * By default, get Fastly country code when present. When user sets their region, this user country code
 * cookie will be updated with that value.
 */

const setRegionCookies = () => {
  const fastlyValueCode = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('country-code');
  const fastlyValueName = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('country-name');

  if (!Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('user-country-code')) {
    setUserCountryCode(fastlyValueCode);
  }

  if (!Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('user-country-name')) {
    setUserCountryName(fastlyValueName);
  }

  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["createCookie"])('billing_country_code', getBillingCountryCode());
  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["createCookie"])('fb_language', getLanguage());
};

/***/ }),

/***/ "./scripts/modules/_signup.js":
/*!************************************!*\
  !*** ./scripts/modules/_signup.js ***!
  \************************************/
/*! exports provided: handleSignup, handleSsoSignup, signupCookiesAccepted */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleSignup", function() { return handleSignup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleSsoSignup", function() { return handleSsoSignup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signupCookiesAccepted", function() { return signupCookiesAccepted; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/modules/_cookies */ "./scripts/modules/_cookies.js");
/* harmony import */ var scripts_modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/modules/_forms */ "./scripts/modules/_forms.js");
/* harmony import */ var scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/modules/_i18n */ "./scripts/modules/_i18n.js");
/* harmony import */ var scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/helpers/_attributes */ "./scripts/helpers/_attributes.js");
/* harmony import */ var scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/modules/_tracking */ "./scripts/modules/_tracking.js");
/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bootstrap/js/dist/modal */ "../../../node_modules/bootstrap/js/dist/modal.js");
/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_7__);



/**
 * Signup module.
 */






/**
 * Set parameters for a signup request, and process the response.
 *
 * @param {Object} form Form object which is being submitted from.
 */

const handleSignup = form => {
  if (signupCookiesAccepted()) {
    const action = Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_5__["getAttrOrData"])(form, 'action');
    let referralId = null;

    if (Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('fb_landing_url') !== null) {
      const referralCookie = decodeURIComponent(Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('fb_landing_url')).match('[?&]ref=([^&#]*)');

      if (referralCookie && referralCookie.length) {
        [, referralId] = referralCookie;
      }
    }

    const formData = {
      id: Object(scripts_modules_forms__WEBPACK_IMPORTED_MODULE_3__["getFieldValue"])(form.email),
      email: Object(scripts_modules_forms__WEBPACK_IMPORTED_MODULE_3__["getFieldValue"])(form.email),
      password: Object(scripts_modules_forms__WEBPACK_IMPORTED_MODULE_3__["getFieldValue"])(form.password),
      landing_url: decodeURIComponent(Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('fb_landing_url')),
      provisioner: 'magnum',
      send_confirmation_notification: true,
      visitor_id: Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_6__["getVisitorId"])(),
      access_token: null,
      capacity: null,
      billing_country_code: Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__["getBillingCountryCode"])(),
      country: Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__["getUserCountryName"])(),
      currencyCode: Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__["getUserCurrencyCode"])(),
      language: Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__["getLanguage"])(),
      optimizely_buckets: Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('optimizely_buckets'),
      optimizely_user_id: Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('optimizely_user_id'),
      referralid: referralId,
      referring_url: decodeURIComponent(Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('fb_referring_url')),
      web_promo: Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('fb_web_promo'),
      skip_business: false,
      skip_system: false
    };
    window.fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => response.json()).then(registerResponse => {
      if (registerResponse.response) {
        const signupRedirect = "https://".concat(window.fbVars.fbDomains.auth, "/integrations/confirm?email=").concat(encodeURIComponent(formData.email), "&firstVisit=true");
        window.fetch("https://".concat(window.fbVars.fbDomains.api, "/auth/api/v1/users/me"), {
          method: 'GET',
          headers: {
            Authorization: "Bearer ".concat(registerResponse.response.access_token)
          }
        }).then(response => response.json()).then(apiResponse => {
          if (form.classList.contains('hero__signup-form')) {
            Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_6__["trackEvent"])('optimizely', 'User-Hero-Sign-Up');
          }

          Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_6__["trackEvent"])('optimizely', 'smux_account_signup'); // Separate GTM push for accountid so it's available to later pushes.

          if (apiResponse && apiResponse.account_id) {
            Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_6__["track"])('gtm', {
              accountid: apiResponse.account_id
            });
          }

          Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_6__["track"])('gtm', {
            classic_or_nfb: 'nfb',
            event: 'smux.account.signup'
          });
          window.location = signupRedirect;
        });
      } else if (registerResponse.error_description) {
        const emailField = form.email;
        const emailTooltip = form.querySelector('input[name="email"] ~ .invalid-tooltip');
        let errorMessage = registerResponse.error_description.replace('Validation failed: ', '');

        if (registerResponse.error === 'unprocessable_entity') {
          errorMessage = 'This field is invalid';
        }

        emailTooltip.innerHTML = errorMessage;
        emailField.setCustomValidity(errorMessage);
        form.classList.add('was-validated');
        emailField.focus();
      }
    });
  }
};
/**
 * Signup with SSO provider. If provider string indicated, will supply the url based on the provider.
 * Otherwise, provider URL will be based off the SSO button class.
 *
 * @param {string} provider SSO Provider as a string ("google" or "apple").
 */

const handleSsoSignup = provider => {
  if ('google' === provider || 'apple' === provider) {
    const authEndpoint = provider === 'google' ? 'google_oauth2_central_sso' : provider;
    const signupButtons = document.querySelectorAll(".sso-signup_".concat(provider));
    const tosCheckbox = document.querySelector('#tos-accepted');

    if (signupButtons) {
      signupButtons.forEach(signupButton => {
        signupButton.addEventListener('click', e => {
          e.preventDefault();

          if (signupCookiesAccepted()) {
            Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_6__["trackEvent"])('gtm', "".concat(provider, "sso.signup.triggered"));
            const href = signupButton.getAttribute('href');

            if (tosCheckbox && tosCheckbox.checked || !tosCheckbox) {
              if (href && href.length > 1 && href !== '#') {
                window.location.href = signupButton.href;
              } else {
                window.location.href = "https://".concat(window.fbVars.fbDomains.auth, "/service/auth/auth/").concat(authEndpoint, "?intent=sign_up");
              }
            }
          }
        });
      });
    }
  }
};
/**
 * Checks the cookie policy prior to signup.
 */

const signupCookiesAccepted = () => {
  const tosCheckbox = document.querySelector('#tos-accepted');

  if (Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["isCookiePolicyAccepted"])() || tosCheckbox.checked) {
    if (!Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('cookies-declined')) {
      Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["acceptCookiePolicy"])();
    }

    return true;
  }

  const $modalCookies = $('#modal-cookies');

  if ($modalCookies && $modalCookies.length) {
    $('#modal-cookies').modal('show');
  }

  return false;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/modules/_tracking.js":
/*!**************************************!*\
  !*** ./scripts/modules/_tracking.js ***!
  \**************************************/
/*! exports provided: track, trackEvent, isProviderActive, getVisitorId, setGlobalDataLayer, addLinkTracking, initAttributionTracking */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "track", function() { return track; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackEvent", function() { return trackEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProviderActive", function() { return isProviderActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisitorId", function() { return getVisitorId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGlobalDataLayer", function() { return setGlobalDataLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLinkTracking", function() { return addLinkTracking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAttributionTracking", function() { return initAttributionTracking; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid_dist_v4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid/dist/v4 */ "../../../node_modules/uuid/dist/v4.js");
/* harmony import */ var uuid_dist_v4__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid_dist_v4__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/modules/_cookies */ "./scripts/modules/_cookies.js");
/* harmony import */ var scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/modules/_i18n */ "./scripts/modules/_i18n.js");
/* harmony import */ var scripts_helpers_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/helpers/_events */ "./scripts/helpers/_events.js");
/* harmony import */ var scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/helpers/_utils */ "./scripts/helpers/_utils.js");


/**
 * Tracking module.
 */





/**
 * Gets the provider object by name.
 *
 * @param {string} provider Name of provider to retrieve.
 * @return {Object|null} The tracking provider object in use.
 */

const getTracker = provider => {
  let tracker = null;

  if (typeof provider === 'string') {
    const providerKey = provider.toLowerCase();

    if (providerKey === 'datalayer' || providerKey === 'gtm') {
      tracker = window.dataLayer;
    } else if (providerKey === 'optimizely') {
      tracker = window.optimizely;
    }
  }

  return tracker;
};
/**
 * Track some data with a tracking provider.
 *
 * @param {string} provider Tracking provider - should probably be 'gtm' or 'optimizely'.
 * @param {Object} data     Data to be tracked.
 * @param {string} fn       Provider function used for tracking. Defaults to 'push'.
 */


const track = (provider, data, fn = 'push') => {
  if (data && provider) {
    const tracker = getTracker(provider);

    if (tracker && typeof tracker[fn] === 'function') {
      tracker[fn](data);
    }
  }
};
/**
 * Track an event with a tracking provider.
 *
 * @param {string} provider Tracking provider - should probably be 'gtm' or 'optimizely'.
 * @param {string} name     Name of the event to track.
 * @param {string} fn       Provider function used for tracking.
 */

const trackEvent = (provider, name, fn) => {
  if (provider === 'optimizely') {
    track(provider, {
      type: 'event',
      eventName: name
    }, fn);
  } else {
    track(provider, {
      event: name
    }, fn);
  }
};
/**
 * Test if a provider is active by looking for its presence in the window object, and then
 * checking if the function/variable specified is defined.
 *
 * @param {string} provider Tracking provider - should probably be 'gtm' or 'optimizely'.
 * @param {string} test     Function or variable name to test for. Defaults to 'push'.
 * @return {boolean} Is tracking provider active.
 */

const isProviderActive = (provider, test = 'push') => {
  let active = false;

  if (provider) {
    const tracker = getTracker(provider);
    active = tracker && typeof tracker[test] !== 'undefined';
  }

  return active;
};
/**
 * Get the cookie fb_visitor_id, if not already set, create a v4 UUID and set the cookie.
 */

const getVisitorId = () => {
  let visitorId = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('fb_visitor_id');

  if (!visitorId) {
    visitorId = uuid_dist_v4__WEBPACK_IMPORTED_MODULE_1___default()();
    Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["createCookie"])('fb_visitor_id', visitorId, 365);
  }

  return visitorId;
};
/**
 * DataLayer global init.
 */

const setGlobalDataLayer = () => {
  track('gtm', {
    accountid: undefined,
    customerType: undefined,
    user_role: undefined,
    classic_or_nfb: undefined,
    plan_name: undefined,
    identity_id: undefined,
    business_id: undefined,
    visitorId: getVisitorId(),
    visitor_country: Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_3__["getSiteCountryCode"])(),
    visitor_language: Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_3__["getLanguage"])()
  });
};
/**
 * Tracks all CTAs on a page.
 */

const addLinkTracking = () => {
  const trackableEntities = document.querySelectorAll('.btn-cta-green, .btn-white, a, button');
  trackableEntities.forEach(entity => {
    if (entity && (entity.closest('div[data-cta-section]') || entity.closest('a[data-cta-section]'))) {
      return false;
    }

    let event = 'linkClick';

    if (entity.classList.contains('btn-cta-green') || entity.classList.contains('btn-white') || entity.classList.contains('btn-outline-grey')) {
      event = 'ctaClick';
    }

    const ctaContainer = entity.closest('.fp-block');

    if (ctaContainer) {
      const blockClassList = Array.from(ctaContainer.classList);
      let ctaSection;

      if (blockClassList) {
        blockClassList.forEach(className => {
          if (className.indexOf('trackingSection-') === 0) {
            ctaSection = className.replace('trackingSection-', '');
          }
        });
      }

      Object(scripts_helpers_events__WEBPACK_IMPORTED_MODULE_4__["addEventListeners"])(entity, 'click mousedown', e => {
        // Make sure a click event doesn't trigger twice.
        if (e.type === 'click' || e.button && [1, 2].includes(e.button)) {
          let ctaText = entity.innerText.replace(/\s/g, '').toLowerCase();

          if (entity.contains(entity.querySelector('img'))) {
            ctaText = 'Image alt tag not present';

            if (entity.querySelector('img').getAttribute('alt') !== '') {
              ctaText = entity.querySelector('img').getAttribute('alt');
            }
          }

          track('gtm', {
            event,
            ctaText,
            ctaSection
          });
        }
      });
    }
  });
};
/**
 * Set core attribution tracking cookies.
 *
 * @param {number|Date} expiry When should the cookies expire.
 */

const setCoreCookies = (expiry = 30) => {
  const landingTime = new Date().toISOString().replace(/^([\d-]+)T([\d:]+).*Z$/, '$1+$2');
  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["createCookieIfMissing"])('fb_landing_time', landingTime, expiry);
  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["createCookieIfMissing"])('fb_landtime', landingTime, expiry);
  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["createCookieIfMissing"])('fb_landing_url', window.location.href, expiry);
  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["createCookieIfMissing"])('fb_entrypage', window.location.pathname, expiry);

  if (document.referrer) {
    Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["createCookieIfMissing"])('fb_referring_url', document.referrer, expiry);
    Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["createCookieIfMissing"])('fb_referrer', document.referrer, expiry);
  }
};
/**
 * Set parameter based attribution tracking cookies (e.g., fb_referral_id).
 *
 * @param {Object} params Parameters used for setting attribution cookies.
 * @param {number|Date} expiry When should the cookies expire.
 */


const setParamCookies = (params = {}, expiry = 30) => {
  const cookies = {};

  if (params.ref) {
    cookies.fb_referral_id = params.ref;
    cookies.cookie_referral = params.ref;
    cookies.cookie_referral_type = params.reftype;
    cookies.cookie_referral_params = decodeURIComponent(window.location.search.replace(/^\?/, ''));
    cookies.referral_present = true;
    const existingCookieReferral = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('cookie_referral');

    if (existingCookieReferral && !Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('initial_cookie_referral')) {
      cookies.initial_cookie_referral = existingCookieReferral;
    }

    if (params.fb_source) {
      cookies.cookie_referral_source = params.fb_source;
    }
  }

  if (params.ref_systemid) {
    cookies.cookie_referral_systemid = params.ref_systemid;
  }

  if (params.c1 && params.source && params.kw) {
    cookies.referral_present = true;
    const existingCookieC1 = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('cookie_c1');
    const existingCookieSource = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('cookie_source');
    const existingCookieKw = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('cookie_kw');
    const existingCookieTime = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('cookie_time');

    if (existingCookieC1 && existingCookieSource && existingCookieKw && existingCookieTime && !Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('initial_cookie_c1') && !Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('initial_cookie_source') && !Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('initial_cookie_time')) {
      cookies.initial_cookie_c1 = existingCookieC1;
      cookies.initial_cookie_source = existingCookieSource;
      cookies.initial_cookie_kw = existingCookieKw;
      cookies.initial_cookie_time = existingCookieTime;
    }

    cookies.cookie_c1 = params.c1;
    cookies.cookie_source = params.source;
    cookies.cookie_kw = params.kw;
    cookies.cookie_time = Math.floor(Date.now() / 1000);
  }

  Object.keys(cookies).forEach(name => {
    if (cookies[name]) {
      Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["createCookie"])(name, cookies[name], expiry);
    }
  });
};
/**
 * Initialise our attribution tracking logic.
 */


const initAttributionTracking = () => {
  if (!Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["isCookiePolicyDeclined"])()) {
    const now = new Date();
    const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000 * 30);
    const params = Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["parseQueryString"])(window.location.search);
    const existingLandingUrl = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('fb_landing_url');
    const existingLandingParams = Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["parseQueryString"])(existingLandingUrl);
    const noNewRef = !params.ref && existingLandingParams.ref;
    const preserveRef = existingLandingUrl && Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["isSameDomain"])(document.referrer || '') && (!params.ref || existingLandingParams.ref === params.ref);

    if (!noNewRef && !preserveRef) {
      setCoreCookies(expiry);
    }

    if (params) {
      setParamCookies(params, expiry);
    }
  }
};

/***/ }),

/***/ "./scripts/modules/_validation.js":
/*!****************************************!*\
  !*** ./scripts/modules/_validation.js ***!
  \****************************************/
/*! exports provided: isEmpty, isAlpha, isAlphanumeric, isNumber, isPostalCode, isURL, isEmail, isPhone, isInRange, matchesPatterns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAlpha", function() { return isAlpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAlphanumeric", function() { return isAlphanumeric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPostalCode", function() { return isPostalCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isURL", function() { return isURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmail", function() { return isEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPhone", function() { return isPhone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInRange", function() { return isInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchesPatterns", function() { return matchesPatterns; });
/* harmony import */ var validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! validator/lib/isEmail */ "../../../node_modules/validator/lib/isEmail.js");
/* harmony import */ var validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isNumeric */ "../../../node_modules/validator/lib/isNumeric.js");
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var validator_lib_isPostalCode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! validator/lib/isPostalCode */ "../../../node_modules/validator/lib/isPostalCode.js");
/* harmony import */ var validator_lib_isPostalCode__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isPostalCode__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var validator_lib_isURL__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! validator/lib/isURL */ "../../../node_modules/validator/lib/isURL.js");
/* harmony import */ var validator_lib_isURL__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isURL__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var is_plain_obj__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! is-plain-obj */ "../../../node_modules/is-plain-obj/index.js");
/* harmony import */ var is_plain_obj__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(is_plain_obj__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Validation module.
 */





const regex = {
  alpha: /^[a-zA-Z ]+$/,
  alphaNumeric: /^[a-zA-Z0-9 ]+$/,
  phoneNumber: /^\+?[0-9\-\s\.\(\)#x]+$/
};
/**
 * Determines if a string is empty.
 *
 * @param {*} data var to be checked.
 * @param {Object} options Options to allow different interpretations of the data.
 */

const isEmpty = (data, options = {}) => {
  const {
    allowZero = false,
    allowSpaces = false
  } = options;
  const dataType = typeof data;

  if (dataType === 'undefined') {
    return true;
  } // Number.


  if (dataType === 'number') {
    return !(data || data === 0 && allowZero);
  } // A plain object.


  if (dataType === 'object' && is_plain_obj__WEBPACK_IMPORTED_MODULE_4___default()(data)) {
    return Object.keys(data).length === 0;
  }

  if (dataType === 'string' && !allowSpaces) {
    data = data.trim();
  } // For strings and arrays, check length.


  if (data && data.length === 0) {
    return true;
  } // All other cases are truthy/falsey.


  return !data;
};
/**
 * Checks if a given string is alpha (with spaces).
 *
 * @param {string} string String to be checked.
 */

const isAlpha = string => {
  if (!isEmpty(string)) {
    return regex.alpha.test(string);
  }

  return false;
};
/**
 * Checks if a given string is alphanumeric (with spaces).
 *
 * @param {string} string String to be checked.
 */

const isAlphanumeric = string => {
  if (!isEmpty(string)) {
    return regex.alphaNumeric.test(string);
  }

  return false;
};
/**
 * Checks if a given value is numeric.
 *
 * @param {string} string string to be checked.
 */

const isNumber = string => {
  if (!isEmpty(string)) {
    return validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1___default()(string);
  }

  return false;
};
/**
 * Checks if a given value is a Postal Code.
 *
 * @param {string} string string to be checked.
 * @param {string} locale the locale to check the string against.
 */

const isPostalCode = (string, locale = 'US') => {
  if (!isEmpty(string)) {
    return validator_lib_isPostalCode__WEBPACK_IMPORTED_MODULE_2___default()(string, locale);
  }

  return false;
};
/**
 * Checks if a given value is a URL.
 *
 * @param {string} url string to be checked.
 */

const isURL = url => {
  if (!isEmpty(url)) {
    return validator_lib_isURL__WEBPACK_IMPORTED_MODULE_3___default()(url);
  }

  return false;
};
/**
 * Checks if a given email is valid.
 *
 * @param {string} email String to be checked.
 */

const isEmail = email => {
  if (!isEmpty(email)) {
    return validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_0___default()(email);
  }

  return false;
};
/**
 * Checks if a given phone is valid.
 *
 * @param {string} phone String to be checked.
 */

const isPhone = phone => {
  if (!isEmpty(phone)) {
    return regex.phoneNumber.test(phone);
  }

  return false;
};
/**
 * Checks if a given number is within a range.
 *
 * @param {number} number Number to be checked.
 * @param {number} min The minimum value of the range.
 * @param {number} max The maximum value of the range.
 */

const isInRange = (number, min, max) => {
  if ([number, min, max].filter(arg => 'number' === typeof arg && !isEmpty(arg, {
    allowZero: true
  })).length === 3) {
    return number >= min && number <= max;
  }

  return false;
};
/**
 * Compares data against a given set of patterns.
 *
 * @param {Object} data Entity to be checked.
 * @param {Array} patterns A set of patterns to check the entity against.
 */

const matchesPatterns = (data, patterns = []) => {
  if (!isEmpty(data)) {
    return patterns.length && patterns.length === patterns.filter(pattern => pattern.test(data)).length;
  }
};

/***/ })

}]);
//# sourceMappingURL=common-modules.js.map