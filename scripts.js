Function.prototype.bindToEventHandler = function bindToEventHandler() {
  var handler = this;
  var boundParameters = Array.prototype.slice.call(arguments);
  //create closure
  return function(e) {
      e = e || window.event; // get window.event if e argument missing (in IE)   
      boundParameters.unshift(e);
      handler.apply(this, boundParameters);
  }
};

$(function() {
  $('.frame, .text-box').resizable().draggable();
  $("#add-text").click(function() {
    var text_add_control = $("<div class='text-box'><textarea></textarea></div>").draggable().resizable().selectable();
    $('.spread').append(text_add_control)
  })

  window.addEventListener('load', function() {
    var status = $('#spread')[0];
    var drop   = $('.spread')[0];
    // var list   = document.getElementById('list');
    
    function cancel(e) {
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    }
  
    // Tells the browser that we *can* drop on this target
    drop.addEventListener('dragover', cancel);
    drop.addEventListener('dragenter', cancel);
  }, false);

  window.addEventListener('drop', function(e) {
    if (e.preventDefault) { e.preventDefault(); } // stops the browser from redirecting off to the image.

    var dt    = e.dataTransfer;
    var files = dt.files;
    for (var i=0; i<files.length; i++) {
      var file = files[i];
      var reader = new FileReader();
      
      reader.addEventListener('loadend', function(e, file) {
        var bin           = this.result; 
        var new_frame       = $("<div class='frame' style='width: 300px; height: 200px;'></div>").draggable().resizable();
        $('.spread').append(new_frame)
        var img = document.createElement("img"); 
        img.file = file;
        img.src = bin;
        new_frame.append(img);
      }.bindToEventHandler(file));     
      reader.readAsDataURL(file);
    }
    return false;
  });
});

