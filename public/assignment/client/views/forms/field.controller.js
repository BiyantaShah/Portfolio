(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($scope, FieldService,$location, FormService) {

        var vm = this;

        function init(){

            FieldService.getFieldsForForm(FormService.getFormId())
                .then(function(response){
                    if(response.data){
                        vm.fields = response.data;
                    }
                });

        }
        init();



    }
})();

