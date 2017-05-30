/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url.length).toBeGreaterThan(0);
            }, this);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function () {
        var body = $('body');

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function () {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('changes visibility when menu icon is clicked', function () {
            var menuLink = $('.menu-icon-link');

            menuLink.click();
            expect(body.hasClass('menu-hidden')).toBeFalsy();

            menuLink.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('has at least a single entry element within the feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        var feedSelection;

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                feedSelection = $('.feed').html();
                
                loadFeed(1, function () {
                    done();
                });
            });

        });

        it('will change content', function (done) {
            expect(feedSelection).not.toBe($('.feed').html());
            done();
        });
    });
}());