/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
window.onload=function(){


var aqiData = {};
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

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

	var city = trim($('aqi-city-input').value);
	var value = trim($('aqi-value-input').value);
  if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
    alert("城市名称必须是中英文。");
    return;
  }
  if(!value.match(/^\d+$/)){
        alert("空气质量指数必须为整数！");
        return;
  }
  aqiData[city] = value;

}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var str = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  for(var city in aqiData){
    str += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td><tr>";
  }
	$('aqi-table').innerHTML=str;


}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
  // 事件委托
  var e = e || window.event;
  var target = e.target || e.srcElement;
  if(target.tagName.toLowerCase() == "button"){
      var city = target.parentNode.parentNode.childNodes[0].innerHTML;
      delete aqiData[city];
  }
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
   addEvent($('add-btn'),'click',addBtnHandle);


  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  addEvent($("aqi-table"),'click',delBtnHandle);
}

init();


}