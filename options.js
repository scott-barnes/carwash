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

function addFieldsList(response){
    let fieldInfos = getFieldsFromHtmlResponse(response);
    let fieldsDiv = document.getElementById('fields-div');
    for (i = 0; i < fieldInfos.length; i++){
        let fieldInfo = fieldInfos[i];
        if (!fieldInfo.id){
            continue;
        }
        let div = document.createElement('div');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.innerHTML;
        checkbox.id = fieldInfo.id;
        div.appendChild(checkbox);
        fieldsDiv.appendChild(div);

        let label = document.createElement('lablel');
        label.innerText = fieldInfo.title;
        div.appendChild(label);
    }
}

// Saves options to chrome.storage
function save_options() {
    var color = document.getElementById('color').value;
    var likesColor = document.getElementById('like').checked;
    chrome.storage.sync.set({
      favoriteColor: color,
      likesColor: likesColor
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    getHTML( 'http://nippm.natinst.com/itg/web/knta/crt/RequestDetail.jsp?REQUEST_ID=689828&ID_CACHE_NAME=Pluto_p86016163_109809', addFieldsList);
  }

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);