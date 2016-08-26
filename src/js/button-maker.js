angular.module('app', [ 'ngResource' ]);
angular.module('app').controller('ButtonMakerCtrl', ['$scope', '$timeout', function($scope, $timeout) {

	$scope.bm = function(scope) {
		var me = {
			title: 'Call to action!',
			filename: '',
			color: 'blue',
			colors: [ 'blue', 'green' ],

			btnHeight: 0,
			btnWidth: 0,

		};
		me.init = function() {
			me.doStuffChanged();
		};
		me.doStuffChanged = function() {
			me.measureButton();
			me.filename = me.getFilename();
		}
		me.getFilename = function() {
			var filename = me.title.trim();
			filename = filename.replace(/\s+/g, "_");
			filename = filename.replace(/\W+/g, "");
			filename = filename.replace(/_/g, "-");
			filename = filename + "-" + me.color + ".png";
			return filename.toLowerCase();
		};
		me.measureButton = function() {
			$timeout(function() {
				var sample = document.getElementById("sample");
				me.btnHeight = sample.offsetHeight;
				me.btnWidth = sample.offsetWidth;
			});
		};
		me.saveAs = function() {
			var sample = document.getElementById("sample");
			html2canvas(sample, {
				height: me.btnHeight,
				width: me.btnWidth,
				onrendered: function(canvas) {
					var png = canvas.toDataURL("image/png");
					me.SaveToDisk(png, me.filename);
				}
			});
		};
		me.SaveToDisk = function(fileURL, fileName) {
		    // for non-IE
		    if (!window.ActiveXObject) {
		        var save = document.createElement('a');
		        save.href = fileURL;
		        save.target = '_blank';
		        save.download = fileName || 'unknown';

		        var event = document.createEvent('Event');
		        event.initEvent('click', true, true);
		        save.dispatchEvent(event);
		        (window.URL || window.webkitURL).revokeObjectURL(save.href);
		    }

		    // for IE
		    else if ( !! window.ActiveXObject && document.execCommand)     {
		        var _window = window.open(fileURL, '_blank');
		        _window.document.close();
		        _window.document.execCommand('SaveAs', true, fileName || fileURL)
		        _window.close();
		    }
		}
		return me;
	}($scope);

}]);
