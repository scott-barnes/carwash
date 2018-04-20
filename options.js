var templateCarUrl = 'http://nippm.natinst.com/itg/web/knta/crt/RequestDetail.jsp?REQUEST_ID=100000';

function addFieldsList(response, storage){
    console.log(storage);
    let fieldInfos = getFieldsFromHtmlResponse(response);
    let fieldsDiv = document.getElementById('fields-div');
    for (i = 0; i < fieldInfos.length; i++){
        let fieldInfo = fieldInfos[i];
        if (!fieldInfo.id){
            continue;
        }

        let isChecked = true;
        if (storage){
            let savedSetting;
             savedSetting = storage.find(item => item.id === fieldInfo.id);
             if(savedSetting){
                isChecked = savedSetting.isChecked;
            }
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
