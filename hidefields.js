(function run() {
    console.log('Hiding unwanted fields');
    chrome.storage.sync.get({ visibleFields: null, visibleSections: null }, function(items) {
        let visibleFields = items.visibleFields;
        let visibleSections = items.visibleSections;
        let fields = document.querySelectorAll('.field');
        fields.forEach(function(field) {
            let fieldInfo = getFieldInfo(field);
            let isChecked;
            let savedSetting = visibleFields.find(item => item.id === fieldInfo.id);
            if(savedSetting){
                field.style.display = savedSetting.isChecked ? 'flex' : 'none';
            }
            else {
                field.style.visibility = 'flex';
            }

            visibleSections.forEach(function(section){
                if (!section.isChecked){
                    let sectionElement = document.getElementById(section.id);
                    sectionElement.style.display = 'none';
                }
            })
		});
	});
})();