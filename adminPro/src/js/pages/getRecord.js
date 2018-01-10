var getRec = new Vue({
    el: '#getRecord',
    data: {
        message: 'getRecord',
        items: [],
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getList();
        })
    },
    filters: {
        dateNormal: function(value) {
            return dateFormat(value);
        }
    },
    methods: {
        getList: function() {
            var _this = this;
            this.$http.get('output.json').then(function(res) {
                console.log(res.body.result.length);
                _this.items = res.body.result;
            })
        },
    }
})
function dateFormat(value) {
    var date =  new Date(value);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2)+"-"+d.substring(d.length-2);
}