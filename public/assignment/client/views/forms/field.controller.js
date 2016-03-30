(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($scope, FieldService,$location, FormService, $routeParams) {

        var vm = this;

        vm.addField = addField;
        vm.cloneField = cloneField;
        vm.deleteField = deleteField;
        vm.selectField = selectField;
        vm.editField = editField;
        $scope.updateForm = updateForm;

        function updateForm(start,end){
            alert(start + " " + end);
            var newFields = [];

            for(var i in vm.fields){
                newFields[i] = vm.fields[i];
            }

            var temp = newFields[start];
            newFields[start] = newFields[end];
            newFields[end] = temp;

            FormService.findFormById($routeParams.formId)
                .then(function(response){
                    var form = response.data;
                    form.fields = newFields;
                   // console.log(form._id);
                    FormService.updateFormById(form._id,form);
                });
        }

        function init(){

            FieldService.getFieldsForForm($routeParams.formId)
                .then(function(response){
                    if(response.data){
                        vm.fields = response.data;
                    }
                });

        }
        init();



        function addField(fieldType){
            var newField = null;
            switch(fieldType){
                case "TEXT":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS":
                    newField = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "CHECKBOXES":
                    newField = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "RADIOS":
                    newField = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;


            }

            FieldService.createFieldForForm(FormService.getFormId(), newField)
                        .then(function(response){
                            if (response.data){
                                init();
                            }

                });

        }

        function cloneField(newField){
            FieldService.createFieldForForm(FormService.getFormId(), newField)
                .then(function(response){
                    if (response.data){
                        init();
                    }

                });
        }

        function deleteField(fieldId){
            FieldService.deleteFieldFromForm( FormService.getFormId(), fieldId)
                .then(function(response){
                    if(response.data){
                        init();
                    }
                });
        }

        function selectField(field){

            vm.updatedField = field;
            vm.label = field.label;


            if(field.options){
                var str = "" ;
               for(var i in field.options){
                   str = str + field.options[i].label;
                   str += ":"
                   str = str + field.options[i].value;
                   str += "\n";
               }
                vm.options = str;

            }

            if(field.placeholder){
                vm.placeholder = field.placeholder;
            }

        }

        function editField(){
            if(vm.updatedField.options) {
                var opts = vm.options.split("\n");
                var update = [];

                for (var i in opts) {
                    var pair = opts[i].split(":");
                    var edited = {"label": pair[0], "value": pair[1]};
                    update.push(edited);
                }

                vm.updatedField.options = update;
            }

            if(vm.updatedField.placeholder){
                vm.updatedField.placeholder  = vm.placeholder
            }

            vm.updatedField.label = vm.label;

            FieldService
                .updateField(FormService.getFormId(),vm.updatedField._id,vm.updatedField)
                .then(
                    function(response){
                        init();
                    }
                );
        }


    }
})();

