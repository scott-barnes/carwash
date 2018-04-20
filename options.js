var templateCarUrl = 'http://nippm.natinst.com/itg/web/knta/crt/RequestDetail.jsp?REQUEST_ID=100000';

/**
 * Get HTML asynchronously (source https://gomakethings.com/getting-html-asynchronously-from-another-page/)
 * @param  {String}   url      The URL to get HTML from
 * @param  {Function} callback A callback funtion. Pass in "response" variable to use returned HTML.
 */
var getHTML = function ( url, callback ) {

	// Feature detection
	if ( !window.XMLHttpRequest ) return;

	// Create new request
	var xhr = new XMLHttpRequest();

	// Setup callback
	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
			callback( this.responseXML );
		}
	}

	// Get the HTML
	xhr.open( 'GET', url );
	xhr.responseType = 'document';
	xhr.send();

};

function getFieldInfo(field){
    let title, id;
    
    // Get title
    let labelContainer = field.querySelector('.labelContainer');
    let label = labelContainer.querySelector('label');
    if (label){
        title = label.title;
    }

    let fieldContent = field.querySelector('.fieldContent');
    let input = fieldContent.querySelector('input,select,textarea');
    if (input){
        id = input.id;
    }
    return { title: title, id: id };
}

function getFieldsFromHtmlResponse(response) {
    let fields = response.documentElement.querySelectorAll('.field');
    let fieldInfos = [];
    for (i = 0; i < fields.length; i++){
        let field = fields[i];
        if (field){
            let fieldInfo = getFieldInfo(field);
            fieldInfos[i] = fieldInfo;
        }
    }
    return fieldInfos;
}

function addFieldsList(response, storage){
    console.log(storage);
    let fieldInfos = getFieldsFromHtmlResponse(response);
    let fieldsDiv = document.getElementById('fields-div');
    for (i = 0; i < fieldInfos.length; i++){
        let fieldInfo = fieldInfos[i];
        if (!fieldInfo.id){
            continue;
        }

        let isChecked;
        let savedSetting = storage.find(item => item.id === fieldInfo.id);
        if(savedSetting){
            isChecked = savedSetting.isChecked;
        }
        else {
            isChecked = false;
        }
        let div = document.createElement('div');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.innerHTML;
        checkbox.id = fieldInfo.id;
        checkbox.checked = isChecked;
        div.appendChild(checkbox);
        fieldsDiv.appendChild(div);

        let label = document.createElement('lablel');
        label.innerText = fieldInfo.title;
        div.appendChild(label);
    }
}

function save_options() {
    console.log("Saving options");
    var fieldsDiv = document.getElementById('fields-div');
    var fields = fieldsDiv.querySelectorAll('input');
    let storage = [];
    for(i = 0; i < fields.length; i++){
        let field = fields[i];
        storage[i] = { id: field.id, isChecked: field.checked };
    }
    chrome.storage.sync.set({ 'visibleFields': storage }, null);
}


function pageLoaded() {
	document.getElementById('save').addEventListener('click', save_options);
    chrome.storage.sync.get({ visibleFields: null }, function(items) {
		getHTML(templateCarUrl, function(response) {
			 addFieldsList(response, items.visibleFields);
		});
	});
}

document.addEventListener('DOMContentLoaded', pageLoaded);
