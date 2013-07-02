//
// StarterKit for creating your own Alloy Backbone Adapter
//

var util = require('alloy/sync/util'), Backbone = Alloy.Backbone, _ = require("alloy/underscore")._;

var cache = {
	config : {},
	Model : {}
};

/**
 * HTTP CLIENT
 * @param {Object} _options
 * @param {Object} _callback
 */
function httpRequest(_options, _callback) {
	if (Ti.Network.online) {
		var xhr = Ti.Network.createHTTPClient({
			timeout : _options.timeout || 7000
		});

		//Prepare the request
		xhr.open(_options.type, _options.url);

		xhr.onload = function() {
			_callback({
				success : true,
				status : xhr.status == 200 ? "ok" : xhr.status,
				code : xhr.status,
				responseText : xhr.responseText || null,
				responseData : xhr.responseData || null
			});
		};

		//Handle error
		xhr.onerror = function(e) {
			_callback({
				success : false,
				status : "error",
				code : xhr.status,
				data : e.error,
				responseText : xhr.responseText
			});
			Ti.API.error('httpRequest ERROR: ' + xhr.responseText);
			Ti.API.error('httpRequest ERROR CODE: ' + xhr.status);
		}
		for (var header in _options.headers) {
			xhr.setRequestHeader(header, _options.headers[header]);
		}

		if (_options.beforeSend) {
			_options.beforeSend(xhr);
		}

		xhr.send(_options.data || null);
	} else {
		// Offline
		_callback({
			success : false,
			status : "offline",
			responseText : null
		});
	}
}

/**
 * Backbone Sync
 * http://backbonejs.org/#Sync
 * @param {String} method
 * @param {Object} model
 * @param {Object} opts
 */
function Sync(method, model, opts) {
	model.idAttribute = model.config.adapter.idAttribute || "id";

	// REST - CRUD
	var methodMap = {
		'create' : 'POST',
		'read' : 'GET',
		'update' : 'PUT',
		'delete' : 'DELETE'
	};

	var type = methodMap[method];
	var params = _.extend({}, opts);
	params.type = type;

	//set default headers
	params.headers = params.headers || {};

	// Support custom headers
	if (model.config.hasOwnProperty("headers")) {
		for (header in model.config.headers) {
			params.headers[header] = model.config.headers[header];
		}
	}

	// We need to ensure that we have a base url.
	if (!params.url) {
		params.url = model.config.URL || model.url();
		if (!params.url) {
			Ti.API.error("ERROR: NO BASE URL");
			return;
		}
	}

	// For older servers, emulate JSON by encoding the request into an HTML-form.
	if (Alloy.Backbone.emulateJSON) {
		params.contentType = 'application/x-www-form-urlencoded';
		params.processData = true;
		params.data = params.data ? { model : params.data } : {};
	}

	// For older servers, emulate HTTP by mimicking the HTTP method with `_method`
	// And an `X-HTTP-Method-Override` header.
	if (Alloy.Backbone.emulateHTTP) {
		if (type === 'PUT' || type === 'DELETE') {
			if (Alloy.Backbone.emulateJSON) {
				params.data._method = type;
			}
			params.type = 'POST';
			params.beforeSend = function(xhr) {
				params.headers['X-HTTP-Method-Override'] = type
			};
		}
	}

	// json data transfers - you should change this if you are using XML
	params.headers['Content-Type'] = 'application/json';

	switch(method) {
		case 'create' :
			httpRequest(params, function(_response) {
				if (_response.success) {
					// process data
				} else {
					// error
				}
			});
			break;

		case 'read':
			httpRequest(params, function(_response) {
				if (_response.success) {
					// process data
				} else {
					// error
				}
			});
			break;

		case 'update' :
			httpRequest(params, function(_response) {
				if (_response.success) {
					// process data
				} else {
					// error
				}
			});
			break;

		case 'delete' :
			httpRequest(params, function(_response) {
				if (_response.success) {
					// process data
				} else {
					// error
				}
			});
			break;
	}

};

module.exports.sync = Sync;

module.exports.beforeModelCreate = function(config, name) {
	config = config || {};
	cache.config[name] = config;
	return config;
};

module.exports.afterModelCreate = function(Model, name) {
	if (cache.Model[name])
		return cache.Model[name];
	Model = Model || {};
	Model.prototype.config.Model = Model;
	Model.prototype.idAttribute = Model.prototype.config.adapter.idAttribute;
	cache.Model[name] = Model;
	return Model;
};