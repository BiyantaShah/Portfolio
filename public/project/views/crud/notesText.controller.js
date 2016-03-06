(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("TextController",TextController);

    function TextController($scope, NoteTextService) {

        var currentAllNoteText= []; //Notebooks of the current user
        var currentNoteText = null; //Current user is stored
        var selectedTextIndex = -1; //the index of the Note selected

        currentNoteText = NoteTextService.findAllText(renderAllTexts);


        //event declarations
        $scope.addText = addText;
        $scope.deleteText = deleteText;
        $scope.selectText = selectText;
        $scope.updateText = updateText;


        //event implementations

        function addText(titleName,textData) {

            if (titleName != null && textData != null) {
                var newNoteText = {
                    "_id": null,
                    "title": titleName,
                    "content": textData
                };

                NoteTextService.createNoteText(newNoteText, renderAdd);
            }
        }

        function deleteText(index) {
            NoteTextService.deleteNoteTextById(currentAllNoteText[index]._id, renderDelete);
        }



        function selectText(index) {
            selectedTextIndex = index;
            var selectText = currentAllNoteText[index];
            $scope.titleName = selectText.title ;
            $scope.textData = selectText.content;

        }


        function updateText(titleName,textData) {
            if(selectedTextIndex != -1){
                var selectedText = currentAllNoteText[selectedTextIndex];
                selectedText.title = titleName;
                selectedText.content = textData;
                NoteTextService.updateNoteText(selectedText._id, selectedText, renderUpdate);

                $scope.titleName = null;
                $scope.textData = null;
            }
        }

        function renderAllTexts(usercontent) {
            //console.log(userGroup);
            $scope.texts = usercontent;
            currentAllNoteText = usercontent;
        }

        function renderAdd(newSubject) {
            $scope.titleName = null;
            $scope.textData = null;
            $scope.texts = currentAllNoteText;

        }

        function renderDelete(allGroups) {
            NoteTextService.findAllText(renderAllTexts);

        }

        function renderUpdate(newSubject) {
            NoteTextService.findAllText(renderAllTexts);
            selectedTextIndex = -1;
        }


    }
})();


