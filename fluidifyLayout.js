function promoteChildren() {
  var self = $(this)
  self.children().prependTo( self.parent() )
  self.remove()
}

(function run() {
  // Enable side-by-side display of small fields.
  var largeFields = [
    '.col_1_1',
    '.col_2_2',
    '.col_3_3'
  ];
  var smallFields = [
    '.col_2_1',
    '.col_3_1',
    '.col_3_2'
  ];
  largeFields.forEach( fieldClass => $(fieldClass).children().addClass( 'large-field' ) )
  smallFields.forEach( fieldClass => $(fieldClass).children().addClass( 'small-field' ) )
  
  // No rows! No columns!
  var allFields = [
    '.row',
    '.col_1_1',
    '.col_2_1',
    '.col_2_2',
    '.col_3_1',
    '.col_3_2',
    '.col_3_3'
  ];
  allFields.forEach( fieldClass => $(fieldClass).each( promoteChildren ) )
  
  // Suppress sidebars.
  $('.sectionsTopBar').remove()
  $('#sidebarInner').remove()
  $('#sectionsInner').each( promoteChildren )
  
  // Eliminate shadows.
  $('.section-content-shadow').remove()
})();
