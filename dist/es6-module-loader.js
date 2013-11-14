/*!
*  es6-module-loader - v0.3.1 - 11/13/2013
*  https://github.com/ModuleLoader/es6-module-loader
*  Copyright (c) 2013 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
*/
!function(){!function(){function a(a){this.global=a.global||window,this.strict=!!a.strict,this.normalize=a.normalize||d.System.normalize,this.resolve=a.resolve||d.System.resolve,this.fetch=a.fetch||d.System.fetch,this.translate=a.translate||d.System.translate,this.link=a.link||d.System.link,this._mios={},this._sloaded={},this._mloads={},this._sloads={}}function b(a){if("object"!=typeof a)throw new TypeError("Expected object");if(a instanceof b)return a;var c=this;for(var d in a)!function(b){e(c,b,{configurable:!1,enumerable:!0,get:function(){return a[b]}})}(d)}var c="undefined"!=typeof window,d=c?window:exports,e=function(a,b,c){Object.defineProperty?Object.defineProperty(a,b,c):a[b]=c.value||c.get.call(a)},f=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1};a.prototype.load=function(a,b,c){var d=this;if(a instanceof Array)for(var e=0,f=0;f<a.length;f++)!function(f){d.load(a[f],function(){e++,e==a.length&&b&&b()},c)}(f);else{if(this._sloaded[a])return b&&b(),void 0;if(this._sloads[a])return this._sloads[a].push({callback:b,errback:c}),void 0;this._sloads[a]=[{callback:b,errback:c}];var g=function(){for(var b=0;b<d._sloads[a].length;b++)d._sloads[a][b].callback&&d._sloads[a][b].callback();delete d._sloads[a]},h=function(b){for(var c=!0,e=0;e<d._sloads[a].length;e++)d._sloads[a][e].errback?d._sloads[a][e].errback(b):c=!1;if(delete d._sloads[a],!c)throw b};this.fetch(a,function(b){var c={address:a,type:"script"};b=d.translate(b,c),d._linkExecute(a,b,c,g,h,!0)},h)}},a.prototype["import"]=function(b,c,d,e){var f=this;if(b instanceof Array)for(var g=[],h=0,f=this,i=0;i<b.length;i++)!function(i){a.prototype["import"].call(f,b[i],function(a){g[i]=a,h++,h==b.length&&c&&c.apply(null,g)},d,e)}(i);else{b=this.normalize(b,e);var j={referer:e,metadata:"object"==typeof b?b.metadata:null};if("string"!=typeof b&&(b=b.normalized),this._mios[b])return c&&c(this._mios[b]);if(this._mloads[b])return this._mloads[b].push({callback:c,errback:d}),void 0;this._mloads[b]=[{callback:c,errback:d}];var k=function(a){f._mios[b]=a;for(var c=0;c<f._mloads[b].length;c++)f._mloads[b][c].callback&&f._mloads[b][c].callback(a);delete f._mloads[b]},l=function(a){var c=!0;if(!f._mloads[b])throw a;for(var d=0;d<f._mloads[b].length;d++)f._mloads[b][d].errback?f._mloads[b][d].errback(a):c=!1;if(delete f._mloads[b],!c)throw a},m=this.resolve(b,j);"string"!=typeof m&&(m=m.address),j.normalized=b,this.fetch(m,function(a){j.address=m,j.type="module",a=f.translate(a,j),f._linkExecute(b,a,j,k,l)},l,j)}};var g=0;a.prototype._linkExecute=function(c,d,e,f,h){c||(c="__eval"+g++);var i="script"==e.type,j=this.link(d,e);if(j instanceof b&&!i)return f(j);var k=this,l="object"==typeof j&&!i;(l?function(a,b,c){c()}:o.loadEsprima).call(o,c,d,function(){var b,g;if(l)b=j.imports,g=j.execute;else{var i=k._link(d,e);b=i.imports,g=i.execute}if(!h.called){if(!b.length)return f(g.call(k));e.normalizeMap={};for(var m=[],n=0,o=0;o<b.length;o++)!function(d){var i={name:c,address:e.address},j=k.normalize(b[d],i);"object"==typeof j&&(j=j.normalized),e.normalizeMap[b[d]]=j,a.prototype["import"].call(k,b[d],function(a){if(n++,m[d]=a,n==b.length){try{var e=g.apply(k,m)}catch(i){return h("Error executing "+c+".\n"+i),void 0}f(e)}},h,i)}(o)}},h)},a.prototype._link=function(a,c){var d=this;return{imports:o.parseImports(a,c),execute:function(){var e;return e=o.parseEval(a,d,{name:c.normalized,sourceURL:c.address,isEval:"script"==c.type,normalizeMap:c.normalizeMap}),c.normalized&&"script"!=c.type?new b(e||{}):void 0}}},a.prototype.eval=function(a){o.parseEval(a,this,{isEval:!0})},a.prototype.evalAsync=function(a,b,c){this._linkExecute(null,a,{type:"script"},b||function(){},c||function(){})},a.prototype.get=function(a){return this._mios[a]||null},a.prototype.set=function(a,c){this._mios[a]=new b(c)},a.prototype.has=function(a){return!!this._mios[a]},a.prototype["delete"]=function(a){delete this._mios[a]},a.prototype.defineBuiltins=function(a){for(var b in a)a.hasOwnProperty(b)&&(this.global[b]=a[b])};var h,i=/^\/|([^\:\/]*:\/\/)/,j=function(a){return a.match(i)};if(c)h=function(a,b,c){var d=new XMLHttpRequest;if(!("withCredentials"in d)){var e=!0,f=/^(\w+:)?\/\/([^\/]+)/.exec(a);f&&(e=f[2]===window.location.host,f[1]&&(e&=f[1]===window.location.protocol)),e||(d=new XDomainRequest)}d.onreadystatechange=function(){4===d.readyState&&(200===d.status||0==d.status&&d.responseText?b(d.responseText):c(d.statusText+": "+a||"XHR error"))},d.open("GET",a,!0),d.send(null)};else{var k=require("fs");h=function(a,b,c){return k.readFile(a,function(a,d){return a?c(a):(b(d+""),void 0)})}}var l=function(a,b){if(!b)return a;"./"==a.substr(0,2)&&(a=a.substr(2));var c=b.lastIndexOf("/");if(-1==c)return a;if(c!=b.length-1&&(b=b.substr(0,c+1)),"."!=a.substr(0,1))return b+a;var d=b.split("/"),e=a.split("/");d.pop();for(var f;".."==e[0];)f=e.shift(),d.length&&".."!=d[d.length-1]?d.pop():d.push("..");return d.join("/")+(d.length?"/":"")+e.join("/")},m=new a({global:c?window:d,strict:!0,normalize:function(a,b){return j(a)?a:"."==a.substr(0,1)?l(a,b&&b.name):a},resolve:function(a){for(var b in this.ondemandTable)if(-1!=f.call(this.ondemandTable[b],a))return b;return j(a)?a:l(a+".js",this.baseURL+("/"!=this.baseURL.charAt(this.baseURL.length-1)?"/":""))},fetch:h,translate:function(a){return a},link:function(){}});m.baseURL=c?window.location.href.substring(0,window.location.href.lastIndexOf("/")+1):"./",m.ondemandTable={},m.ondemand=function(a){for(var b in a)this.ondemandTable[b]=this.ondemandTable[b]||[],a[b]instanceof Array?this.ondemandTable[b]=this.ondemandTable[b].concat(a[b]):this.ondemandTable[b].push(a[b])};var n,o={traverse:function(a,b){var c,d;if(b(a)!==!1)for(c in a)a.hasOwnProperty(c)&&"location"!=c&&(d=a[c],"object"==typeof d&&null!==d&&this.traverse(d,b))},importRegEx:/(?:^\s*|[}{\(\);,\n]\s*)import\s+./,exportRegEx:/(?:^\s*|[}{\(\);,\n]\s*)export\s+(\{|\*|var|class|function|default)/,moduleRegEx:/(?:^\s*|[}{\(\);,\n]\s*)module\s+("[^"]+"|'[^']+')\s*\{/,checkModuleSyntax:function(a,b){return(null==a||void 0===this.parseNames[a])&&(this.parseNames[a]=b&&!!(b.match(this.importRegEx)||b.match(this.exportRegEx)||b.match(this.moduleRegEx))),this.parseNames[a]},loadEsprima:function(a,b,c){if(this.Traceur)return c();if(!this.checkModuleSyntax(a,b))return c();for(var e,f=document.getElementsByTagName("script"),g=0;g<f.length&&(e=f[g],!(n=e.src.match(/es6-module-loader(\.min)?\.js/)?e.src.substr(0,e.src.lastIndexOf("/")+1)+"traceur.js":e.getAttribute("data-traceur-src")));g++);var h=this,i=d.System;d.System.load(n,function(){h.traceur=d.System.get("../src/traceur.js"),d.System=i,c()})},parseNames:{},treeCache:{},getTransformedSyntaxTree:function(a,b){var c=b.normalized||b.address;if(this.treeCache[c])return this.treeCache[c];if(!this.checkModuleSyntax(c,a))return!1;var d=new this.traceur.semantics.symbols.Project(b.address);this.traceur.options.sourceMaps=!0,this.traceur.options.modules="parse";var e=new this.traceur.util.ErrorReporter;e.reportMessageInternal=function(a,b){throw b+"\n"+a};var f=new this.traceur.syntax.SourceFile(b.address,a),g=new this.traceur.syntax.Parser(e,f),h="module"==b.type?g.parseModule():g.parseScript(),i=new this.traceur.codegeneration.ProgramTransformer(e,d);return this.treeCache[c]=i.transform(h)},parseImports:function(a,b){var c=this.getTransformedSyntaxTree(a,b);if(!c)return[];var d=[];return this.traverse(c,function(a){"EXPORT_DECLARATION"==a.type&&(console.log(a.declaration.type),"NAMED_EXPORT"==a.declaration.type||(a.declaration.type="VARIABLE_STATEMENT")||""==a.declaration.type)}),d},parseEval:function(a,b,c){if(!this.checkModuleSyntax(c.name,a))return b.global.__Loader=b,__scopedEval((b.strict?'"use strict";\n':"")+a,b.global,c.sourceURL),delete b.global.__Loader,void 0;var d=this.treeCache[c.name]||this.esprima.parse(a,{range:!0}),e=c.normalizeMap||{},f=new p(a),g=this;this.traverse(d,function(a){if("ImportDeclaration"==a.type){var b=e[a.source.value]||a.source.value;if("default"==a.kind)f.replace(a.range[0],a.range[1],"var "+a.specifiers[0].id.name+" = __Loader.get('"+b+"')['default'];");else{for(var c="var __module = __Loader.get('"+b+"');",d=0;d<a.specifiers.length;d++){var h=a.specifiers[d];c+="var "+(h.name?h.name.name:h.id.name)+" = __module['"+h.id.name+"'];"}f.replace(a.range[0],a.range[1],c)}}else if("ExportDeclaration"==a.type)if(a.declaration){var i,j=a.declaration.range[0]-1;if("VariableDeclaration"==a.declaration.type){var k=a.declaration.declarations[0];k.init&&(i=k.id.name,j=k.init.range[0]-1)}else("FunctionDeclaration"==a.declaration.type||"ClassDeclaration"==a.declaration.type)&&(i=a.declaration.id.name);a["default"]&&(i="default"),f.replace(a.range[0],j,"__exports['"+i+"'] = ")}else if(a.source){var b=e[a.source.value]||a.source.value;if("ExportBatchSpecifier"==a.specifiers[0].type)f.replace(a.range[0],a.range[1],"var __module = __Loader.get('"+b+"'); for (var m in __module) { __exports[m] = __module[m]; }; ");else{for(var c="var __module = __Loader.get('"+b+"'); ",d=0;d<a.specifiers.length;d++){var h=a.specifiers[d];c+="__exports['"+(h.name?h.name.name:h.id.name)+"'] = __module['"+h.id.name+"']; "}f.replace(a.range[0],a.range[1],c)}}else{for(var c="",d=0;d<a.specifiers.length;d++){var h=a.specifiers[d];c+="__exports['"+h.id.name+"'] = "+(h.name?h.name.name:h.id.name)+"; "}f.replace(a.range[0],a.range[1],c)}else"ModuleDeclaration"==a.type?f.replace(a.range[0],a.range[1],"var "+a.id.name+" = __Loader.get('"+(e[a.source.value]||a.source.value)+"');"):g.polyfills.length&&g.applyPolyfill(a,f)}),delete this.treeCache[c.name],b.global.__Loader=b;var h=b.global.__exports={};if(__scopedEval((b.strict?'"use strict";\n':"")+f.toString(),b.global,c.sourceURL),delete b.global.__Loader,delete b.global.__exports,c.isEval)for(var i in h)throw"Exports only supported for modules, not script evaluation.";return h}};c||(o.esprima=require("./esprima-es6.min.js"));var p=function(a){this.source=a,this.rangeOps=[]};p.prototype={mapIndex:function(a){for(var b=0;b<this.rangeOps.length;b++){var c=this.rangeOps[b];if(!(c.start>=a)){if(!(c.end<=a))throw"Source location "+a+" has already been transformed!";a+=c.diff}}return a},replace:function(a,b,c){var d=c.length-(b-a+1);a=this.mapIndex(a),b=this.mapIndex(b),this.source=this.source.substr(0,a)+c+this.source.substr(b+1),this.rangeOps.push({start:a,end:b,diff:d})},getRange:function(a,b){return this.source.substr(this.mapIndex(a),this.mapIndex(b))},toString:function(){return this.source}},d.Loader=a,d.Module=b,d.System=m}();var __scopedEval=function(__source,global,__sourceURL){eval("(function(window) { with(global) { "+__source+" } }).call(global, global);"+(__sourceURL&&!__source.match(/\/\/[@#] ?(sourceURL|sourceMappingURL)=(.+)/)?"\n//# sourceURL="+__sourceURL:""))}}(),function(){if("undefined"!=typeof window){var a=document.getElementsByTagName("script");a=a[a.length-1],a.getAttribute("data-init")&&window[a.getAttribute("data-init")]()}}();