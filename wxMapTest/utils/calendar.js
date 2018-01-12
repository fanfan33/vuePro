/*
 * Calendar
 * Language 0: Chinese, 1: English
 * 1.Put calendar into the element html use 'show()'
 * 2.Pop-up calendar use 'pop()'
 */

var Calendar = function (instanceId, language, startYear, endYear) {
  if (typeof instanceId == "string") {
    this.Date = new Date();
    this.Year = this.Date.getFullYear();
    this.Month = this.Date.getMonth();
    this.Week = this.Date.getDay();
    this.Today = this.Date.getDate();

    this.InstanceId = instanceId;
    this.Language = language || 0;
    this.StartYear = startYear || this.Year - 1;
    this.EndYear = endYear || this.Year + 1;

    // If instance is input[type='text'] object
    this.popContainer_id = 'popCalendarContainer';

    // Message store
    this.msgStore = [];

    this.caleContainer_id = 'calendarContainer';
    this.caleTop = {
      today_view_id: 'calendarTodayView',
      week_view_id: 'calendarWeekView',
      lq_year_id: 'linkQuickYear',
      lq_month_id: 'linkQuickMonth',
      sq_year_id: 'selectQuickYear',
      sq_month_id: 'selectQuickMonth',
      close_id: 'calendarClose',
      prev_month_id: 'toPrevMonth',
      back_today_id: 'backToday',
      next_month_id: 'toNextMonth'
    }
    this.daysContainer_id = 'calendarDaysContainer';
    this.msgContainer_id = 'calendarTipsContainer';

    this.curDayClass = 'calendarCurrentDay';
    this.tipDayClass = 'calendarTipDay';
    this.oldTipDayClass = 'calendarOldTipDay';

    this.normal = "normal";
    this.checked = "checked";
    this.gift = "gift";

    //接收所有的span标签
    this.spanbtn = [];
    this.spanindex = 0;
    //签到的日期和礼物
    this.currentDate = [];
    this.giftDate = new Date();

    //显示签到连续日
    // this._countNum = document.getElementById("countNum");

    //记录当前月份的总天数
    this.daysCount = 0;

    //翻页后的

    //记录的是今天的
    this.currentDay = new Date();

    //记录显示的年月
    this.currentViewYearMonth = {};
  }
};
/* Calendar language */
Calendar.lang = {
  weeks: [
    ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  ],
  weeksMenu: [
    ["日", "一", "二", "三", "四", "五", "六"],
    ["SUN", "MON", "TUR", "WED", "THU", "FRI", "SAT"]
  ]
};
/* Create calendar element */
Calendar.prototype._getViewElement = function () {
  // Create page html element
  var caleElem = "";
  // Create Start
  caleElem += '<div id=' + this.caleContainer_id + '>';

  // <Top>
  caleElem += '<div id="calendarTopContainer"><table cellpadding="0" cellspacing="0"><tr>';

  // Top day view
  caleElem += '<td id=' + this.caleTop.today_view_id + '></td>';

  // Link or select control
  caleElem += '<td>';
  caleElem += '<div id=' + this.caleTop.week_view_id + '></div>';
  caleElem += '<table id="calendarYearMonthContainer" cellpadding="0" cellspacing="0">';
  caleElem += '<tr>';
  caleElem += '<td>';
  caleElem += '<a id=' + this.caleTop.lq_year_id + ' href="javascript:void(0);"></a>';
  caleElem += '<select id=' + this.caleTop.sq_year_id + '></select>';
  caleElem += '</td>';
  caleElem += '<td> - </td>';
  caleElem += '<td>';
  caleElem += '<a id=' + this.caleTop.lq_month_id + ' href="javascript:void(0);"></a>';
  caleElem += '<select id=' + this.caleTop.sq_month_id + '></select>';
  caleElem += '</td>';
  caleElem += '</tr>';
  caleElem += '</table>';
  caleElem += '</td>';

  // Quick control
  caleElem += '<td>';
  caleElem += '<div id="calendarCloseContainer">';
  //		caleElem+= '<a id='+this.caleTop.close_id+' href="javascript:void(0);">x</a>';
  caleElem += '</div>';

  caleElem += '<div id="calendarQuickContainer">';
  caleElem += '<a id=' + this.caleTop.prev_month_id + ' href="javascript:void(0);">&laquo;</a>';
  caleElem += '<a id=' + this.caleTop.back_today_id + ' href="javascript:void(0);">&nbsp;</a>';
  caleElem += '<a id=' + this.caleTop.next_month_id + ' href="javascript:void(0);">&raquo;</a>';
  caleElem += '</div>';
  caleElem += '</td>';

  caleElem += '</tr></table cellpadding="0" cellspacing="0"></div>';
  // </Top>

  // <Calendar View>
  caleElem += '<div id="calendarMainContainer">';
  // Week menu
  caleElem += '<div id="calendarWeeksContainer">';
  for (var i = 0; i < 7; i++) {
    caleElem += '<span>' + Calendar.lang["weeksMenu"][this.Language][i] + '</span>';
  }
  caleElem += '</div>';

  // Days view
  caleElem += '<table id=' + this.daysContainer_id + ' cellpadding="0" cellspacing="0">';
  for (var tr = 0; tr < 6; tr++) {
    caleElem += '<tr>';
    for (var td = 0; td < 7; td++) {
      //		caleElem+= '<td><p class="able"></p><span></span></td>';
      caleElem += '<td><span></span></td>';
    }
    caleElem += '</tr>';
  }
  caleElem += '</table>';

  caleElem += '</div>';
  // </Calendar View>

  caleElem += '</div>';

  // <Calendar msg>
  //		caleElem+= '<div id='+this.msgContainer_id+'></div>';
  // </Calendar msg>

  // Create End
  return caleElem;
};
/* Get Month Data */
//显示当前月份所有的日期,并按正确的日期，周几
Calendar.prototype._getMonthViewArray = function (year, month) {
  var monthArray = [];
  // From the beginning day of the week
  var beginDayOfWeek = new Date(year, month, 1).getDay();
  console.log(beginDayOfWeek);
  // This month total days
  var daysOfMonth = new Date(year, month + 1, 0).getDate();
  this.daysCount = daysOfMonth;
  //
  // 42: 7*6 matrix 
  for (var i = 0; i < 42; i++) {
    monthArray[i] = {};
    monthArray[i]["date"] = "&nbsp;";

    for (var j = 0; j < daysOfMonth; j++) {
      monthArray[j + beginDayOfWeek] = {};
      monthArray[j + beginDayOfWeek]["date"] = j + 1;
    }
  }
  return monthArray;
};
/* Search the index of option in the select */
Calendar.prototype._getOptionIndex = function (selectObject, value) {
  for (var j = 0; j < selectObject.options.length; j++) {
    if (value == selectObject.options[j].value)
      return j;
  }
};
/* Bind year data into 'Year select' */
Calendar.prototype._bindYearIntoSelect = function () {
  var oYear = this.find(this.caleTop.sq_year_id);
  var oYearLen = 0;
  for (var i = this.StartYear; i <= this.EndYear; i++ , oYearLen++)
    oYear.options[oYearLen] = new Option(i, i);
};
/* Bind Month data into 'Month select' */
Calendar.prototype._bindMonthIntoSelect = function () {
  var oMonth = this.find(this.caleTop.sq_month_id);
  var oMonthLen = 0;
  for (var i = 0; i < 12; i++ , oMonthLen++)
    oMonth.options[oMonthLen] = new Option(i + 1, i + 1);
};
/* Bind data  _bindAllData() */
Calendar.prototype._bindAllData = function (curYear, curMonth) {
  this.currentViewYearMonth["year"] = curYear;
  this.currentViewYearMonth["month"] = curMonth;

  var cr = this;
  // Bind default Data into 'select:Year' 
  this._bindYearIntoSelect();

  // Bind default Data into 'select:Month'
  this._bindMonthIntoSelect();

  // Change the 'select:Year' and 'select:Month' value 
  this.changeSelectValue(curYear, curMonth);

  // Bind default data into 'current day view and current week view'
  this.find(this.caleTop.week_view_id).innerHTML = Calendar.lang['weeks'][this.Language][this.Week];
  this.find(this.caleTop.today_view_id).innerHTML = this.Today;

  // Get days and bind into 'CalendarMain'
  // Add current day class and mouse event
  var daysOfMonthArray = this._getMonthViewArray(curYear, curMonth);

  // 	console.log("---------curYear="+curYear+"---curMonth="+curMonth+"---"+"---this.giftDate.getMonth()="+this.giftDate.getMonth()+"--day="+this.giftDate.getDate()+"--year="+this.giftDate.getFullYear());
  var spans = this.find(this.daysContainer_id, "span");
  this.spanbtn = spans;
  var curYMD = this.Year + "" + (this.Month + 1) + "" + this.Today;
  var selectYear = this.find(this.caleTop.sq_year_id).value;
  var selectMonth = this.find(this.caleTop.sq_month_id).value;
  //添加签到，礼物样式
  for (var i = 0; i < spans.length; i++) {
    spans[i].innerHTML = daysOfMonthArray[i]["date"];
    var selectYMD = selectYear + "" + selectMonth + "" + spans[i].innerHTML;
    if (curYMD == selectYMD) {		//当天,数字变红，选中
      this.spanindex = i;
      spans[i].className = this.curDayClass + " " + this.normal;
    } else if (spans[i].innerHTML != "&nbsp;") {
      spans[i].className = this.normal;		//普通样式
    } else {
      spans[i].className = "";					//不属于当月的日期，为空
    }
    //给签到过的日期添加样式
    if (this.currentDate.length >= 1) {
      for (var j = 0; j < this.currentDate.length; j++) {
        var _signCurrent = this.currentDate[j];
        if (curYear == (_signCurrent.getFullYear()) && curMonth == (_signCurrent.getMonth()) && spans[i].innerHTML == (_signCurrent.getDate())) {
          console.log("---" + curMonth + "-----" + _signCurrent.getMonth());
          console.log("签到日");
          spans[i].className = this.checked + " " + this.curDayClass;
          //					spans[i].previousSibling.style.backgroundColor="#666666";
          //					console.log("length="+this.currentDate.length+"   "+_signCurrent);
          //当前与签到日期进行比较
          if (this.Year == (_signCurrent.getFullYear()) && (this.Month) == (_signCurrent.getMonth()) && (this.Today) == (_signCurrent.getDate())) {
            console.log("重合了");
            spans[i]["type"] = 0;
          }
        }
      }
      //console.log("---spans[i].innerHTML="+spans[i].innerHTML)
      if (curYear == this.giftDate.getFullYear() && curMonth == this.giftDate.getMonth() && spans[i].innerHTML == this.giftDate.getDate()) {
        console.log("礼物日");
        spans[i].className = this.gift;
      }
    }
  }
  //隐藏空白处横线样式
  //	var ablebtn=document.getElementsByClassName("able");
  //	for (var i=0;i<ablebtn.length;i++) {
  //		var _ablebtn=ablebtn[i];
  //		if(_ablebtn.nextSibling.innerHTML=="&nbsp;"){
  //			_ablebtn.style.display="none";
  //		}else{
  //			_ablebtn.style.display="block";
  //		}
  //	}
  // If not some days has pop message
  if (this.msgStore != "")
    this._initPopMsg(this.msgStore);
}
/* Bind event */
Calendar.prototype._bindAllEvent = function () {
  var cr = this;
  // 'toPrevMonth, toNextMonth, backToday, today view' event
  this.find(this.caleTop.prev_month_id).onclick = function () { cr.goPrevOrNextMonth(this); };
  this.find(this.caleTop.next_month_id).onclick = function () { cr.goPrevOrNextMonth(this); };
  this.find(this.caleTop.back_today_id).onclick = function () { cr.backToday(); };
  this.find(this.caleTop.today_view_id).onclick = function () { cr.backToday(); };

  // 'year and month select' onchange event
  this.find(this.caleTop.sq_year_id).onchange = function () { cr.updateSelect(); };
  this.find(this.caleTop.sq_month_id).onchange = function () { cr.updateSelect(); };

  // Quick link event
  this.find(this.caleTop.lq_year_id).onclick = function () {
    cr.showHide(cr.caleTop.lq_year_id, "none");
    cr.showHide(cr.caleTop.sq_year_id, "block");
  };
  this.find(this.caleTop.lq_month_id).onclick = function () {
    cr.showHide(cr.caleTop.lq_month_id, "none");
    cr.showHide(cr.caleTop.sq_month_id, "block");
  };

  // Remove the link dotted line
  var oLink = this.find(this.caleContainer_id, "a")
  for (var i = 0; i < oLink.length; i++) {
    oLink[i].onfocus = function () { this.blur(); }
  }
}
/* Bind calendar for calendar view */
Calendar.prototype._initCalendar = function () {
  this._bindAllEvent();
  this._bindAllData(this.Year, this.Month);
};
/* Change the quick select value */
Calendar.prototype.changeSelectValue = function (year, month) {
  var ymArray = [], selectArray = [], linkArray = [];
  // Store the 'year' and 'month' to Array
  ymArray[0] = year; ymArray[1] = month + 1;

  // Store the 'selectYear_id' and 'selectMonth_id' to Array
  selectArray[0] = this.caleTop.sq_year_id; selectArray[1] = this.caleTop.sq_month_id;

  linkArray[0] = this.caleTop.lq_year_id; linkArray[1] = this.caleTop.lq_month_id;

  for (var i = 0; i < selectArray.length; i++) {
    var selectObject = this.find(selectArray[i]);
    // Get the return index
    var index = this._getOptionIndex(selectObject, ymArray[i]);
    // Reset the 'year', 'month' select and link value
    selectObject.options[index].selected = "selected";

    this.find(linkArray[i]).innerHTML = selectObject.value;
  }

  this.resetLinkSelect();
};
/* Search next or previons month */
Calendar.prototype.goPrevOrNextMonth = function (obj) {
  var curMonthSelect = this.find(this.caleTop.sq_month_id);
  var curMonth = parseInt(curMonthSelect.value);
  var curYear = this.find(this.caleTop.sq_year_id).value;
  // If 'next' get current month select + 1
  // If 'prev' get current month select - 1
  if (obj.id == this.caleTop.next_month_id)
    curMonthSelect.value = curMonth + 1;
  else
    curMonthSelect.value = curMonth - 1;

  var getNowMonth = curMonthSelect.value - 1;
  if (getNowMonth == -1 && curMonth == 1) getNowMonth = 0;
  if (getNowMonth == -1 && curMonth == 12) getNowMonth = 11;

  this._bindAllData(curYear, getNowMonth);
};
/* If 'select:Year' and 'select:Month' change value update data  */
Calendar.prototype.updateSelect = function () {
  var yearSelectValue = this.find(this.caleTop.sq_year_id).value;
  var monthSelectValue = this.find(this.caleTop.sq_month_id).value;
  // Re-bind Panel Data
  this._bindAllData(yearSelectValue, monthSelectValue - 1);

};
/* Back to taday: re-load '_bindAllData()' */
//Calendar.prototype.backToday = function(){
//	this._bindAllData( this.Year, this.Month );
//};
/* Find the instance object or children of instance object by Id */
Calendar.prototype.find = function (elemId, childTag) {
  if (!childTag)
    // Return: object
    return document.getElementById(elemId);
  else
    // Return: object array
    return this.find(elemId).getElementsByTagName(childTag);
};
/* Set element css */
Calendar.prototype.css = function (oId, selector) {
  var o = this.find(oId);
  selector['left'] ? o.style.left = selector['left'] : "";
  selector['top'] ? o.style.top = selector['top'] : "";
  selector['position'] ? o.style.position = selector['position'] : "";
}
/* Check calendar show or hidden */
Calendar.prototype.showHide = function (objectId, dis) {
  return this.find(objectId).style.display = dis;
};
/* Init the top quick menu link and select */
Calendar.prototype.resetLinkSelect = function () {
  this.showHide(this.caleTop.sq_year_id, "none");
  this.showHide(this.caleTop.sq_month_id, "none");
  this.showHide(this.caleTop.lq_year_id, "block");
  this.showHide(this.caleTop.lq_month_id, "block");
};
/* Put this calendar into the html of instance */
//入口方法
Calendar.prototype.show = function () {
  console.log("111111111111111111111111");
  var obj = this.find(this.InstanceId);
  if (obj) {
    obj.innerHTML = this._getViewElement();
    //获取缓存
    var sign = window.localStorage.getItem("sign");
    if (sign) {
      var value = JSON.parse(sign);
      var _arr = value.signDate.split("-");
      var lastSignY = _arr[0];
      var lastSignM = _arr[1];
      var lastSignD = _arr[2];

      var signNum = value["signNum"];
      var _giftDate;
      //对日期进行遍历
      for (var i = 0; i < signNum; i++) {
        //签到日期
        var _signDate = new Date(lastSignY, lastSignM - 1, lastSignD - i);
        this.currentDate.push(_signDate);
        //				console.log(this.currentDate);
        //连续签到的第一天
        if (i == signNum - 1) {
          //礼物日期
          _giftDate = new Date(_signDate.getFullYear(), _signDate.getMonth(), _signDate.getDate());
        }
      }
      //礼物日期
      _giftDate.setDate(_giftDate.getDate() + 7);
      this.giftDate = _giftDate;
    }

    // Init calendar event and data
    this._initCalendar();
    //刷新时也显示连续签到的日子
    if (!signNum) {
      this._countNum.innerHTML = 0;
    } else {
      this._countNum.innerHTML = signNum;
    }
    // This function don't have 'close'
		/*this.showHide( this.caleTop.close_id, "none" );
		if( typeof msgData == 'object'){
			this.msgStore = msgData;
			this._initPopMsg( this.msgStore );
		}*/
  }
};
/* Init pop message */
/*Calendar.prototype._initPopMsg = function(){
	var cr = this;
	var selectYear  = this.find( this.caleTop.sq_year_id ).value;
	var selectMonth = this.find( this.caleTop.sq_month_id ).value;
//	var daysOfMonthArray = this._getMonthViewArray( selectYear, selectMonth );
	var spans = this.find( this.daysContainer_id, "span" );
	for( var key in this.msgStore ){
		var keyMD = key.substring( 4 );
		var keyY  = key.substring( 0, 4 );
		for( var i = 0; i < spans.length; i ++){
			var getMD = selectMonth + "" + spans[i].innerHTML;
			if( getMD == keyMD ){
				if( selectYear == keyY )
					spans[i].className = this.tipDayClass +" "+ keyY;
				else
					spans[i].className = this.oldTipDayClass +" "+ keyY;	
				spans[i].onmouseover = function(){
					var hoverDate = this.className.split(" ")[1] + "" + selectMonth + "" + this.innerHTML;
					var y = this.className.split(" ")[1],
						m = selectMonth,
						d = this.innerHTML;
					cr.find( cr.msgContainer_id ).innerHTML = cr._getMsgHtml( y, m, d );
					cr.showHide( cr.msgContainer_id, "block" );
				}
			}
		}
	}
	cr.find( cr.caleContainer_id ).onmouseout = function(){
		cr.showHide( cr.msgContainer_id, "none" );
	}
};
*/
/* Get message */
/*Calendar.prototype._getMsgHtml =function( y, m, d ){
	var date = y + m + d;
	var showDate = y + "-" + m + "-" + d;
	var msgHtml = '<div>'+showDate+':</div><div>'+ this.msgStore[date] +'</div>';
	return msgHtml;
}*/
/* Pop-up the calendar */
/*Calendar.prototype.pop = function(){
	var cr = this;
	var obj	= this.find( this.InstanceId );
	if( obj ){
		// Instance object click then pop-up the calendar
		obj.onclick = function( e ){
			var e = window.event || e;
			var x  = e.x || e.pageX,
				y  = e.y || e.pageY;
			if( !cr.find( cr.popContainer_id ) ){
				// Create the pop-up div
				var oDiv = document.createElement("div");
				oDiv.id  = cr.popContainer_id;
				document.body.appendChild( oDiv );
			}else{
				cr.showHide( cr.popContainer_id, "block" );
			}
			cr.find( cr.popContainer_id ).innerHTML = cr._getViewElement();
			
			// Init calendar event and data
			cr._initCalendar();
			
			// Set days click event
			cr.popDaysClickEvent( obj );
			
			// Set position
			cr.css( cr.popContainer_id, {position: "absolute", left: x + "px", top: y + "px"});
			
			// Close panel event
			cr.find( cr.caleTop.close_id ).onclick = function(){ cr.showHide( cr.popContainer_id, "none" ); };
		};
	}
};*/
/* Click the pop calendar days event [For INPUT] */
Calendar.prototype.popDaysClickEvent = function (obj) {
  var cr = this;
  var spans = cr.find(cr.daysContainer_id, "span");
  for (var i = 0; i < spans.length; i++)
    spans[i].onclick = function () {
      if (this.innerHTML != "&nbsp;") {
        var getYear = cr.find(cr.caleTop.sq_year_id).value;
        var getMonth = cr.find(cr.caleTop.sq_month_id).value;
        obj.value = getYear + "-" + getMonth + "-" + this.innerHTML;
        cr.showHide(cr.popContainer_id, "none");
      }
    }
};
// Calendar.prototype.clickbtn = function () {
//   var currentSpan = this.spanbtn[this.spanindex];
//   var giftindex = this.spanindex + 7;
//   var giftSpan = this.spanbtn[giftindex];
//   //	console.log("this.currentDay.getMonth()="+this.currentDay.getMonth()+"---this.month="+this.Month)


