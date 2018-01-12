//让低版本ie兼容map方法
if (typeof Array.prototype.map != 'function') {
    Array.prototype.map = function(fn, context) {
        var arr = [];
        if (typeof fn === 'function') {
            for (var k = 0; k < this.length; k++) {
                var element = array[k];
                arr.push(fn.call(context, this[k], k, this));
            }
        }
        return arr;
    };
}
var users = [
    {name: "张含韵", "email": "zhang@email.com"},
    {name: "江一燕",   "email": "jiang@email.com"},
    {name: "李小璐",  "email": "li@email.com"}
];
var box = users.map( (user)=> user.name);
console.log(box.join(','));