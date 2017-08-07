"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 4444;
var router = express.Router();
var _talks = [
    {
        'id': 898,
        'title': 'Are we there yet?',
        'speaker': 'Rich Hickey',
        'description': 'In his keynote at JVM Languages Summit 2009, Rich Hickey advocated for the reexamination of basic principles like state, identity, value, time, types, genericity, complexity, as they are used by OOP today, to be able to create the new constructs and languages to deal with the massive parallelism and concurrency of the future.',
        'yourRating': null,
        'rating': 9.1
    },
    {
        'id': 777,
        'title': 'The Value of Values',
        'speaker': 'Rich Hickey',
        'description': 'Rich Hickey compares value-oriented programming with place-oriented programming concluding that the time of imperative languages has passed and it is the time of functional programming.',
        'yourRating': null,
        'rating': 8.5
    },
    {
        'id': 466,
        'title': 'Simple Made Easy',
        'speaker': 'Rich Hickey',
        'description': 'Rich Hickey emphasizes simplicity’s virtues over easiness’, showing that while many choose easiness they may end up with complexity, and the better way is to choose easiness along the simplicity path.',
        'yourRating': null,
        'rating': 8.2
    },
    {
        'id': 322,
        'title': 'Growing a Language',
        'speaker': 'Guy Steele',
        'description': 'Guy Steele\'s keynote at the 1998 ACM OOPSLA conference on \'Growing a Language\' discusses the importance of and issues associated with designing a programming language that can be grown by its users.',
        'yourRating': null,
        'rating': 8.9
    }
];
router.get('/talks', function (req, res) {
    var filters = req.query;
    console.log('GET /talks', 'filters:', filters);
    var filteredTalks = _talks.filter(function (t) {
        var titlePass = filters.title ? t.title.indexOf(filters.title) > -1 : true;
        var speakerPass = filters.speaker ? t.speaker.indexOf(filters.speaker) > -1 : true;
        var ratingPass = filters.minRating ? t.rating >= filters.minRating : true;
        return titlePass && speakerPass && ratingPass;
    });
    var talks = filteredTalks.reduce(function (acc, t) { return (acc[t.id] = t, acc); }, {});
    var list = filteredTalks.map(function (t) { return t.id; });
    res.json({ talks: talks, list: list });
});
router.get('/talk', function (req, res) {
    var id = +req.query.id;
    console.log('GET /talk', 'id:', id);
    var talk = _talks.filter(function (t) { return t.id === id; })[0];
    res.json({ talk: talk });
});
router.post('/rate', function (req, res) {
    var id = req.body.id;
    var yourRating = req.body.yourRating;
    console.log('POST  /rate', 'id:', id, 'yourRating:', yourRating);
    if (yourRating > 10) {
        res.status(500);
        res.json({ status: 'ERROR', message: 'Rating cannot be > 10' });
    }
    else {
        var talk = _talks.filter(function (t) { return t.id === id; })[0];
        talk.yourRating = yourRating;
        res.json({ status: 'OK' });
    }
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.listen(port);
console.log("Server port: " + port);
//# sourceMappingURL=/Users/vsavkin/projects/products/exemplary/server/server.js.map