//   //	console.log("----this.spanindex="+this.spanindex+"----this.spanbtn="+this.spanbtn.length);
//   if (currentSpan["type"] == 0) {
//     alert("今日已签到过了！");
//     return;
//   } else {
//     currentSpan["type"] = 0;
//     //存储日期
//     var curYMD = this.currentDay.getFullYear() + "-" + (this.currentDay.getMonth() + 1) + "-" + (this.currentDay.getDate());
//     var obj = {
//       signDate: curYMD,
//       signNum: 1
//     }
//     var sign = window.localStorage.getItem("sign");
//     if (!sign) {
//       if (this.currentDay.getMonth() == this.currentViewYearMonth["month"]) {

//         currentSpan.className = this.checked;
//         //				currentSpan.previousSibling.style.backgroundColor="#666666";
//         if ((this.Today + 7) <= this.daysCount) {
//           if (this.currentDay.getMonth() == this.currentViewYearMonth["month"])
//             giftSpan.className = this.gift;
//         }
//       }
//       window.localStorage.setItem("sign", JSON.stringify(obj));
//     } else {
//       //判断是否连续
//       var _sign = JSON.parse(sign);
//       var _obj = {
//         signDate: _sign["signDate"],
//         signNum: _sign["signNum"]
//       }
//       //			var box=Number(_obj.signDate.split("-")[2]);
//       var _box = new Date(_obj.signDate);
//       var _tom = new Date(_obj.signDate);
//       _tom.setDate(_tom.getDate() + 1);
//       if (this.Today == (_tom.getDate())) {
//         console.log("连续签到");
//         if (this.currentDay.getMonth() == this.currentViewYearMonth["month"]) {
//           currentSpan.className = this.checked;
//           //					currentSpan.previousSibling.style.backgroundColor="#666666";
//         }
//         _obj.signDate = curYMD;
//         _obj.signNum++;
//         window.localStorage.setItem("sign", JSON.stringify(_obj));
//         if ((this.Today + 7) <= this.daysCount) {
//           giftSpan.className = this.normal;
//           console.log("33333333333");
//         } else {
//           giftSpan.className = "";
//           console.log("4444444444");
//         }
//       } else {
//         console.log("不连续签到");
//         var beginDayOfWeek = new Date(this.Year, this.Month, 1).getDay();
//         //				//改变上一次送礼图标的样式
//         var lastGiftIndex = 0;

