(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("DetailsController",DetailsController);

    function DetailsController(GroupService, $routeParams, $location, UserService, NoteService){

        var vm = this;

        vm.goToNoteText = goToNoteText;
        vm.addMembers = addMembers;
        vm.deleteMembers = deleteMembers;
        vm.addNotes = addNotes;
        vm.deleteNote = deleteNote;

        function init(){


            UserService.getCurrentUser()
                .then(function (response) {
                    vm.user = response.data;

                    NoteService.getAllNotesForUser(vm.user._id)
                        .then(function(response){
                            if(response.data){
                                vm.notes = response.data;
                            }
                        });

                    if (vm.user == null) {
                        $location.path("/home");
                    }
                else {
                        GroupService.findGroupById($routeParams.groupId)
                            .then(function (response) {
                                if (response.data) {
                                    vm.group = response.data;
                                    vm.group._id = response.data._id;
                                    vm.group.title = response.data.title;
                                    vm.group.members = response.data.members;
                                    vm.group.shared = response.data.shared;
                                    UserService.findAllUsers()
                                        .then(function (response) {
                                            vm.users = response.data;
                                        });
                                }

                            });
                    }
                    });

        }
        init();

        function goToNoteText(title){
            var curNote;

            NoteService.findByTitle(title)
                .then(function(response){
                    curNote = response.data;
                    vm.note = curNote[0];
                    var noteId = vm.note._id;
                    if(vm.note.type == "Text"){
                        $location.path( '/note/' + noteId + '/noteText');
                    }
                    else if (vm.note.type == "CheckList"){
                        $location.path('/note/' + noteId + '/checklist');
                    }
                });

        }

        function addMembers(use, group){

            if (use != null){

                vm.group = group;

                var addMem = {
                    "_id": vm.group._id,
                    "title": vm.group.title,
                    "members": vm.group.members.concat(vm.use),
                    "shared": vm.group.shared,
                    "createdBy": vm.user._id

                };

                GroupService.updateMembers(vm.use, addMem)
                    .then(function(response){
                        if(response.data){
                            vm.users[vm.index] = response.data;
                            vm.index = -1;
                            init();
                        }
                    });
            }
        }

        function deleteMembers(del, group){
            if (del != null){

                vm.del = del;
                vm.group = group;
                var ind = vm.group.members.indexOf(vm.del);

                vm.group.members.splice(ind,1);


                var delMem = {
                    "_id": vm.group._id,
                    "title": vm.group.title,
                    "members": vm.group.members,
                    "shared": vm.group.shared,
                    "createdBy": vm.user._id

                };

                GroupService.updateMembers(ind , delMem)
                    .then(function(response){
                        if(response.data){
                            vm.users[vm.index] = response.data;
                            vm.index = -1;
                            init();
                        }
                    });
            }
        }

        function addNotes(note, group){

            if (note != null){

                vm.group = group;

                var addNote = {
                    "_id": vm.group._id,
                    "title": vm.group.title,
                    "members": vm.group.members,
                    "shared": vm.group.shared.concat(vm.note),
                    "createdBy": vm.user._id

                };

                GroupService.updateNotes(addNote)
                    .then(function(response){
                        if(response.data){
                            vm.notes[vm.index] = response.data;
                            vm.index = -1;
                            init();
                        }
                    });
            }
        }

        function deleteNote(note, group){

            if (note != null){

                vm.note = note;
                vm.group = group;
                var ind = vm.group.shared.indexOf(vm.note);

                vm.group.shared.splice(ind,1);


                var delNote = {
                    "_id": vm.group._id,
                    "title": vm.group.title,
                    "members": vm.group.members,
                    "shared": vm.group.shared,
                    "createdBy": vm.user._id

                };

                GroupService.updateNotes(delNote)
                    .then(function(response){
                        if(response.data){
                            vm.notes[vm.index] = response.data;
                            vm.index = -1;
                            init();
                        }
                    });
            }

        }
    }

})();
