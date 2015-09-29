var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('TweetsController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    // $scope.tweet = 'Hello Woooorldddd!';
    // $scope.tweetUser = 'RobotTest';
    $scope.tweets = [];
    $scope.tweetUser = $routeParams.user;
    $http.get('/messages')              // $http.get(url)
        .success(function (messages) {
            //$scope.tweets = messages.reverse();
            messages.forEach(function (message) {
                if (message.userName === $scope.tweetUser) {
                    $scope.tweets.unshift(message);
                }
            })
        })
        .error(function (err) {
            console.error(err);
        });
    $scope.postTweet = function () {
        var tweet = {
            text: $scope.tweet,
            userName: $scope.tweetUser
        };
        $http.post('/messages', tweet)          // $http.post(url, data)
            .success(function () {
                //  $http.get('/messages')          // $http.get(url)
                // .success(function (messages) {
                $scope.tweets.unshift(tweet);
            })
            .error(function (err) {
                console.error(err);

            })

    }
}])

myApp.controller('WelcomeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.username = '';
    $scope.submit = function () {
        console.log('inside submit!');
        $location.path('/tweets/' + $scope.username);
    }
}])

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '../views/welcome.html',
            controller: 'WelcomeController'
        })
        .when('/tweets/:user', {
            templateUrl: '../views/tweets.html',
            controller: 'TweetsController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

/*
        ---------- Old code from original 'myTweets' lab ----------
$(document).ready(function(){
	
	var tweets = [];
	
	 $('.tweet-button').click(function(){
        if(!validateTweet()) {
            alert('Missing data!');
            return;
        }
        
        var tweetText = $('.tweet-text').val();
        postData(tweetText, $('.tweet-user').val());
    });

	function postData(text, userName) {
		/*This function should create a post request using jquery. When posted it should:
			1) Add tweets to the 'database'
			2) After posted prepend message to list of messages and clear input box */
  /*      var tweet = {};
        tweet.text = text;
        tweet.userName = userName;
        $.ajax({
            url: '/messages',
            method: 'POST',
            data: JSON.stringify(tweet)
        }).done(function(result) {
            addTweet(tweet);
            clearTweet();
        }).fail(function(err) {
            alert(err);
        });
    }

	function getData() {
		/*This function should make a get request from 'database',
		parse the data and prepend each to the page*/
   /*     $.ajax({
            url: '/messages'
        }).done(function(results){
            var t = results.split('\n');
            var totTweets = tweets.length == 0 ? 0 : tweets.length - 1;
            for (var i = totTweets; i < t.length; i++) {
                var tweet = JSON.parse(t[i]);
                tweets.push(tweet);
                addTweet(tweet);
            }
        });
    }
	
	function addTweet(tweet) {
        var divTweets = $('.tweets');
        divTweets.prepend(createTweetDiv(tweet));
    }

    function createTweetDiv(tweet){
        var tdiv = $('<div class="tweet col-md-12"></div>');
        tdiv.text(tweet.userName + ': ' + tweet.text);
        return tdiv;
    }

    function validateTweet() {
        if($('.tweet-text').val() === '' || 
            $('.tweet-user').val() === '') {
                return false;
            }
        return true;
    }
	function clearTweet() {
        $('.tweet-text').val('');
    }

/*   ----Calls function once page loaded to display tweets to page----

	getData();
*/
 /*   setInterval(
        getData(), 
        5000
       );
});
*/