//         if ((_box.getMonth()) != (this.Month)) {
//           _box.setDate(_box.getDate() + 7);
//           lastGiftIndex = beginDayOfWeek + _box.getDate() - 1;
//         } else {
//           lastGiftIndex = giftindex;
//         }
//         if (lastGiftIndex + 7 < this.daysCount) {
//           this.spanbtn[lastGiftIndex].className = this.normal;
//           console.log("11111111111111111");
//         } else {
//           this.spanbtn[lastGiftIndex].className = "";
//           console.log("2222222222222222");
//         }

//         //给当前日期，礼物日添加样式
//         if (this.currentDay.getMonth() == this.currentViewYearMonth["month"]) {

//           currentSpan.className = this.checked;
//           //					currentSpan.previousSibling.style.backgroundColor="#666666";
//           if ((this.Today + 7) <= this.daysCount) {
//             if (this.currentDay.getMonth() == this.currentViewYearMonth["month"])
//               giftSpan.className = this.gift;
//             console.log("555555555555");
//           }
//           window.localStorage.setItem("sign", JSON.stringify(obj));
//         }

//       }
//     }
//   }

//   //显示连续签到多少日
//   var _sign = window.localStorage.getItem("sign");
//   var _signNum = JSON.parse(_sign)["signNum"];
//   console.log("签到天数:" + _signNum);
//   this._countNum.innerHTML = _signNum;
//   //	//签到日期

//   var _signDate = new Date(curYMD);
//   this.currentDate.push(_signDate);
// }




// define("calendar", ["require", "exports", "Calendar"], function (require, exports, Calendar) {
//   exports.show = function () {
//     return beta.show();
//   }
// });




module.exports = {
  Calendar:Calendar
}