(function(){
    'use strict';
    // dummy functionality
    // for displaying CRUD
    angular
        .module("NoteTakerWebsite")
        .factory("SubjectCrudService", SubjectCrudService);

    function SubjectCrudService(){

        //initializing array of notes with JSON data

        var subjects = [
            {"_id": "000", "title": "Science","notebooks": ["Physics", "Chemistry", "Mathematics"]},
            {"_id": "010", "title": "Commerce", "notebooks":["Accounting", "Administration"]},
            {"_id": "020", "title": "Arts",   "notebooks":["Pschycology", "Economics"]},
            {"_id": "030", "title": "Architecture", "notebooks":["interior","scalars"]}

        ]

        var api={
            createSubjectForUser:createSubjectForUser,
            findAllSubjects: findAllSubjects,
            deleteSubjectById:deleteSubjectById,
            updateSubjectById:updateSubjectById
        }

        return api;

        function createSubjectForUser( subject, callback) {
            subjects.push(subject);
            callback(subject);

        }

        function findAllSubjects (callback) {
            callback(subjects);
        }

        function deleteSubjectById(subjectId, callback){

            for (var i = 0; i < subjects.length; i++) {
                if (subjects[i]._id == subjectId) {
                    subjects.splice(i,1);
                    break;
                }
            }
            callback(subjects);
        }

        function updateSubjectById(subjectId, newSubject, callback){

            for (var i = 0; i < subjects.length; i++) {
                if (subjects[i]._id == subjectId) {
                    subjects[i].title =newSubject.title;
                    subjects[i].notebooks = newSubject.notebooks;
                    break;
                }
            }

            callback(subjects[i]);

        }





    }
})();