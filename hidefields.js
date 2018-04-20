(function run() {
    console.log('Hiding unwanted fields');
    chrome.storage.sync.get({ visibleFields: null }, function(items) {
        let visibleFields = items.visibleFields;
        let fields = document.querySelectorAll('.field');
        fields.forEach(function(field) {
            let fieldInfo = getFieldInfo(field);
            let isChecked;
            let savedSetting = visibleFields.find(item => item.id === fieldInfo.id);
            if(savedSetting){
                field.style.display = savedSetting.isChecked ? 'block' : 'none';
            }
            else {
                field.style.visibility = 'none';
            }
		});
	});
})();