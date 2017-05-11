'use strict'

const streamify = require('stream-array')
const sort = require('./index.js')
const through = require('through')

var arr = [9, 4, 56, 3, 2, 1, 15, 23, 5, 23, 6, 7, 8, 3, 21, 14, 19, 12, 12, 15]

var cmp = (x, y) => x < y ? -1 :
    x == y ? 0 :
        1

var sorter = sort(cmp, {objectMode: true})
streamify(arr)
    .pipe(through(function (data) { console.log('before: ' + data); this.queue(data); }))
    .pipe(sorter)
    .pipe(through(function (data) { console.log('after: ' + data); this.queue(data); }))