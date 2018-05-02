// 事件绑定
function addEvent(elem,type,handle){
  if(elem.addEventListener){
    elem.addEventListener(type,handle,false);
  }else if(elem.attachEvent){
    elem.attachEvent("on"+type,function(){
      handle.call(this);
    });
  }else{
    elem["on"+type]=handle;
  }
}
// 封装$函数,用于通过id来获取元素
function $(id){
  return document.getElementById(id);
}
// 封装trim()，删除左右两端的空格
function trim(str){ 
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递，后面用
function each(arr, fn) {
    for (var i = 0,len=arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}

window.onload = function() {
    var container = $("container");
    var buttonList = document.getElementsByTagName("button");
    //定义队列的对象
    var queue = {
        str: [],
        
        leftPush: function(num) {
            this.str.unshift(num);
            this.paint();
        },
        
        rightPush: function(num) {
            this.str.push(num);
            this.paint();
        },
        
        isEmpty: function() {
            return (this.str.length == 0);
        },
        
        leftPop: function() {
            if (!this.isEmpty()) {
                alert(this.str.shift());
                this.paint();
            }else {
                alert("队列已经为空!");
            }
        },
        
        rightPop: function() {
            if (!this.isEmpty()) {
                alert(this.str.pop());
                this.paint();
            }else {
                alert("队列已经为空!");
            }
        },
        // 绘制渲染
        paint: function() {
            var str = "";
            each(this.str, function(item){
              str += "<div>" + parseInt(item) + "</div>";
            });
            container.innerHTML = str;
            addDivDelEvent();
        },
        
        deleteID: function(id) {
            console.log(id);
            this.str.splice(id, 1);
            this.paint();
        }
        
    }
    
    //为container中的每个div绑定删除函数
    function addDivDelEvent() {
        for (var i = 0; i < container.childNodes.length; i++) {
            
            //这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的i值(length);
            addEvent(container.childNodes[i], "click", function(i) {
                return function(){
                  return queue.deleteID(i);
                };
            }(i));
        }
    }

    //为4个按钮绑定函数
    addEvent(buttonList[0], "click", function() {
        var input = trim($("num-input").value);
        if ((/^[0-9]+$/).test(input)) {
            queue.leftPush(input);
        }else {
            alert("请输入正整数!");
        }
    });
    addEvent(buttonList[1], "click", function() {
        var input = trim($("num-input").value);
        if ((/^[0-9]+$/).test(input)) {
            queue.rightPush(input);
        }else {
            alert("请输入正整数!");
        }
    });
    addEvent(buttonList[2], "click", function(){queue.leftPop()});
    addEvent(buttonList[3], "click", function(){queue.rightPop()});
}
