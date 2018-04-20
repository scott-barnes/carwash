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