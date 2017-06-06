var fs = require("fs");
var request = require("request");
var gzipSize = require('gzip-size');
var _ = require('underscore');

var modulesjsUrl = process.argv[2];
if(!modulesjsUrl) throw new Error("Pas d'url fournie");

var separator = "/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////";

console.log('Requesting....');
request.get(modulesjsUrl, function(err,res,modulesjs){
  console.log('Parsing modules files....');
  var nodeModulesFiles = modulesjs.match(/^\/\/\ [^\.\n\ ]*\.[^\.\n\ ]*[\ ]+\/\//gm);
  nodeModulesFiles = _.compact(_.map(nodeModulesFiles, function(file){
    file = file.substring(3).replace(/[\ ]+\/\//,"");
    var dir = file.split('/')[0];
    if(dir == "node_modules") return file;
  }));

  var sizes = {};
  console.log('Calculating size....');
  _.each(nodeModulesFiles, function(file){
    var nodeModule = file.split('/')[1];
    if(!sizes[nodeModule]) sizes[nodeModule] = 0;

    var fileIndex = modulesjs.indexOf(file);
    var fileStart = modulesjs.substring(fileIndex).indexOf(separator)+separator.length+fileIndex;
    var fileStop = modulesjs.substring(fileStart).indexOf(separator)+fileStart;

    var size = modulesjs.substring(fileStart,fileStop);

    sizes[nodeModule] += size;
  });

  console.log('Sorting....');
  var sizesArray = [];
  var totalSize = 0;
  _.each(sizes,function(size,index){
    var size = gzipSize.sync(size);
    sizesArray.push({module:index,size:size});
    totalSize += size;
  });
  sizesArray=_.map(_.sortBy(sizesArray,"size"), function(data){
    return `=> ${data.module}: ${data.size/1024}KB`;
  });
  console.log("Calculating results....");
  var modulesjsGzippedSize = gzipSize.sync(modulesjs);
  console.log("Done !\n\n");
  _.each(sizesArray, function(text){
    console.log(text);
  });

  console.log(`\n=> Total: ${totalSize/1024}KB => ${totalSize/1024/1024}MB`);
  console.log(`=> File: ${modulesjs.length/1024}KB => ${modulesjsGzippedSize/1024}KB Gzipped => ${modulesjsGzippedSize/1024/1024}MB`);
});
