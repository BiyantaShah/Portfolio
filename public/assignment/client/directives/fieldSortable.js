"use strict";

(function () {

    angular
        .module("fieldSortable", [])
        .directive("fieldSortable", fieldSortable);

    function fieldSortable() {

        var start = null, end = null;

        function link(scope, element, attributes) {

            var fieldAxis = attributes.fieldAxis;

            $(element).sortable( {

                axis: fieldAxis,

                start: function (event, ui) {

                    start = ui.item.index();
                },

                stop: function (event, ui) {

                    end = ui.item.index();
                    scope.$apply(function(){
                        scope.updateForm(start,end);
                    });

                }
            });
        }
        return {
            link: link
        }
    }
})();