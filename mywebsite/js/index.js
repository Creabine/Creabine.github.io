layout: false 
---
var move_count = 1;
$(document).ready(function(){

	//clock
	var move = setInterval(update,1000);
	//stop rounded
	setTimeout(function(){
		$(".rounded").on('mouseover', function(event) {
			clearInterval(move);
			setInterval(update_time_only,1000);
		});
	},8000);

	

	

}); 
function update(){
	
	update_time_only();
	
	second_move(350,350,350,"myself",-90,40,50);
	second_move(350,350,350,"music",90,40,50);
	second_move(350,350,350,"game",-30,40,50);
	second_move(350,350,350,"ACG",30,40,50);
	second_move(350,350,350,"movie",150,40,50);
	second_move(350,350,350,"Japanese",210,40,50);
	move_count++;
}
function update_time_only(){
	var myDate = new Date();
	myDate.myyear = myDate.getFullYear();
	myDate.mymonth = myDate.getMonth();
	myDate.myday = myDate.getDate();
	myDate.week = myDate.getDay();
	myDate.myhouur = myDate.getHours()
	myDate.myminute = myDate.getMinutes();
	myDate.mysecond = myDate.getSeconds();
	//var mymonth = ["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
	var myweek = ["Mon.","Tue.","Wed.","Thu.","Fri.","Sat.","Sun."];
	//var myweek = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
	//更新显示时间
	$("#year").text(myDate.myyear);
	$("#month").text(keep_2(myDate.mymonth));
	$("#day").text(keep_2(myDate.myday));
	$("#week").text(myweek[myDate.week]);
	$("#hour").text(keep_2(myDate.myhouur));
	$("#minute").text(keep_2(myDate.myminute));
	$("#second").text(keep_2(myDate.mysecond));
}
//参数分别为：恒星坐标，环绕半径，卫星id，卫星初始角度，卫星半径，移动间隔。
function second_move(X,Y,R,id,deg,r1){ 
	var r = R; // 半径
	var x = X; // 园的中心点 x 坐标   中心点就是.dashboard的中心
	var y = Y; // 园的中心点 y 坐标
	
	deg = deg + 6 * move_count;
	
	//Math.sin( deg*Math.PI/180 ) = a/r;
	//Math.cos( deg*Math.PI/180 ) = b/r;
	// 算出圆周上每一个 A 的 x,y 轴
	var a = Math.sin( deg*Math.PI/180 ) * r;
	var b = Math.cos( deg*Math.PI/180 ) * r;
	
	//算出 圆周上每一个 A 的坐标。这里的40是因为div定位原点是左上角，这里要变成中点。
	//长宽都是80，所以中点就是各自减去40
	$('#' + id).css('left', x + b -r1 + 'px');
	$('#' + id).css('top', y + a -r1 + 'px');
}
//保证时间日期显示两位数字
function keep_2(num){
	if(num<10){
		num = "0" + num;
	}
	return num;
}