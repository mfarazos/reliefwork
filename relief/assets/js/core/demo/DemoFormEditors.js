(function (namespace, $) {
	"use strict";

	var DemoFormEditors = function () {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function () {
			o.initialize();
		});

	};
	var p = DemoFormEditors.prototype;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function () {
		this._initSummernote();
		this._initCKEditor();
	};

	// =========================================================================
	// SUMMERNOTE EDITOR
	// =========================================================================

	p._initSummernote = function () {
		if (!$.isFunction($.fn.summernote)) {
			return;
		}

		// Full toolbar
		$('#summernote').summernote();
		
		// Simple toolbar
		$('#simple-summernote').summernote({
			height: $('#simple-summernote').height(),
			placeholder: 'write here...',
			//height: 300,
			toolbar: [
				['style', ['bold', 'italic', 'underline', 'clear']],
				['fontsize', ['fontsize']],
				['color', ['color']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']]
			],
			onkeydown:function(e){
				alert(e);
            var num = $('#simple-summernote').code().replace(/(<([^>]+)>)/ig,"").length;
            var key = e.keyCode;
            allowed_keys = [8, 37, 38, 39, 40, 46]
            if($.inArray(key, allowed_keys) != -1)
                return true
            else if(num > 10){
                e.preventDefault();
                e.stopPropagation()
                }
            }
		});
		
		//custom
		 $('#txtNote').summernote({
            height: 130,
            toolbar: [
                ['fontname', ['fontname']],
                ['fontsize', ['fontsize']],
                ['style', ['clear', 'bold', 'italic', 'underline']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['misc', ['fullscreen', 'codeview', 'undo', 'redo']]
            ]
  });

 $('#txtNote').on('summernote.keyup', function (e) 
 {
         console.log($('#txtNote').code());
         var length = $('#txtNote').code().replace(/(<([^>]+)>)/ig, "").replace(/( )/, " ").length;
         length = 5 - length;
         $('#spanTextCount').text(length);
  });
  
  //----------------
  $('.summernote').summernote({
	  //height: $('.summernote').height(),
	  height: 500,
			placeholder: 'Maximam 10,000 characters allowed.',
			toolbar: [
                ['fontname', ['fontname']],
                ['fontsize', ['fontsize']],
                ['style', ['clear', 'bold', 'italic', 'underline']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['misc', ['fullscreen','undo', 'redo']]
            ],
	  //height: 130,
onKeydown: function (e) {
var t = e.currentTarget.innerText;
if (t.trim().length >= 10000) {
//delete key
if (e.keyCode != 8)
e.preventDefault();
}
},
onKeyup: function (e) {
var t = e.currentTarget.innerText;
$('#spanTextCount').text(10000 - t.trim().length);
},
onPaste: function (e) {
var t = e.currentTarget.innerText;
var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
e.preventDefault();
var all = t + bufferText;
document.execCommand('insertText', false, all.trim().substring(0, 10000));
$('#spanTextCount').text(10000 - t.length);

}
});
  //-----------------
		
	};

	// =========================================================================
	// CKEDITOR
	// =========================================================================

	p._initCKEditor = function () {
		$('#ckeditor').ckeditor();

		
		

		// By default, CKEditor add a WYSIWEG editor to all content with the contenteditable set to true
		// To be able to demo Summernote on this page, this function is disabled.
		CKEDITOR.disableAutoInline = true;
		if ($('#inlineContent1').length > 0)
			CKEDITOR.inline('inlineContent1');
		if ($('#inlineContent2').length > 0)
			CKEDITOR.inline('inlineContent2');
	};



	// =========================================================================
	namespace.DemoFormEditors = new DemoFormEditors;
}(this.materialadmin, jQuery)); // pass in (namespace, jQuery):
