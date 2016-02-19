/**
 * Created by Biyanta on 19/02/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController);

    function SearchController(MovieService,$location,$scope, $http, $routeParams){

        var title = $routeParams.title;

        if(title){
            search(title);
        }
       //event handlers declaration
        $scope.search = search;

       // event handler implementation
        function search(title){
            console.log(title);
            $location.url("/search/"+title);
            MovieService.findMoviesByTitle(title, render);
            //$http.get("http://www.omdbapi.com/?s="+title)
              //  .success(render);
        }

        function render(response){
            console.log(response);
            $scope.data=response;
        }

    }
})();
