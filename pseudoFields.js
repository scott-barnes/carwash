(function run() {
  var problemDetails = $('textarea').filter((i,e)=>e.id === 'REQD.P.PROBLEM_DETAILS')
  if(!problemDetails) { return; }
  
  var roiRegex = /ROI Evaluation \[vers 1\.1\]/i
  var match = roiRegex.exec( problemDetails[0].textContent )
  if(!match) { return; }
  
  var before = match.input.substring( 0, match.index ).trim()
  var after = match.input.substring( match.index + match[0].length ).trim()
  
  var clone = problemDetails.clone()
  clone.removeProp('id')
  clone.removeProp('name')
  clone.removeProp('form')
  /* // (manual clone)
  var clone = $('<textarea>')
  var ignore = ['id','name','form','type','value','textLength','willValidate','namespaceURI','localName','tagName','clientTop','clientLeft']
  for( var property in problemDetails[0] ) {
    if( 1 + ignore.indexOf( property ) ) { continue }
    if( /Width|Height|HTML|[A-Z_]/.test( property ) ) { continue }
    
    var value = problemDetails[0][property]
    var type = typeof(value)
    if( value && value !== -1 && type !== 'object' && type !== 'function' ) {
      clone.prop( property, value )
    }
  }
  
  clone.style = problemDetails[0].style
  */
  
  clone.text( before )
  
  clone.appendTo( problemDetails.parent() )
  problemDetails.css({ display: 'none' })
})();
