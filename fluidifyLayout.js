function promoteChildren() {
  var self = $(this)
  self.children().prependTo( self.parent() )
  self.remove()
}

(function run() {
  // No rows! No columns!
  ['.row','.col_1_1','.col_2_1','.col_2_2','.col_3_1','.col_3_2','.col_3_3'].forEach(
    carClass => $(carClass).each( promoteChildren )
  )
  
  // Suppress sidebars.
  $('.sectionsTopBar').remove()
  $('#sidebarInner').remove()
  $('#sectionsInner').each( promoteChildren )
  
  // Eliminate shadows.
  $('.section-content-shadow').remove()
  $('.field').prop("class", "field cfield");

  // Eliminate fields without values.
  var empties = $('.field-value').find('span').filter( (i, e) => !e.textContent )
  empties.parents('.field').addClass('empty')
})();
