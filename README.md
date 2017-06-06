A simple tool to help to reduce size of MeteorJS's bundles.js file, the file containing all NPM dependencies.

# Usage
- Clone this repo, run $`npm install`
- Run your Meteor app normally in development mode
- Then $`node index.js http://localhost:3000/packages/modules.js`
- Finally you get an output like:
```
Requesting....
Parsing modules files....
Calculating size....
Sorting....
Calculating results....
Done !


=> earth-radius-at-geodetic-latitude: 0.4267578125KB
=> geodetic-haversine-distance: 0.484375KB
=> decouple: 0.546875KB
=> babel-runtime: 1.857421875KB
=> scriptjs: 1.8662109375KB
=> emitter: 1.87109375KB
=> message-box: 2.197265625KB
=> clone: 2.224609375KB
=> deep-extend: 2.435546875KB
=> slideout: 3.9296875KB
=> amdefine: 4.3330078125KB
=> meteor: 8.8173828125KB
=> regenerator-runtime: 10.771484375KB
=> meteor-node-stubs: 11.0615234375KB
=> marked: 13.21875KB
=> mongo-object: 14.849609375KB
=> underscore: 22.5791015625KB
=> core-js: 32.73828125KB
=> simpl-schema: 39.98828125KB
=> lodash: 92.9814453125KB
=> handlebars: 190.6162109375KB

=> Total: 459.794921875KB => 0.4490184783935547MB
=> File: 4261.85546875KB => 527.353515625KB Gzipped => 0.5149936676025391MB
```
