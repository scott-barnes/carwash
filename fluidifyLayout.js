(function run() {
  // No columns!
  ['.col_1_1','.col_2_1','.col_2_2','.col_3_1','.col_3_2','.col_3_3'].forEach(carClass => {
    $(carClass).each(function() {
      var self = $(this)
      self.children().appendTo(self.parent())
      self.remove()
    })
  })
})();