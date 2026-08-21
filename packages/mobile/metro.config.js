const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

// ponytail: minimal npm-workspaces support for Metro; extend if more
// workspace packages get imported by the app.
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

module.exports = config;
