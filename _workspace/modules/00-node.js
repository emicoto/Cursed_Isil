//------------------------------------------------------------------------------
//
//   Node.js Modules
//
//------------------------------------------------------------------------------
/**
 * @namespace os - The os namespace is the root namespace for all of the os modules.
 * @description
 * The os namespace is the root namespace for all of the os modules.
 * @see {@link os}
 * @see {@link os.platform}
 * @see {@link os.arch}
 * @see {@link os.release}
 *
 * @namespace fs - The fs namespace is the root namespace for all of the fs modules.
 * @description
 * The fs namespace is the root namespace for all of the fs modules.
 * @see {@link fs}
 *
 * @namespace path - The path namespace is the root namespace for all of the path modules.
 * @description
 * The path namespace is the root namespace for all of the path modules.
 * @see {@link path}
 */

const os = require("os");
const fs = require("fs");
var path = require("path");

defineGlobalNamespaces({ os, fs, path });

console.log(`It's running on ${os.platform()} ${os.arch()} ${os.release()}`);
console.log("fs, path, child_process are loaded: ", fs, path);
