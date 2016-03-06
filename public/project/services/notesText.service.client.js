(function(){
    angular
        .module("NoteTakerWebsite")
        .factory("NoteTextService", NoteTextService);

    function NoteTextService(){

        var texts = [
            {	"_id":001, "title": "NOTE 1", "content":"This is Note1. " +
            "You can edit , delete, update or add text in this note"+
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
            "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud" +
            " exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu " +
            "fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
            "culpa qui officia deserunt mollit anim id est laborum"},
            {	"_id":002, "title": "NOTE 2", "content":"This is Note2. " +
            "You can edit, delete, update or add text in this note"+
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque" +
            " laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi " +
            "architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas " +
            "sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione " +
            "voluptatem sequi nesciunt."}

        ]

        var api = {
            findAllText: findAllText,
            createNoteText: createNoteText,
            deleteNoteTextById: deleteNoteTextById,
            updateNoteText:updateNoteText
        }

        return api;


        function findAllText(callback)
        {
            callback(texts);
        }

        function createNoteText(text, callback) {
            texts.push(text);
            callback(text);
        }

        function deleteNoteTextById(textId, callback) {

            for (var i = 0; i < texts.length; i++) {
                if (texts[i]._id == textId) {
                    texts.splice(i,1);
                    break;
                }
            }
            callback(texts);

        }

        function updateNoteText(textId, text, callback)
        {
            for (var i = 0; i < texts.length; i++) {
                if (texts[i]._id == textId) {
                    texts[i].title = text.title;
                    texts[i].content = text.content;


                    break;
                }
            }
            callback(texts[i]);


        }

    }
})();

