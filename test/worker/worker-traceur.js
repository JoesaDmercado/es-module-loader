importScripts("../../node_modules/traceur/bin/traceur.js",
             "../../node_modules/when/es6-shim/Promise.js",
             "../../dist/es6-module-loader-traceur-sp.src.js");

System['import']('es6').then(function(m) {
  postMessage(m.p);
}, function(err) {
  console.error(err, err.stack);
});
