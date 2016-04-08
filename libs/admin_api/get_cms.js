var fs = require('fs')
var glob = require("glob")
var Promise = require('bluebird')

var flatFileHandler = require('../flat_utilities/flat_file_handler');

var api_call = function () {}

api_call.prototype.call = function(req, res, query){
	if(!Object.keys(query).length){
		this.getCmsTree()
			.then((data) => {
				res.send(data)
			})
	}
	else if('cms_name' in query){
		this.getCms(query['cms_name'])
			.then((data) => {
				res.send(data)
			})
	}
}

api_call.prototype.getCmsTree = function(){
	return new Promise(function(resolve, reject){
		glob( CMD_FOLDER + '/cms/**/*.js' , function (err, files) {
			if (err) { reject(err) }
			resolve(files.map(function(cms_file){
				return cms_file.match(/cms\/(.*)\.js$/)[1]
			}))
		})
	})
}

api_call.prototype.getCms = function(file){
	return new Promise(function(resolve, reject){
		flatFileHandler.load(file)
			.then(() => {
				resolve(data)
			})
	})
}

module.exports = new api_call()