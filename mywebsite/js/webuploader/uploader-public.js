

//下边所有的函数，都是需要上传的时候公用的函数。
//不同的uploader对象共用的事件绑定函数  和  这些事件绑定函数中需要调用的函数。
//发生错误时候调用的函数
var show_error=function show_error(type){
	if (type=="Q_EXCEED_NUM_LIMIT"){
		alert("此处文件数量不能大于1个");
	}else if(type=="F_EXCEED_SIZE"){
		alert("此处文件大小不能大于20M");
	}else if(type=="Q_TYPE_DENIED"){
		alert("此处文件类型必须是XXX");
	}
};
//每个文件进入队列时调用的函数
var queued=function queued( file ) {
	/*var  div = '';
	for(var i=0;i<file.length;i++){
		div +='<li><div id="'+this.full_progress_bar_id + file[i].id +'" style="position:relative;width:183px;left:10px;height:8px;display:inline-block;border:1px solid #ccc;list-style:none;margin-top:6px;"><div id="' + this.percent_bar_id + file[i].id +'" style="position:absolute;background-color:#F36861;width:0%;height:8px"></div></div></li>';		
	}*/
	var div = '<li><div id="'+this.full_progress_bar_id + file.id +'" style="position:relative;width:183px;left:10px;height:8px;display:inline-block;border:1px solid #ccc;list-style:none;margin-top:6px;"><div id="' + this.percent_bar_id + file.id +'" style="position:absolute;background-color:#F36861;width:0%;height:8px"></div></div></li>';		
	$("#"+this.bar_id).append( div);   //加入显示进度条所需的div
};
//每个文件上传过程中调用的函数
var uploading=function( file, percentage ) {
	$("#"+this.percent_bar_id + file.id ).css( 'width', percentage * 100 + '%');  	
};
//文件上传成功后调用的函数
var upload_ok=function( file ) {     //上传成功时触发uploadSuccess函数，将之前的  上传中  再替换为   已上传。
	//调用GetFileList函数，该函数下边
	GetFileList(this.type, this.task, this.bar_id, this.related_var,100, this.file_link_id);
};

//取得上传成功的文件，通过该文件制作一个用于点击下载的<a>标签，放入文件上传的地方。
function GetFileList( ty,task, divname,varname, max_len )
{
	var url = 'GetFileList.action';
    var params = {"type":ty, "task":task };
    $.ajax({
	    url:url,
	    type:"POST",
	    data:params,
	    dataType:"json",
	    success:function (data){
	    	var storeObj = document.getElementById(divname);  
	    	if( isNullObj(storeObj) ){
	    		return;
	    	}
	    	//取其中所有的子节点并删除
	    	var t=storeObj.childNodes.length;
	    	//var t=storeObj.children().length;
	    	for(var i=t-1;i>=1;i--){
	    		storeObj.removeChild(storeObj.childNodes[i]);
	    	}
	    	//遍历取得到data.list数组并输出（但是现在每次取得的是  文件总数个   单个文件  。传入123，每次取出的是111,222,333）
	        for(var i = 0 ; i <data.list.length; i ++){
	         	var li= document.createElement("li");
	         	var filename =  data.list[i].filename;
	         	var fid = data.list[i].fid;
	         	/*if( max_len != null && max_len !=undefined && max_len != 'undefined' ){
	         		
	         	}*/
	         	//上传成功后显示文件名字（若太长则显示一部分+省略号...+扩展名），可下载的链接。
	         	li.innerHTML="<a id='file_link_"+ fid
	         	+ "' href='Download.action?fileid=" + data.list[i].fid+ "' title='" + filename + "'>"+decreaseString(filename,20,true)
	         	+" </a><div id='delete_file_" + fid + "' class='changeid' style='cursor:pointer;position:relative;left:20px;margin-top:3px;margin-right:5px;width:15px;height:15px;float:right;'><span class='icon-remove' style='width:15px;height:15px;font-size:18px;color:#bdc3c7' " 
	         	+ "onmouseover=this.style.color='#e74c3c' " 
	         	+ "onmouseout=this.style.color='#bdc3c7'></span></div>";
	         	storeObj.appendChild(li);
	         	//按钮绑定函数
	         	var delete_id = "delete_file_" + fid;
	        	$("#"+delete_id).on("click", {a: fid}, clickHandler);
	        }
	        function clickHandler(event) {  
	            var a= event.data.a; 
	            removeUploadFile( a, ty, task, divname,varname, max_len);
	        }
	        if( data.list.length > 0 )
	        {
	        	var  vv = document.getElementById(varname);
	        	if( vv != null )
	        		vv.value = "has";
	        }
	    }
    });
}
//根据传入的参数type,task跟后台通信定位文件，删除成功，那么重新取得上传文件列表并且画出来
function  removeUploadFile( file_id, type, task, divname,varname, max_len){
  	var url = 'RemoveUploadFile.action';
    var params = {"type":type, "task":task, "fileid":file_id };
    $.ajax({
    url:url,
    type:"POST",
    data:params,
    dataType:"json",
    success:function(jdata){
    	if( jdata.result=="success")
    	GetFileList(type, task,divname,varname, max_len);
    }});
}

