(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("DetailsController",DetailsController);

    function DetailsController(GroupService, $routeParams, $location, UserService, NoteService, $scope){

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
                                    vm.group.createdBy = response.data.createdBy;
                                    vm.group.members = response.data.members;
                                    vm.group.shared = response.data.shared;
                                    UserService.findAllUsers()
                                        .then(function (response) {
                                            vm.users = response.data;
                                        });

                                   if(vm.user._id ==  vm.group.createdBy ){
                                       vm.showMems = true;
                                   }
                                    else{
                                       vm.showMems = false;
                                   }

                                    UserService.findUserById(vm.group.createdBy)
                                        .then(function(response){
                                            vm.admin = response.data.firstName;
                                        })
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
                        $location.path( '/note/' + noteId + '/previewText');
                    }
                    else if (vm.note.type == "CheckList"){
                        $location.path('/note/' + noteId + '/previewList');
                    }
                });

        }

        function addMembers(use, group){

            if (use != null){
                vm.use = use;
                vm.group = group;

               for(var i in vm.group.members){
                   if(vm.group.members[i] == vm.use){
                       $scope.message = "Please do not add the same member twice";
                       return;
                   }
               }

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
                vm.note = note;

                for(var i in vm.group.shared){
                    if(vm.group.shared[i] == vm.note){
                        $scope.message = "Please do not add the same note twice";
                        return;
                    }
                }

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
