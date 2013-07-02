Alloy Adapter Template
==========================

Sync Adapter Template for Titanium Alloy Framework. This template can be used as a baseline to create your own adapter for Alloy.


## How To Use

Simple add the following to your model in `PROJECT_FOLDER/app/models/`.

	exports.definition = {	
		config: {
			"URL": "http://example.com/api/modelname",
			"adapter": {
				"type": "myAdapter",
				"collection_name": "MyCollection",
				"idAttribute": "id"
			},
			"headers": { // your custom headers
	            "Accept": "application/vnd.stackmob+json; version=0",
		        "X-StackMob-API-Key": "your-stackmob-key"
	        }
		},		
		extendModel: function(Model) {		
			_.extend(Model.prototype, {});
			return Model;
		},	
		extendCollection: function(Collection) {		
			_.extend(Collection.prototype, {});
			return Collection;
		}		
	}

Then add the `myAdapter.js` to `PROJECT_FOLDER/app/assets/alloy/sync/`. Create the folders if they dont exist. 


## Special Properties


### Custom Headers

Define your own custom headers. E.g. to add a BaaS API

	"headers": {
		"Accept": "application/vnd.stackmob+json; version=0",
		"X-StackMob-API-Key": "your-stackmob-key"
	}


## Changelog

**v1.0**  
init

## Author

**Mads Møller**  
web: http://www.napp.dk  
email: mm@napp.dk  
twitter: @nappdev  

## License

    Copyright (c) 2010-2013 Mads Møller

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.