//克隆上传组件所共用的函数
//给已经复制出来的上传组件对象，绑定我们需要的属性和事件函数。要给他们增加属性，需要得到被复制的上传组件对象的   我们项目需要的这些参数。
function  dup_webuploader_data( data,copy_from_obj,order){
	var copy_obj =  data ;
	
	//这些参数后来用不到了，注释掉。
//	copy_obj.err_place_id           = copy_obj.err_place_id + order;
//	copy_obj.percent_text_id        = copy_obj.percent_text_id + order;
//	copy_obj.post_params.type       = copy_obj.post_params.type + order;
//	copy_obj.button_placeholder_id  = copy_obj.button_placeholder_id + order;	
	
	copy_obj.bar_id                 = copy_from_obj.bar_id + order;
	copy_obj.full_progress_bar_id   = copy_from_obj.full_progress_bar_id + order;
	copy_obj.percent_bar_id         = copy_from_obj.percent_bar_id + order;
	copy_obj.related_var            = copy_from_obj.related_var + order;
	copy_obj.file_link_id			= copy_from_obj.file_link_id + order;
	copy_obj.swf_panel_id           = copy_from_obj.swf_panel_id + order;
	copy_obj.del_panel_id           = copy_from_obj.del_panel_id + order;
	copy_obj.type		            = copy_from_obj.type + order;
	copy_obj.task		            = copy_from_obj.task;   //这里的task不用加order，因为所有的都是createqc
	//给新的对象绑定事件函数
	copy_obj.on("error",show_error);             //改
	copy_obj.on( 'fileQueued',queued );       //改 
	copy_obj.on( 'uploadProgress',uploading );//改
	copy_obj.on( 'uploadSuccess',upload_ok );//改 
	
	//绑定拖拽高亮
	var a = document.getElementById("clone_poinfor" + order);
	var btn_change = document.getElementById(copy_from_obj.swf_panel_id+ order);
	a.ondragover = function(event) {
		btn_change.firstChild.style.backgroundPositionY = "-15px";
	};
	a.ondragleave = function(event) {
		btn_change.firstChild.style.backgroundPositionY = "0px";
	};
	a.ondrop = function(event) {
		btn_change.firstChild.style.backgroundPositionY = "0px";
	};
	  
	//返回设置完成后的新对象
	return copy_obj;
}

//设置数组，用于存放复制出来的的webloader对象
function  initArrayAsNullFilled( a, max_index  ){
	for( var i=0; i<= max_index; i++ )
		a[i] = null;
}
//保持序号是2位。
function  id_to_dblchar_str(id){
	if( id<10)
		return '0' + id;
	else
		return ''+id;
}
