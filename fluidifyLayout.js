(function run() {
<<<<<<< .merge_file_a19048
  document.body.style.backgroundColor='green';
=======
  // No rows! No columns!
  ['.row','.col_1_1','.col_2_1','.col_2_2','.col_3_1','.col_3_2','.col_3_3'].forEach(carClass => {
    $(carClass).each(function() {
      var self = $(this)
      self.children().prependTo(self.parent())
      self.remove()
    })
  })
>>>>>>> .merge_file_a13472
})();