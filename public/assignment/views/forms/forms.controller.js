(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope, FormService,$location){
        var currentAllUserForms= [];
        var currentUser = null;
        var selectedFormIndex = -1;

        if($rootScope == null){
            $location.path("/home");
        }
        else{
            currentUser = $rootScope;
            FormService.findAllFormsForUser(currentUser._id, renderAllForms);
        }

        function renderAllForms(userForm){
            $scope.forms = userForm;
            currentAllUserForms = userForm;
        }

        //event declarations
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;

        function addForm(formName){
            var newForm = {
            "_id" : null,
            "title" : formName,
            "userId" : null};

            FormService.createFormForUser(currentUser._id, newForm, renderAdd);
        }

        function renderAdd(newForm){
            $scope.formName = null;
            currentAllUserForms.push(newForm);
            $scope.forms = currentAllUserForms;

        }

        function selectForm(index){
            selectedFormIndex = index;
            var selectForm = currentAllUserForms[index];
            $scope.formName = selectForm.title ;

        }

        function deleteForm(index){
            selectedFormIndex= index;
            FormService.deleteFormById(currentAllUserForms[index]._id, renderDelete);
        }

        function renderDelete(allForms){
            FormService.findAllFormsForUser(currentUser._id, renderAllForms);
            
        }

        function updateForm(formName){
            if(selectedFormIndex != -1){
                var selectedForm = currentAllUserForms[selectedFormIndex];
                selectedForm.title = formName;
                FormService.updateFormById(selectedForm._id, selectedForm, renderUpdate);
                selectedFormIndex = -1;
                $scope.formName = null;
            }
        }

        function renderUpdate(newForm){
            FormService.findAllFormsForUser(currentUser._id, renderAllForms);
        }


    }
})();
