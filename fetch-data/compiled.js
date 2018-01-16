'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _zutil = require('./zutil');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ctrl = function () {
    function Ctrl() {
        _classCallCheck(this, Ctrl);

        console.log(this.mapTrans(arr));
    }

    _createClass(Ctrl, [{
        key: 'mapTrans',
        value: function mapTrans(arr) {
            arr.map(function (item) {
                return (0, _zutil.formatTime)(new Date(item));
            });
        }
    }]);

    return Ctrl;
}();

var timeArr = [1515825377960, 1515825377160, 1515825377260];
new Ctrl(timeArr);

var people = {
    name: 'fengfan',
    age: 24
};
var name = people.name,
    age = people.age;

console.log(name);
