(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("NoteListController",NoteListController);

    function NoteListController($scope, NoteService,$location, UserService) {

        var currentAllUserNotes= []; //Notes of the current user
        var currentUser = null; //Current user is stored
        var selectedNoteIndex = -1; //the index of the Note selected

        if (UserService.getCurrentUser() == null) {
            $location.path("/home");
        }
        else{
            currentUser = UserService.getCurrentUser();
            NoteService.findAllNotesForUser(currentUser._id, renderAllForms);
        }


    }
})();

