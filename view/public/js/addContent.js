$(document).ready(function(){

  var gMonthArray = new Array();
  var gIncomeDataArray = new Array();
  var gPayDataArray = new Array();
  var gProfitDataArray = new Array();

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('eCharsID'));

  var initEChar = function(){
    option = {
      title : {
        text: '收入支出情况',
        subtext: '我要攒钱'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['收入','支出', '剩余']
      },
      toolbox: {
        show : true,
        feature : {
          dataZoom: {},
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        data:[]
      }
      ],
      yAxis : [
      {
        type : 'value',
        axisLabel : {
          formatter: '{value} ￥'
        }
      }
      ],
      series : [
      {
        name:'收入',
        type:'line',
        data:[0],
        markPoint : {
          data : [
          {type : 'max', name: '最大值'},
          {type : 'min', name: '最小值'}
          ]
        },
        markLine : {
          data : [
          {type : 'average', name: '平均值'}
          ]
        }
      },
      {
        name:'支出',
        type:'line',
        data:[0],
        markPoint : {
         data : [
         {type : 'max', name: '最大值'},
         {type : 'min', name: '最小值'}
         ]
       },
       markLine : {
        data : [
        {type : 'average', name : '平均值'}
        ]
      }
    },
    {
      name:'剩余',
      type:'line',
      data:[0],
      markPoint : {
       data : [
       {type : 'max', name: '最大值'},
       {type : 'min', name: '最小值'}
       ]
     },
     markLine : {
      data : [
      {type : 'average', name : '平均值'}
      ]
    }
  }
  ]
};

myChart.setOption(option);
}

initEChar();

var updateEChar = function(){
  updateData();

  myChart.setOption({
   xAxis : [
   {
    data : gMonthArray
  }
  ],

  series : [
  {
    name:'剩余',
    data:gProfitDataArray
  },
  {
    name:'收入',
    data:gIncomeDataArray
  },
  {
    name:'支出',
    data:gPayDataArray
  }
  ]
});
}

  // 得到当前月的字符串 YYYY-mm
  var getThisMonth = function(){
    var date = new Date();
    var year = date.getFullYear(); 
    var month = date.getMonth()+1; 
    if (month < 10){
      month = "0"+month;
    }
    var day = date.getDay();
    if (day <10){
      day = "0"+day;
    }

    return year + "-" + month  + "-" + day;  
  }

  // 为所有日期控件赋上默认值为当前月份
  $("input[type='date']").val(getThisMonth());

  // 添加一行新的收入数据
  $("#inputAddBtn").click(function(){
    var payArray = $("input[name='incomeInput']");
    var count = payArray.length;
    var newIncomeInput = "\
    <div>\
    <input type='text' placeholder='固定收入"+(count+1)+"' > \
    :\
    <input type='Number' name='incomeInput'>\
    <input type='date' value='"+getThisMonth()+"''>\
    <button name='deleteBtn'>删除</button>\
    <br/>\
    </div>";
    $("#incomeFormID").append(newIncomeInput);
  });


  // 添加一行新的支出数据
  $("#payAddBtn").click(function(){
    var payArray = $("input[name='payInput']");
    var count = payArray.length;
    var newPayInput = "\
    <div>\
    <input type='text' placeholder='固定支出"+(count+1)+"'>\
    : \
    <input type='Number' name='payInput'>\
    <input type='date' value='"+getThisMonth()+"''>\
    <button name='deleteBtn'>删除</button>\
    <br/>\
    </div>";
    $("#payFormID").append(newPayInput);
  });


  $("#incomeFormID").delegate("button[name='deleteBtn']", "click", function(){
    $(this).parent().remove();
    incomeSumFunction();
  });

  $("#payFormID").delegate("button[name='deleteBtn']", "click", function(){
    $(this).parent().remove();
    paySumFunction();
  });

  var updateData = function(){
    var incomeMonthArray = new Array();
    var incomeDataArray = new Array();
    var payMonthArray = new Array();
    var payDataArray = new Array();

    $("#incomeFormID").find("input[type='date']").each(function(){
      incomeMonthArray.push($(this).val().substring(0,7));
    });

    $("#incomeFormID").find("input[name='incomeInput']").each(function(){
      incomeDataArray.push($(this).val());
    });

    $("#payFormID").find("input[type='date']").each(function(){
      payMonthArray.push($(this).val().substring(0,7));
    });

    $("#payFormID").find("input[name='payInput']").each(function(){
      payDataArray.push($(this).val());
    });

    var incomeArray = new Array();
    for (var i = 0; i < incomeMonthArray.length; i++) {
      var tempArray = new Array();
      tempArray[0] = incomeMonthArray[i];
      tempArray[1] = incomeDataArray[i];
      incomeArray.push(tempArray);
    }

    var items = {};
    $.each(incomeArray, function(index, val) {
      var key = val[0];
      if (!items[key]) {
        items[key] = [0,0];
      }
      items[key][0] += Number(val[1]);
    });

    var payArray = new Array();
    for (var i = 0; i < payMonthArray.length; i++) {
      var tempArray = new Array();
      tempArray[0] = payMonthArray[i];
      tempArray[1] = payDataArray[i];
      payArray.push(tempArray);
    }

    $.each(payArray, function(index, val) {
      key = val[0];
      if (!items[key]) {
        items[key] = [0,0];
      }
      items[key][1] += Number(val[1]);
    });

    gMonthArray = [];
    gIncomeDataArray = [];
    gPayDataArray = [];
    gProfitDataArray = [];

    var tempArray2 = [];
    $.each(items, function(key, val) {
      tempArray2.push(key);
    });
    tempArray2 = tempArray2.sort();

    $.each(tempArray2, function(index, value) {
      gMonthArray.push(value);
      gIncomeDataArray.push(items[value][0]);
      gPayDataArray.push(items[value][1]);
      gProfitDataArray.push(items[value][0] - items[value][1]);
    });
  }

  var incomeSumFunction = function(){
    var sum = 0;
    var incomeArray = $("input[name='incomeInput']");

    incomeArray.each(function(i){
      sum += Number($(this).val());
    });

    // 更新收入总和
    $("#inputIntotalID").text(sum);

    var incomInTotal = sum;
    var payInTotal = Number($("#payIntotalID").text());

    // 更新剩余总和
    $("#leftIntotalID").text(incomInTotal - payInTotal);

    updateEChar();
  }


  var paySumFunction = function(){
    var sum = 0;
    var payArray = $("input[name='payInput']");

    payArray.each(function(i){
      sum += Number($(this).val());
    });

    // 更新支出总和
    $("#payIntotalID").text(sum);

    // 更新剩余总和
    var incomInTotal = Number($("#inputIntotalID").text());
    var payInTotal = sum;
    $("#leftIntotalID").text(incomInTotal - payInTotal);
    updateEChar();
  }


  // 收入数值发生改变事件
  $("#incomeFormID").delegate("input[name='incomeInput']", "input propertychange", incomeSumFunction);

  // 支出数值发生改变事件
  $("#payFormID").delegate("input[name='payInput']", "input propertychange", paySumFunction);  

  // 收入数值发生改变事件
  $("#incomeFormID").delegate("input[type='date']", "input propertychange ", incomeSumFunction);

  // 支出数值发生改变事件
  $("#payFormID").delegate("input[type='date']", "input propertychange", paySumFunction);

  $.ajax( {  
        url : 'http://101.200.157.44:3000/incomes/naonao',  
        type : 'GET', 
        dataType:'JSON', 
         success: function(data){ 
                console.log(data);
                 $.each(data, function(index, val) {
                    var desc = val['desc'];
                    var income = val['income'];
                    var date = val['date'];
                    $("input[name='incomeDesc'][id="+index+"]").val(desc);
                    $("input[name='incomeInput'][id="+index+"]").val(income);
                    $("input[name='incomeDate'][id="+index+"]").val(date.substring(0,10));
                  });
                  incomeSumFunction();
                  paySumFunction();
            } 
    });

    $.ajax( {  
        url : 'http://101.200.157.44:3000/pays/naonao',  
        type : 'GET', 
        dataType:'JSON', 
         success: function(data){ 
                console.log(data);
                 $.each(data, function(index, val) {
                    var desc = val['desc'];
                    var pay = val['pay'];
                    var date = val['date'];
                    $("input[name='payDesc'][id="+index+"]").val(desc);
                    $("input[name='payInput'][id="+index+"]").val(pay);
                    $("input[name='payDate'][id="+index+"]").val(date.substring(0,10));
                  });
                  incomeSumFunction();
                  paySumFunction();
            } 
    });
});