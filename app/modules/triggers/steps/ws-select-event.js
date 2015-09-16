(function (app) {
    'use strict';

    app.controller('wsSelectEventController', function ($scope, $api) {
        //$scope.events = {
        //    commit_comment: 'CommitCommentEvent',
        //    create: 'CreateEvent',
        //    delete: 'DeleteEvent',
        //    deployment: 'DeploymentEvent',
        //    deployment_status: 'DeploymentStatusEvent',
        //    download: 'DownloadEvent',
        //    follow: 'FollowEvent',
        //    fork: 'ForkEvent',
        //    fork_apply: 'ForkApplyEvent',
        //    gist: 'GistEvent',
        //    gollum: 'GollumEvent',
        //    issue_comment: 'IssueCommentEvent',
        //    issues: 'IssuesEvent',
        //    member: 'MemberEvent',
        //    membership: 'MembershipEvent',
        //    page_build: 'PageBuildEvent',
        //    public: 'PublicEvent',
        //    pull_request: 'PullRequestEvent',
        //    pull_request_review_comment: 'PullRequestReviewCommentEvent',
        //    push: 'PushEvent',
        //    release: 'ReleaseEvent',
        //    repository: 'RepositoryEvent',
        //    status: 'StatusEvent',
        //    team_add: 'TeamAddEvent',
        //    watch: 'WatchEvent'
        //};

        $scope.$context.data.eventName = null;

        $scope.$context.behavior.entering = function (options, callback) {
            if (options.entered) {
                return callback();
            }
            else {
                $api.request('events', 'all', null, function (error, events) {
                    if (error) {
                        alert(angular.toJson(error, true));
                    }
                    else {
                        $scope.events = events;
                    }
                    return callback();
                });
            }
        };

        $scope.selectEvent = function (e, eventName) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            $scope.$context.data.eventName = eventName;
        };

    });

})(window.app);