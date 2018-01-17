import {formatTime, formatNumber, diag} from './zutil';
import {a} from './zutil';

class Ctrl {
    constructor(arr) {
        this.arr = arr;
        this.newarr = [];
        // this.parseQueryString();
        // this.mapTrans();
        // this.delRef();
    }
    mapTrans() {
        let boxarr = this.arr.map(item => {
            return formatTime(new Date(item));
        })
        console.log(boxarr);
    }
    delRef() {
        let obj = {};
        this.arr.forEach(function(item) {
            if (!obj[item]) {
                obj[item] = item;
                this.newarr.push(obj[item])
            }
            
        },this);
        console.log(this.newarr);
    }
    parseQueryString() {
        const url = 'https://www.baidu.com/s?wd=foreach%E7%94%A8%E6%B3%95this&rsv_spt=1&rsv_iqid=0xbbf080d200056bbe&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=57095150_8_oem_dg&rsv_enter=1&oq=foreach%25E7%2594%25A8%25E6%25B3%2595&rsv_t=6cfamielOLjgOgX2%2BgyrjZx6pLUmTgHsUTiaKeNDCJMc1binhFVJd7Rla%2BJE0FnElSpm56m%2F1%2BE&inputT=1193&rsv_pq=951f4d1200029a78&rsv_sug3=59&rsv_sug1=55&rsv_sug7=100&rsv_sug2=0&rsv_sug4=3414'
        var objStr = url.substr(url.indexOf('?')+1);
        var arr = objStr.split('&');
        var obj = {};
        arr.forEach(function(item) {
            var key = item.split('=')[0],
                value = item.split('=')[1];
            obj[key] = value;
        }, this);
        console.log(obj);
    }
}
const timeArr = [1515125377960, 1515325377160, 1515825377260, 1515825377260]
new Ctrl(timeArr);

function matchStr(name,str){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = str.match(reg);
	if(r!=null)return  decodeURI(r[2]); return null;
}

function GetQueryString(name)
{
    //  var r = window.location.search.substr(1);
     var r ='wd=foreach%E7%94%A8%E6%B3%95this&rsv_spt=1&rsv_iqid=0xbbf080d200056bbe&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=57095150_8_oem_dg&rsv_enter=1&oq=foreach%25E7%2594%25A8%25E6%25B3%2595&rsv_t=6cfamielOLjgOgX2%2BgyrjZx6pLUmTgHsUTiaKeNDCJMc1binhFVJd7Rla%2BJE0FnElSpm56m%2F1%2BE&inputT=1193&rsv_pq=951f4d1200029a78&rsv_sug3=59&rsv_sug1=55&rsv_sug7=100&rsv_sug2=0&rsv_sug4=3414'
	 return matchStr(name,r);
}
console.log(GetQueryString('rsv_iqid'));
