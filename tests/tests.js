var test = require('tape')
var path = require('path')
var waterfall = require('run-waterfall')
var rcinfo = require('..')

var fileInfo = {
  FileVersion: '1.0.0.1',
  ProductVersion: '1.0.0.1',
  ProductName: 'ShowVer',
  InternalName: 'ShowVer',
  LegalCopyright: 'Copyright © 2002'
}


function createFileInfo(winFile) {
  return function (t) {

    waterfall([
      function (callback) {
        rcinfo(winFile, function(error, info){
          if (!error) {
            t.true(info, 'should return an initialised object')
          }  
        })  
        
        callback()      
      }
    ], function (err) {
      t.end(err)
    })
	
  }
}

function fileInfoTest(winFile, key, expectedValue) {
  return function (t) {

    waterfall([
      function (callback) {
        rcinfo(winFile, callback)
      }, function (info, callback) {		
		    t.equal(info[key], expectedValue)
		    callback()
      }
    ], function (err) {
      t.end(err)
    })
	
  }
}

if (process.platform !== 'win32') {
  console.log('Platform is ' + process.platform + ' skipping win32 tests...')  
} else {
  console.log('Executing win32 tests...')
  test('file info creation', createFileInfo('./bin/ShowVer.exe'))
  
  test('file version test', fileInfoTest('./bin/ShowVer.exe', fileInfo.FileVersion))
  test('product version test', fileInfoTest('./bin/ShowVer.exe', fileInfo.ProductVersion))
  test('product name test', fileInfoTest('./bin/ShowVer.exe', fileInfo.ProductName))
  test('internal name test', fileInfoTest('./bin/ShowVer.exe', fileInfo.InternalName))
  test('legal copyright test', fileInfoTest('./bin/ShowVer.exe', fileInfo.LegalCopyright))
}