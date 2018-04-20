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

function addSectionsList(response, storage){
    console.log(storage);
    let sectionInfos = getSectionsFromHtmlResponse(response);
    let sectionsDiv = document.getElementById('sections-div');
    for (i = 0; i < sectionInfos.length; i++){
        let sectionInfo = sectionInfos[i];
        if (!sectionInfo.id){
            continue;
        }

        let isChecked = true;
        if (storage){
            let savedSetting;
             savedSetting = storage.find(item => item.id === sectionInfo.id);
             if(savedSetting){
                isChecked = savedSetting.isChecked;
            }
        }

        let div = document.createElement('div');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.innerHTML;
        checkbox.id = sectionInfo.id;
        checkbox.checked = isChecked;
        div.appendChild(checkbox);
        sectionsDiv.appendChild(div);

        let label = document.createElement('lablel');
        label.innerText = sectionInfo.title;
        div.appendChild(label);
    }
}

function save_options() {
    console.log("Saving options");
    var fieldsDiv = document.getElementById('fields-div');
    var fields = fieldsDiv.querySelectorAll('input');
    let fieldsStorage = [];
    for(i = 0; i < fields.length; i++){
        let field = fields[i];
        fieldsStorage[i] = { id: field.id, isChecked: field.checked };
    }

    var sectionsDiv = document.getElementById('sections-div');
    var sections = sectionsDiv.querySelectorAll('input');
    sectionsStorage = [];
    for(i = 0; i < sections.length; i++){
        let section = sections[i];
        sectionsStorage[i] = { id: section.id, isChecked: section.checked };
    }
    chrome.storage.sync.set({ 'visibleSections': sectionsStorage,  'visibleFields': fieldsStorage  }, null);
}


function pageLoaded() {
	document.getElementById('save').addEventListener('click', save_options);
    chrome.storage.sync.get({ visibleFields: null, visibleSections: null }, function(items) {
		getHTML(templateCarUrl, function(response) {
             addFieldsList(response, items.visibleFields);
             addSectionsList(response, items.visibleSections);
		});
	});
}

document.addEventListener('DOMContentLoaded', pageLoaded);
