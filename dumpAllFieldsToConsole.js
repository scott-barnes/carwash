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

(function dumpAllFieldsToConsole() {
    console.log("DUMPING ALL FIELDS ON CURRENT PAGE:");
    var fields = document.querySelectorAll('.field');
    for (i = 0; i < fields.length; i++){
        let field = fields[i];
        if (field){
            let fieldInfo = getFieldInfo(field);
            console.log('<input type="checkbox" id="' + fieldInfo.id + '">' + fieldInfo.title + '</input></br>');
        }
    }
})();