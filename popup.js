var changeToRed = "document.body.style.backgroundColor='red'"

function dumpFieldsClicked(e) {
    chrome.tabs.executeScript(null,
        {
          file: 'dumpAllFieldsToConsole.js'
        });
    window.close();
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    // Hide Sidebar Checkbox
    var dumpFieldsButton = document.querySelector('#dump-fields');
    if (dumpFieldsButton){
      dumpFieldsButton.addEventListener('click', dumpFieldsClicked);
    }
  });