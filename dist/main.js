!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=85)}([function(t,e,r){"use strict";var n=r(83),i={groupBy:"http://druid.io/docs/0.6.121/GroupByQuery.html",search:"http://druid.io/docs/0.6.121/SearchQuery.html",segmentMetadata:"http://druid.io/docs/0.6.121/SegmentMetadataQuery.html",timeBoundary:"http://druid.io/docs/0.6.121/TimeBoundaryQuery.html",timeseries:"http://druid.io/docs/0.6.121/TimeseriesQuery.html",topN:"http://druid.io/docs/0.6.121/TopNQuery.html"};e.DruidError=n("DruidError"),e.MissingFieldError=n("MissingFieldError",null,function(t,e){this.message="Query field "+t+" is required for "+e+" query.",this.moreInfo=i[e],this.missingField=t,this.queryType=e}),e.FieldError=n("FieldError"),e.FieldTypeError=n("FieldTypeError",null,function(t,e,r){this.message=t?"Field "+t+" must be "+e:"Invalid "+e+": "+r})},function(t,e,r){"use strict";var n=r(0),i=n.FieldError,o=n.FieldTypeError,s=Array.prototype.slice,u={boolean:function(t){return!!(t||!1).valueOf()},object:function(t){if("object"!=typeof t)throw new o(this+"","object");return t},number:function(t){var e=t;return"number"!=typeof e&&(e=parseFloat(e)||parseInt(e,10)),isNaN(e)?o(this+"","number",t):e},string:function(t){return"string"!=typeof t&&(t+=""),t},array:function(t){return Array.isArray(t)||(t=e.args(arguments,0)),t}};e.args=function(t,e){return 1===arguments.length&&(e=0),s.call(t,e)},e.date=function(t){if(null!=t){if(t instanceof Date)return t;if(~["number","string"].indexOf(typeof t)&&(t=new Date(t)),!(t instanceof Date))throw new i("Bad date value: "+t);return t}},e.fieldSetter=function(t,e){return u[e].bind(t)},e.isObject=function(t){return t&&"object"==typeof t},e.moduleMap=function(t){var e={};const n=r(77).context(t,!0,/.*/);return n.keys().forEach(function(t){if("index.js"!==t){path.basename(t,".js");e[t]=n(t)}}),e}},function(t,e,r){"use strict";var n=r(0),i=r(78),o=r(14),s=r(1),u=n.FieldError,a=n.MissingFieldError;function c(t,e){t.forEach(function(t){var n,i=r(76)("./"+t+".js");"function"==typeof i||"string"==typeof i?(n={})[t]=i:n=i;e(n)})}function f(t,e){t&&(this.client=t),this._query={queryType:this._queryType},e&&(this._queryType&&delete e.queryType,i(this._query,e))}t.exports=f,f.addFields=function(t,e){var r=t.prototype;c(e,function(t){o(t,function(t,e){"string"==typeof t&&(t=s.fieldSetter(e,t));if(t.push){var n=t.push;r[e]=function(){if(0===arguments.length)throw new u("No result can be returned by #"+e+"()");Array.isArray(this._query[n])||(this._query[n]=[]);var r=t.apply(null,arguments);return this._query[n].push(r),this}}else r[e]=function(){return 0===arguments.length?this._query[e]:(this._query[e]=t.apply(null,arguments),this)}})})},f.addStatic=function(t,e){function r(e,r){"string"==typeof e&&(e=s.fieldSetter(r,e)),t[r]=e}c(e,function(t){o(t,r)})},f.required=function(t,e){e=s.args(arguments,1),t.prototype._required=["queryType","dataSource"].concat(e)},f.type=function(t,e){t.prototype._queryType=e},f.prototype._required=["queryType","dataSource"],f.prototype._queryType=null,f.prototype.cancel=function(t){if(!this.client)throw new Error("Query is not attached. Use Druid#cancel(query, callback) instead!");this.client.cancel(this,t)},f.prototype.exec=function(t){if(!this.client)throw new Error("Query is not attached. Use Druid#exec(query, callback) instead!");this.client.exec(this,t)},f.prototype.toJSON=function(){return this._query},f.prototype.validate=function(){for(var t,e=0;t=this._required[e++];)if(!this._query.hasOwnProperty(t))return new a(t,this._query.queryType);return null},f.addFields(f,["queryType","dataSource","context"]),f.addStatic(f,["aggregations","extractionFunction","filter","having","interval","orderBy","postAggregations","query"])},function(t,e,r){(function(t,n){var i=/%[sdj%]/g;e.format=function(t){if(!v(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(u(arguments[r]));return e.join(" ")}r=1;for(var n=arguments,o=n.length,s=String(t).replace(i,function(t){if("%%"===t)return"%";if(r>=o)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return t}}),a=n[r];r<o;a=n[++r])h(a)||!b(a)?s+=" "+a:s+=" "+u(a);return s},e.deprecate=function(r,i){if(m(t.process))return function(){return e.deprecate(r,i).apply(this,arguments)};if(!0===n.noDeprecation)return r;var o=!1;return function(){if(!o){if(n.throwDeprecation)throw new Error(i);n.traceDeprecation?console.trace(i):console.error(i),o=!0}return r.apply(this,arguments)}};var o,s={};function u(t,r){var n={seen:[],stylize:c};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),g(r)?n.showHidden=r:r&&e._extend(n,r),m(n.showHidden)&&(n.showHidden=!1),m(n.depth)&&(n.depth=2),m(n.colors)&&(n.colors=!1),m(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=a),f(n,t,n.depth)}function a(t,e){var r=u.styles[e];return r?"["+u.colors[r][0]+"m"+t+"["+u.colors[r][1]+"m":t}function c(t,e){return t}function f(t,r,n){if(t.customInspect&&r&&E(r.inspect)&&r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var i=r.inspect(n,t);return v(i)||(i=f(t,i,n)),i}var o=function(t,e){if(m(e))return t.stylize("undefined","undefined");if(v(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}if(y(e))return t.stylize(""+e,"number");if(g(e))return t.stylize(""+e,"boolean");if(h(e))return t.stylize("null","null")}(t,r);if(o)return o;var s=Object.keys(r),u=function(t){var e={};return t.forEach(function(t,r){e[t]=!0}),e}(s);if(t.showHidden&&(s=Object.getOwnPropertyNames(r)),x(r)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return l(r);if(0===s.length){if(E(r)){var a=r.name?": "+r.name:"";return t.stylize("[Function"+a+"]","special")}if(w(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(j(r))return t.stylize(Date.prototype.toString.call(r),"date");if(x(r))return l(r)}var c,b="",O=!1,F=["{","}"];(d(r)&&(O=!0,F=["[","]"]),E(r))&&(b=" [Function"+(r.name?": "+r.name:"")+"]");return w(r)&&(b=" "+RegExp.prototype.toString.call(r)),j(r)&&(b=" "+Date.prototype.toUTCString.call(r)),x(r)&&(b=" "+l(r)),0!==s.length||O&&0!=r.length?n<0?w(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),c=O?function(t,e,r,n,i){for(var o=[],s=0,u=e.length;s<u;++s)N(e,String(s))?o.push(p(t,e,r,n,String(s),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(p(t,e,r,n,i,!0))}),o}(t,r,n,u,s):s.map(function(e){return p(t,r,n,u,e,O)}),t.seen.pop(),function(t,e,r){if(t.reduce(function(t,e){return 0,e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60)return r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1];return r[0]+e+" "+t.join(", ")+" "+r[1]}(c,b,F)):F[0]+b+F[1]}function l(t){return"["+Error.prototype.toString.call(t)+"]"}function p(t,e,r,n,i,o){var s,u,a;if((a=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]}).get?u=a.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):a.set&&(u=t.stylize("[Setter]","special")),N(n,i)||(s="["+i+"]"),u||(t.seen.indexOf(a.value)<0?(u=h(r)?f(t,a.value,null):f(t,a.value,r-1)).indexOf("\n")>-1&&(u=o?u.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+u.split("\n").map(function(t){return"   "+t}).join("\n")):u=t.stylize("[Circular]","special")),m(s)){if(o&&i.match(/^\d+$/))return u;(s=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))}return s+": "+u}function d(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function h(t){return null===t}function y(t){return"number"==typeof t}function v(t){return"string"==typeof t}function m(t){return void 0===t}function w(t){return b(t)&&"[object RegExp]"===O(t)}function b(t){return"object"==typeof t&&null!==t}function j(t){return b(t)&&"[object Date]"===O(t)}function x(t){return b(t)&&("[object Error]"===O(t)||t instanceof Error)}function E(t){return"function"==typeof t}function O(t){return Object.prototype.toString.call(t)}function F(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(t){if(m(o)&&(o=n.env.NODE_DEBUG||""),t=t.toUpperCase(),!s[t])if(new RegExp("\\b"+t+"\\b","i").test(o)){var r=n.pid;s[t]=function(){var n=e.format.apply(e,arguments);console.error("%s %d: %s",t,r,n)}}else s[t]=function(){};return s[t]},e.inspect=u,u.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},u.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=d,e.isBoolean=g,e.isNull=h,e.isNullOrUndefined=function(t){return null==t},e.isNumber=y,e.isString=v,e.isSymbol=function(t){return"symbol"==typeof t},e.isUndefined=m,e.isRegExp=w,e.isObject=b,e.isDate=j,e.isError=x,e.isFunction=E,e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t},e.isBuffer=r(80);var S=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function N(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){console.log("%s - %s",function(){var t=new Date,e=[F(t.getHours()),F(t.getMinutes()),F(t.getSeconds())].join(":");return[t.getDate(),S[t.getMonth()],e].join(" ")}(),e.format.apply(e,arguments))},e.inherits=r(79),e._extend=function(t,e){if(!e||!b(e))return t;for(var r=Object.keys(e),n=r.length;n--;)t[r[n]]=e[r[n]];return t}}).call(this,r(82),r(81))},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(1),o=i.fieldSetter(null,"array"),s=i.fieldSetter(null,"number");e.array=function(t){if(0===arguments.length)throw new n("No specs specified");this.havingSpecs=o.apply(null,arguments)},e.number=function(t,e){if(!t)throw new n("Aggregation name is not specified");this.aggregation=t,this.value=s(e)}},function(t,e,r){"use strict";var n=r(2),i=r(3);r(1);function o(t,e){n.call(this,t,e)}t.exports=o,i.inherits(o,n),n.type(o,"topN"),n.required(o,"dimension","threshold","metric","granularity","aggregations","intervals"),n.addFields(o,["dimension","threshold","metric","granularity","filter","aggregations","postAggregations","interval","intervals"])},function(t,e,r){"use strict";var n=r(2),i=r(3);r(1);function o(t,e){n.call(this,t,e)}t.exports=o,i.inherits(o,n),n.type(o,"timeseries"),n.required(o,"granularity","aggregations","intervals"),n.addFields(o,["granularity","filter","aggregations","postAggregations","interval","intervals"])},function(t,e,r){"use strict";var n=r(2),i=r(3);r(1);function o(t,e){n.call(this,t,e)}t.exports=o,i.inherits(o,n),n.type(o,"timeBoundary"),n.addFields(o,["bound"])},function(t,e,r){"use strict";var n=r(2),i=r(3);r(1);function o(t,e){n.call(this,t,e)}t.exports=o,i.inherits(o,n),n.type(o,"segmentMetadata"),n.addFields(o,["interval","intervals","toInclude","merge"])},function(t,e,r){"use strict";var n=r(2),i=r(3);r(1);function o(t,e){n.call(this,t,e)}t.exports=o,i.inherits(o,n),n.type(o,"search"),n.required(o,"granularity","intervals","query","sort"),n.addFields(o,["granularity","searchDimensions","query","sort","interval","intervals","filter"])},function(t,e,r){"use strict";(function(e){var n=r(0).FieldError,i=r(1),o=i.moduleMap(e+"/having");t.exports=function(t){if(i.isObject(t))return t;if(!o.hasOwnProperty(t))throw new n("Bad having type: "+t);var e=i.args(arguments,1),r={type:t};return o[t].apply(r,e),r}}).call(this,"/")},function(t,e,r){"use strict";(function(e){var n=r(0).FieldError,i=r(1),o=i.moduleMap(e+"/filters");t.exports=function(t){if(i.isObject(t))return t;if(!o.hasOwnProperty(t))throw new n("Bad filter type: "+t);var e=i.args(arguments,1),r={type:t};return o[t].apply(r,e),r}}).call(this,"/")},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(1);t.exports=function(t,e,r){if(i.isObject(t))return t;if(t&&e){if("insensitive_contains"===t)return{type:"insensitive_contains",value:e+""};if("fragment"===t){if(!Array.isArray(e))throw new n("value is not an array");return{type:"fragment",values:e,caseSensitive:r||!1}}if("contains"===t)return{type:"contains",value:e+"",caseSensitive:r||!1};throw new n("Bad SearchQuerySpec type: "+t)}throw new n("Type or value is not specified")}},function(t,e,r){"use strict";var n=r(2),i=r(3);r(1);function o(t,e){n.call(this,t,e)}t.exports=o,i.inherits(o,n),n.type(o,"groupBy"),n.required(o,"dimensions","granularity","aggregations","intervals"),n.addFields(o,["granularity","dimensions","limitSpec","filter","aggregations","postAggregations","interval","intervals","having"])},function(t,e){var r=9007199254740991,n="[object Arguments]",i="[object Function]",o="[object GeneratorFunction]",s=/^(?:0|[1-9]\d*)$/;function u(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););return t}var a=Object.prototype,c=a.hasOwnProperty,f=a.toString,l=a.propertyIsEnumerable,p=function(t,e){return function(r){return t(e(r))}}(Object.keys,Object);function d(t,e){var r=m(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&w(t)}(t)&&c.call(t,"callee")&&(!l.call(t,"callee")||f.call(t)==n)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],i=r.length,o=!!i;for(var s in t)!e&&!c.call(t,s)||o&&("length"==s||v(s,i))||r.push(s);return r}var g=function(t,e){return function(r,n){if(null==r)return r;if(!w(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&!1!==n(s[o],o,s););return r}}(function(t,e){return t&&h(t,e,b)}),h=function(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),u=s.length;u--;){var a=s[t?u:++i];if(!1===r(o[a],a,o))break}return e}}();function y(t){if(!function(t){var e=t&&t.constructor,r="function"==typeof e&&e.prototype||a;return t===r}(t))return p(t);var e=[];for(var r in Object(t))c.call(t,r)&&"constructor"!=r&&e.push(r);return e}function v(t,e){return!!(e=null==e?r:e)&&("number"==typeof t||s.test(t))&&t>-1&&t%1==0&&t<e}var m=Array.isArray;function w(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=r}(t.length)&&!function(t){var e=function(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}(t)?f.call(t):"";return e==i||e==o}(t)}function b(t){return w(t)?d(t):y(t)}function j(t){return t}t.exports=function(t,e){return(m(t)?u:g)(t,"function"==typeof e?e:j)}},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(1);t.exports=function(t){if(Array.isArray(t))return{type:"list",columns:t};if("string"!=typeof t||"all"!==t&&"none"!==t){if(i.isObject(t))return t;throw new n("Unknown toInclude value: "+t)}return{type:t}}},function(t,e,r){"use strict";t.exports="number"},function(t,e,r){"use strict";var n=r(0).FieldError,i=["lexicographic","strlen"];t.exports=function(t){if(!~i.indexOf(t))throw new n("Sorting type can be "+i.join(" or "));return{type:t}}},function(t,e,r){"use strict";t.exports="array"},function(t,e,r){"use strict";t.exports="string"},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e){if(!t||0===t.length||!e)throw new n("Field names or function missing");this.fieldNames=t,this.function=e+""}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(0===arguments.length&&(t=this.name,delete this.name),!t)throw new n("Aggregator name is not specified");this.fieldName=t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(0===arguments.length&&(t=this.name,delete this.name),!t)throw new n("Aggregator name is not specified");this.fieldName=t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(0===arguments.length||void 0===t)throw new n("Constant must have value");this.value=t}},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(1);t.exports=function(t,e){if(!t)throw new n("Arithmetic function (+, -, *, /) is not specified");if(Array.isArray(e)||(e=i.args(arguments,1)),0===e.length)throw new n("Fields are not specified");this.fn=t,this.fields=e}},function(t,e,r){"use strict";(function(t){var n=r(0).FieldError,i=r(1),o=i.moduleMap(t+"/postAggregations");e.postAggregation=function(t,e){return function(t,e){if(i.isObject(t))return t;if(!e)throw new n("Missing post-aggregation name");if(!o.hasOwnProperty(t))throw new n("Unknown post-aggregation type: "+t);var r=i.args(arguments,2),s={type:t,name:e};return o[t].apply(s,r),s}.apply(null,arguments)},e.postAggregation.push="postAggregations",e.postAggregations="array"}).call(this,"/")},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e){1===arguments.length&&(e="ASCENDING");if(!t)throw new n("Dimension is not specified");if(!~["ascending","descending"].indexOf(e.toLowerCase()))throw new n("Bad orderBy direction: "+e);return{dimension:t,direction:e}}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Metric is not specified");this.metric=t+""}},function(t,e,r){"use strict";var n;t.exports=function(t){t!==n&&(this.previousStop=t+"")}},function(t,e,r){"use strict";var n;t.exports=function(t){t!==n&&(this.previousStop=t+"")}},function(t,e,r){"use strict";(function(e){var n=r(0).FieldError,i=r(1),o=i.moduleMap(e+"/metrics");t.exports=function(t){if(1===arguments.length&&(i.isObject(t)||"string"==typeof t))return t;if(!o.hasOwnProperty(t))throw new n("Bad TopNMetric spec type: "+t);var e=i.args(arguments,1),r={type:t};return o[t].apply(r,e),r}}).call(this,"/")},function(t,e,r){"use strict";t.exports="boolean"},function(t,e,r){"use strict";var n=r(0),i=r(1),o=n.FieldError,s=n.FieldTypeError;t.exports=function(t,e,r){if(i.isObject(t))return t;"number"!=typeof e&&(e=parseInt(e,10));if("default"!==t)throw new o("Currently only DefaultLimitSpec is supported");if(isNaN(e))throw new s("limitSpec.limit","number");if(!Array.isArray(r))throw new s("limitSpec.columns","array");return{type:t,limit:parseInt(e,10),columns:r}}},function(t,e,r){"use strict";e.intervals="array"},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(1);t.exports=function(t,e){if(1===arguments.length&&"string"==typeof t)return t;if(2===arguments.length){var r=i.args(arguments,0);return r.map(function(t){var e=i.date(t);if(!e)throw new n("Bad date specified: "+t);return JSON.stringify(e).replace(/"/g,"")}).join("/")}throw new n("Bad arguments")},t.exports.push="intervals"},function(t,e,r){"use strict";r(1);t.exports=r(4).array},function(t,e,r){"use strict";var n,i=r(0).FieldError;t.exports=function(t){if(0===arguments.length)throw new i("Spec is not specified");"object"!=typeof t&&(!n&&(n=r(10)),t=n.apply(null,arguments)),this.havingSpec=t}},function(t,e,r){"use strict";t.exports=r(4).number},function(t,e,r){"use strict";t.exports=r(4).number},function(t,e,r){"use strict";t.exports=r(4).number},function(t,e,r){"use strict";t.exports=r(4).array},function(t,e,r){"use strict";(function(e){var n=r(0).FieldError,i=r(1),o=i.moduleMap(e+"/granularities"),s=["all","none","minute","fifteen_minute","thirty_minute","hour","day","week","month","quarter","year"];t.exports=function(t){if(i.isObject(t))return t;if("string"==typeof t&&~s.indexOf(t))return t;if(!o.hasOwnProperty(t))throw new n("Bad granularity type: "+t);var e=i.args(arguments,1),r={type:t};return o[t].apply(r,e),r}}).call(this,"/")},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(1),o=/^P(?:(\d+(?:[\.,]\d{0,3})?W)|(\d+(?:[\.,]\d{0,3})?Y)?(\d+(?:[\.,]\d{0,3})?M)?(\d+(?:[\.,]\d{0,3})?D)?(?:T(\d+(?:[\.,]\d{0,3})?H)?(\d+(?:[\.,]\d{0,3})?M)?(\d+(?:[\.,]\d{0,3})?S)?)?)$/;t.exports=function(t,e,r){if(!function(t){return o.test(t)}(t))throw new n("Bad duration: "+t);this.period=t,"string"==typeof e&&(this.timeZone=e),(r=i.date(r))&&(this.origin=r)}},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(1);t.exports=function(t,e){var r=parseInt(t,10);if(isNaN(r))throw new n("Bad duration value: "+t);this.duration=t+"",(e=i.date(e))&&(this.origin=e)}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e){if(!t||void 0===e)throw new n("Dimension or value is not specified");null===e&&(e=""),this.dimension=t,this.value=e}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e){if(!t||!e)throw new n("Dimension or query object is not specified.");this.dimension=t,this.query=e}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e){if(!t||!e)throw new n("Dimension or regular expression is not specified");this.dimension=t,this.pattern=e}},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(1).fieldSetter(null,"array");t.exports=function(t){if(0===arguments.length)throw new n("No filters specified");this.fields=i.apply(null,arguments)}},function(t,e,r){"use strict";var n,i=r(0).FieldError;t.exports=function(t){if(0===arguments.length)throw new i("Filter is not specified");"object"!=typeof t&&(!n&&(n=r(11)),t=n.apply(null,arguments)),this.field=t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e){if(!t||!e)throw new n("Dimension or function is not specified");this.dimension=t,this.function=e+""}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e){if(!t||void 0===e)throw new n("Dimension or value is not specified");null===e&&(e=[]),this.dimension=t,this.values=e}},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(1).fieldSetter(null,"array");t.exports=function(t){if(0===arguments.length)throw new n("No filters specified");this.fields=i.apply(null,arguments)}},function(t,e,r){"use strict";(function(e){var n=r(0).FieldError,i=r(1),o=i.moduleMap(e+"/extraction-functions");t.exports=function(t){if(i.isObject(t))return t;if(!o.hasOwnProperty(t))throw new n("Unknown DimExtractionFn type: "+t);var e=i.args(arguments,1),r={type:t};return o[t].apply(r,e),r}}).call(this,"/")},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e){if(!t||!e)throw new n("timeFormat or resultFormat is not specified");this.timeFormat=t,this.resultFormat=e}},function(t,e,r){"use strict";var n=r(12);r(1);t.exports=function(t){this.query="object"==typeof t?t:n.apply(null,arguments)}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Missing regular expression");this.expr=t+""}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Missing regular expression");this.expr=t+""}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if("string"!=typeof t&&"function"!=typeof t)throw new n("Function is not specified");this.function=t+""}},function(t,e,r){"use strict";t.exports="array"},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e,r){if(!t)throw new n("At least dimension must be specified");if(1===arguments.length&&"object"==typeof t)return t;if(1===arguments.length)return{type:"default",dimension:t};if(2===arguments.length&&"object"!=typeof e)return{type:"default",dimension:t,outputName:e};if(2===arguments.length)return{type:"extraction",dimension:t,dimExtractionFn:r=e};if(3===arguments.length)return{type:"extraction",dimension:t,outputName:e,dimExtractionFn:r};throw new n("Bad arguments number: "+arguments.length)}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Data source is not specified");this.name=t}},function(t,e,r){"use strict";var n=r(0).FieldError,i=r(2);t.exports=function(t){if("object"!=typeof t)throw new n("Bad query: "+t);this.query=t instanceof i?t.toJSON():t}},function(t,e,r){"use strict";(function(e){var n=r(0).FieldError,i=r(1),o=i.moduleMap(e+"/dataSources");t.exports=function(t){if(1===arguments.length&&(i.isObject(t)||"string"==typeof t))return t;if(!o.hasOwnProperty(t))throw new n("Unknown data source type: "+t);var e=i.args(arguments,1),r={type:t};return o[t].apply(r,e),r}}).call(this,"/")},function(t,e,r){"use strict";var n=r(0).FieldTypeError;t.exports=function(t){var e={};t=t||{},["priority","timeout"].forEach(function(r){if(t.hasOwnProperty(r)&&(e[r]=parseInt(t[r],10),isNaN(e[r])))throw new n("context."+r,"number")}),t.hasOwnProperty("queryId")&&(e.queryId=t.queryId+"");return["bySegment","populateCache","useCache","finalize","skipEmptyBuckets"].forEach(function(r){t.hasOwnProperty(r)&&(e[r]=!!(t[r]||!1).valueOf())}),e}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if("minTime"!=(t+="")&&"maxTime"!==t)throw new n('"bound" field should be equal to minTime or maxTime.');return t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Missing metric column");this.fieldName=t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Missing metric column");this.fieldName=t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Missing metric column");this.fieldName=t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Missing metric column");this.fieldName=t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Missing metric column");this.fieldName=t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e,r,i){if(!(t&&t.length&&e&&r&&i))throw new n("Some arguments ares missing (btw, all arguments are mandatory)");this.fieldNames=t,this.aggregateFn=e+"",this.combineFn=r+"",this.resetFn=i+""}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Missing dimension");this.fieldName=t}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t){if(!t)throw new n("Missing metric column");this.fieldName=t}},function(t,e,r){"use strict";t.exports=function(){}},function(t,e,r){"use strict";var n=r(0).FieldError;t.exports=function(t,e){if(!t||!t.length)throw new n("Missing field names");this.fieldNames=t,this.byRow=e||!1}},function(t,e,r){"use strict";(function(t){var n=r(0).FieldError,i=r(1),o=i.moduleMap(t+"/aggregations");e.aggregation=function(t,e){return function(t,e){if(i.isObject(t))return t;if(!e)throw new n("Missing aggregation output name");if(!o.hasOwnProperty(t))throw new n("Unknown aggregation type: "+t);var r=i.args(arguments,2),s={type:t,name:e};return o[t].apply(s,r),s}.apply(null,arguments)},e.aggregation.push="aggregations",e.aggregations="array"}).call(this,"/")},function(t,e,r){var n={"./aggregations.js":75,"./aggregations/cardinality.js":74,"./aggregations/count.js":73,"./aggregations/doubleSum.js":72,"./aggregations/hyperUnique.js":71,"./aggregations/javascript.js":70,"./aggregations/longMax.js":69,"./aggregations/longMin.js":68,"./aggregations/longSum.js":67,"./aggregations/max.js":66,"./aggregations/min.js":65,"./bound.js":64,"./context.js":63,"./dataSource.js":62,"./dataSources/query.js":61,"./dataSources/table.js":60,"./dimension.js":59,"./dimensions.js":58,"./extraction-functions/javascript.js":57,"./extraction-functions/partial.js":56,"./extraction-functions/regex.js":55,"./extraction-functions/searchQuery.js":54,"./extraction-functions/time.js":53,"./extractionFunction.js":52,"./filter.js":11,"./filters/and.js":51,"./filters/in.js":50,"./filters/javascript.js":49,"./filters/not.js":48,"./filters/or.js":47,"./filters/regex.js":46,"./filters/search.js":45,"./filters/selector.js":44,"./granularities/duration.js":43,"./granularities/period.js":42,"./granularity.js":41,"./having.js":10,"./having/and.js":40,"./having/equalTo.js":39,"./having/greaterThan.js":38,"./having/index.js":4,"./having/lessThan.js":37,"./having/not.js":36,"./having/or.js":35,"./interval.js":34,"./intervals.js":33,"./limitSpec.js":32,"./merge.js":31,"./metric.js":30,"./metrics/alphaNumeric.js":29,"./metrics/lexicographic.js":28,"./metrics/numeric.js":27,"./orderBy.js":26,"./postAggregations.js":25,"./postAggregations/arithmetic.js":24,"./postAggregations/constant.js":23,"./postAggregations/fieldAccess.js":22,"./postAggregations/hyperUniqueCardinality.js":21,"./postAggregations/javascript.js":20,"./query.js":12,"./queryType.js":19,"./searchDimensions.js":18,"./sort.js":17,"./threshold.js":16,"./toInclude.js":15};function i(t){var e=o(t);return r(e)}function o(t){var e=n[t];if(!(e+1)){var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}return e}i.keys=function(){return Object.keys(n)},i.resolve=o,t.exports=i,i.id=76},function(t,e){function r(t){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}r.keys=function(){return[]},r.resolve=r,t.exports=r,r.id=77},function(t,e){var r=9007199254740991,n="[object Arguments]",i="[object Function]",o="[object GeneratorFunction]",s=/^(?:0|[1-9]\d*)$/;var u=Object.prototype,a=u.hasOwnProperty,c=u.toString,f=u.propertyIsEnumerable,l=function(t,e){return function(r){return t(e(r))}}(Object.keys,Object),p=Math.max,d=!f.call({valueOf:1},"valueOf");function g(t,e){var r=w(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&b(t)}(t)&&a.call(t,"callee")&&(!f.call(t,"callee")||c.call(t)==n)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],i=r.length,o=!!i;for(var s in t)!e&&!a.call(t,s)||o&&("length"==s||y(s,i))||r.push(s);return r}function h(t,e,r){var n=t[e];a.call(t,e)&&m(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function y(t,e){return!!(e=null==e?r:e)&&("number"==typeof t||s.test(t))&&t>-1&&t%1==0&&t<e}function v(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||u)}function m(t,e){return t===e||t!=t&&e!=e}var w=Array.isArray;function b(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=r}(t.length)&&!function(t){var e=j(t)?c.call(t):"";return e==i||e==o}(t)}function j(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var x=function(t){return function(t,e){return e=p(void 0===e?t.length-1:e,0),function(){for(var r=arguments,n=-1,i=p(r.length-e,0),o=Array(i);++n<i;)o[n]=r[e+n];n=-1;for(var s=Array(e+1);++n<e;)s[n]=r[n];return s[e]=o,function(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}(t,this,s)}}(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&"function"==typeof o?(i--,o):void 0,s&&function(t,e,r){if(!j(r))return!1;var n=typeof e;return!!("number"==n?b(r)&&y(e,r.length):"string"==n&&e in r)&&m(r[e],t)}(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var u=r[n];u&&t(e,u,n,o)}return e})}(function(t,e){if(d||v(e)||b(e))!function(t,e,r,n){r||(r={});for(var i=-1,o=e.length;++i<o;){var s=e[i],u=n?n(r[s],t[s],s,r,t):void 0;h(r,s,void 0===u?t[s]:u)}}(e,function(t){return b(t)?g(t):function(t){if(!v(t))return l(t);var e=[];for(var r in Object(t))a.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}(e),t);else for(var r in e)a.call(e,r)&&h(t,r,e[r])});t.exports=x},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},function(t,e){t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},function(t,e){var r,n,i=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function u(t){if(r===setTimeout)return setTimeout(t,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:o}catch(t){r=o}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(t){n=s}}();var a,c=[],f=!1,l=-1;function p(){f&&a&&(f=!1,a.length?c=a.concat(c):l=-1,c.length&&d())}function d(){if(!f){var t=u(p);f=!0;for(var e=c.length;e;){for(a=c,c=[];++l<e;)a&&a[l].run();l=-1,e=c.length}a=null,f=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function g(t,e){this.fun=t,this.array=e}function h(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];c.push(new g(t,e)),1!==c.length||f||u(d)},g.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=h,i.addListener=h,i.once=h,i.off=h,i.removeListener=h,i.removeAllListeners=h,i.emit=h,i.prependListener=h,i.prependOnceListener=h,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(t,e){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";var n=r(3);t.exports=function(t,e,r){if(!t)throw new TypeError("A custom error name is required");if(r&&"function"==typeof r){if(!Error.prototype.isPrototypeOf(r.prototype)){var i={};Object.getOwnPropertyNames(r.prototype).forEach(function(t){i[t]=Object.getOwnPropertyDescriptor(r.prototype,t)}),r.prototype=Object.create(Error.prototype,i)}}else r=Error;var o={};function s(t){var e=new Error(t);r.apply(this,arguments),r.apply(e,arguments),Error.captureStackTrace(e,s);for(var i=Object.getOwnPropertyDescriptor(e,"stack"),u=[],a=[],c=arguments.length,f=c;f--;){var l=arguments[c-f-1];l instanceof Error?u.push(l):"string"!=typeof l&&"number"!=typeof l||a.push(l)}return u.length>0&&(o.stack={get:function(t,e){return function(){var r=e.get();return t.forEach(function(t){r+="\n",r+=t.stack}),r}}(u,i)}),o.message={value:n.format.apply(null,a)},Object.defineProperties(e,o),e.__proto__=Object.create(s.prototype,o),e}e&&Object.keys(e).forEach(function(t){o[t]={value:e[t],enumerable:!0,writable:!0,configurable:!0}});var u={constructor:{value:s,writable:!0,configurable:!0},name:{value:t,enumerable:!1,writable:!0,configurable:!0},toJSON:{enumerable:!1,configurable:!1,value:function(){var t={};return Object.getOwnPropertyNames(this).forEach(function(e){t[e]="stack"==e?this[e].split("\n"):this[e]},this),t}}};return e&&Object.keys(e).forEach(function(t){u[t]={value:e[t],enumerable:!0,writable:!0,configurable:!0}}),s.prototype=Object.create(r.prototype,u),s}},function(t,e,r){var n={"./groupBy":13,"./groupBy.js":13,"./search":9,"./search.js":9,"./segmentMetadata":8,"./segmentMetadata.js":8,"./timeBoundary":7,"./timeBoundary.js":7,"./timeseries":6,"./timeseries.js":6,"./topN":5,"./topN.js":5};function i(t){var e=o(t);return r(e)}function o(t){var e=n[t];if(!(e+1)){var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}return e}i.keys=function(){return Object.keys(n)},i.resolve=o,t.exports=i,i.id=84},function(t,e,r){"use strict";var n=r(14),i=r(84);const o=r(2);n(i.keys(),function(t){o[t.replace(".js","")]=(e=>new i[t](void 0,e))}),t.exports.default=o}]);