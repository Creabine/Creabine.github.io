/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var fake_data = {
		   result:"success",
		   qcorderid:1111,
		   taskid:9999,
		   po:[
		      {
		         id:"888222",
		         ponum:"151354",
		         colors:[
		            {
		                name:"color1", //平台使用的数据，不可改动
		                color:"red",
		                quantity:"1200",
		                size_list:[
		                   {
		                      size:"L",
		                      quantity:"100"
		                   },
		                   {
		                      size:"M",
		                      quantity:"300"
		                   },
		                   {
		                      size:"X",
		                      quantity:"400"
		                   },{
		                      size:"XL",
		                      quantity:"200"
		                   }
		                ] 
		             },
		            {
		                name:"color2", //平台使用的数据，不可改动
		                color:"blue",
		                quantity:"1100",
		                size_list:[
		                   {
		                      size:"L",
		                      quantity:"300"
		                   },
		                   {
		                      size:"M",
		                      quantity:"200"
		                   },
		                   {
		                      size:"X",
		                      quantity:"100"
		                   },
		                ]
		             }
		         ]
		       },

		      {
		         id:"888333",
		         ponum:"151362",
		         colors:[
		            {
		                name:"color1", //平台使用的数据，不可改动
		                color:"ready",
		                quantity:"1000",
		                size_list:[
		                   {
		                      size:"L",
		                      quantity:"100"
		                   },
		                   {
		                      size:"M",
		                      quantity:"100"
		                   },
		                   {
		                      size:"X",
		                      quantity:"100"
		                   },
		                ] 
		             },
		            {
		                name:"color2", //平台使用的数据，不可改动
		                color:"bluebird",
		                quantity:"1100",
		                size_list:[
		                   {
		                      size:"L",
		                      quantity:"200"
		                   },
		                   {
		                      size:"M",
		                      quantity:"400"
		                   },
		                   {
		                      size:"X",
		                      quantity:"300"
		                   },{
		                      size:"XL",
		                      quantity:"400"
		                   }
		                ] 

		             },
		            {
		                name:"color3", //平台使用的数据，不可改动
		                color:"greenhat",
		                quantity:"1500",
		                size_list:[
		                   {
		                      size:"L",
		                      quantity:"100"
		                   },
		                   {
		                      size:"M",
		                      quantity:"100"
		                   },
		                   {
		                      size:"X",
		                      quantity:"100"
		                   },
		                ] 

		             }
		         ]
		       }
		   ]
		};
	
//Quantity information 
function draw_qty_info( jdata ){
	var total_quantity_input = 0;
	var total_quantity = 0;
	for( var i=0;i<jdata.po.length;i++ ){
		//draw po number
		var p_po_num = '<p id="po_' + i + '" onclick="show_po_info(' + i + ')" class="po_num">' + jdata.po[i].ponum + '</p>';
		$("#po_num").append(p_po_num);
		//draw po info container
		for( var j=0;j<jdata.po[i].colors.length;j++ ){
			var color_input_qty = 0;
			//首先生成下边的size和qty部分：
			//循环生成size和qty
			var po_size_val = "";
			var po_qty_val = "";
			for( var k=0;k<jdata.po[i].colors[j].size_list.length;k++ ){
				po_size_val+= '<input type="text" id="po_' + i + '_color_' + j + '_size_' + k + '" name="po_' + i + '_color_' + j + '_size_' + k + '" value="' + jdata.po[i].colors[j].size_list[k].size + '" class="size_value">';
				po_qty_val+= '<input type="text" onblur=reset_input_qty(this) id="po_' + i + '_color_' + j + '_qty_' + k + '" name="po_' + i + '_color_' + j + '_qty_' + k + '" value="' + jdata.po[i].colors[j].size_list[k].quantity + '" class="size_value">';	
				color_input_qty += parseInt(jdata.po[i].colors[j].size_list[k].quantity);
			}
			//tr2  size part
			var po_size_info = $('<div class="po_info_size"></div>').append('<span>Size</span>').append(po_size_val);
			//tr3 qty part
			var po_qty_info = $('<div class="po_info_qty"></div>').append('<span>Order Qty</span>').append(po_qty_val);
			//完成 class="po_size" 的div
			var po_size = $('<div class="po_size"></div>').append(po_size_info).append(po_qty_info);
			//再生成上边的color部分：
			// class="po_color" 的div
			var po_color_title = '<div class="po_info_title_left">Color</div>';
			var po_color_input = '<input type="text" id="po_' + i + '_color_' + j + '_val" name="po_' + i + '_color_' + j + '_val" class="color" value="' + jdata.po[i].colors[j].color + '" disabled="disabled">';
			var po_color_qty = '<div class="po_info_title_right"><span class="input_total_qty" id="po_' + i + '_color_' + j + '_qty">' + color_input_qty + '</span> /' + jdata.po[i].colors[j].quantity + ' </div>';
			//顺便计算总数
			total_quantity_input += color_input_qty;
			total_quantity += parseInt(jdata.po[i].colors[j].quantity);
			var po_color_str = '<div class="po_info_title_right">Total quantity as input / on PO</div>';
			var po_color = $('<div class="po_color"></div>').append(po_color_title).append(po_color_input).append(po_color_qty).append(po_color_str);
			
			
			//合成整个color
			var po_info = $('<div id="po_' + i + '_color_' + j + '" class="po_info"></div>').append(po_color).append(po_size);
			//把生成的color插入页面中的po_info_container
			$("#po_info_container").append(po_info);
			
		};
	};
	//此时po_info都画出来了，下面把Total quantity as input 算出来
	$("#input_total_quantity").text(total_quantity_input);
	$("#total_quantity").text(total_quantity);
	show_po_info(0);
}



function show_po_info( i ){
	//点击样式
	$("#po_"+i).siblings().removeClass().addClass("po_num");
	$("#po_"+i).removeClass().addClass("po_num_click");
	//隐藏所有po info
	$("#po_info_container").children().hide();
	//遍历并取出所有po_info的id放入数组
	var po_info_arr = $("#po_info_container").children();
	var po_info_id = [];
	for( var j=0;j<po_info_arr.length;j++ ){
		po_info_id[j] = po_info_arr[j].id;
	}
	//遍历id，取出id的第一个数字，如果跟传入参数相等则显示该id的po_info
	for( var k=0;k<po_info_id.length;k++ ){
		var id_arr = po_info_id[k].split("_");
		if( id_arr[1] == i ){
			$("#" + po_info_id[k]).show();
		}
	}
}	
function reset_input_qty( obj ){
	if( parseInt(obj.value) ){
		//取得该input，并重新计算它所在的qty中所有input的和
		var input_id = obj.id;
		var input = $("#"+ input_id ).parent().find("input");
		var total_input_qty = 0;
		for( var i = 0;i<input.length;i++ ){
			total_input_qty += parseInt(input[i].value);
		}
		//获取该input所在的po_info的po_0_color_0_qty
		var total_input_id_str = [];
		total_input_id_str = input_id.split("_");
		total_input_id_str.pop();
		var total_input_id = total_input_id_str[0] + "_" + total_input_id_str[1] + "_" + total_input_id_str[2] + "_" + total_input_id_str[3] + "_" + total_input_id_str[4];
		//将新数据插入
		$("#"+ total_input_id ).text(total_input_qty);
		
		//重新计算input_total_quantity
		var po_input_qty = $("#po_info_container").children().find(".input_total_qty");
		var total_qty = 0;
		for( var i = 0;i<po_input_qty.length;i++ ){
			total_qty += parseInt(po_input_qty[i].innerText);
		}
		$("#input_total_quantity").text(total_qty);
	}else{
		obj.value = "";
		window.alert("number only!");
	}
	
}

//Measurement information
var fake_Measurement_data = {
		result:"success",
		data:
		[
		 {
		   sorting:"top",
		   size:["size1", "size2","size3","size4","size5"],
		   positions:[
		      {   
			  id:1321,
		          required:"1", // 1 or 0
		          name: "chest width",
		          values:[65,   52.2,   56.5,   67,  80,  1]
		      },
		      { 
			  id:1322,
		          required:"0", // 1 or 0
		          name: "chest width",
		          values:[42,   49.2,   33.5,   77,  92,  2]
		      }
		   ]
		 },
		 {
		   sorting:"top1",
		   size:["size1", "size2","size3","size4"],
		   positions:[
		      {   
			  id:1324,
		          required:"0", // 1 or 0
		          name: "chest width",
		          values:[78,   87.2,   57.5,   57,  1]
		      },
		      { 
			  id:1325,
		          required:"1", // 1 or 0
		          name: "chest width",
		          values:[87,   48.2,   54.5,   77,  2]
		      },
		      { 
			  id:1326,
		          required:"1", // 1 or 0
		          name: "chest width",
		          values:[46,   50.3,   50.5,   67,  5]
		      }
		   ]
		 }
		]
};

function draw_Measurement_info( jdata ){
	
	for( var i=0;i<jdata.data.length;i++ ){
		//draw title
		var title = '<div id="title_' + i + '" class="Measurement_tag" onclick="show_Measurement_info(' + i + ')">' + jdata.data[i].sorting + '</div>';
		$("#Measurement_title").append(title);
		
		//draw main
		//mid table title
		var main_mid_table_title_th1 = '<th width="150" style="text-align: left;"></th>';
		var main_mid_table_title_th2 = '<th width="300" style="text-align: left;">Size</th>';
		var main_mid_table_title_th3_th8 = '';
		for( var j=0;j<jdata.data[i].size.length;j++ ){
			main_mid_table_title_th3_th8 += '<th width="50">' + jdata.data[i].size[j] + '</th>';
		}
		var main_mid_table_title_th9 = '<th width="60"></th>';
		var main_mid_table_title = $('<tr></tr>').append(main_mid_table_title_th1).append(main_mid_table_title_th2).append(main_mid_table_title_th3_th8).append(main_mid_table_title_th9);
		//mid table tr
		var bottom_total = 0;
		var main_mid_table_tr = [];
		for( var j=0;j<jdata.data[i].positions.length;j++ ){
			if( jdata.data[i].positions[j].required == "1" ){
				var main_mid_table_tr_td1 = '<td width="150" style="text-align: left;"><input type="checkbox" checked="checked" name="top_' + i + '_Required" id="top_' + i + '_Required_' + j + '"><label for="top_' + i + '_Required_' + j + '">Required</label></td>';
			}else{
				var main_mid_table_tr_td1 = '<td width="150" style="text-align: left;"><input type="checkbox" name="top_' + i + '_Required" id="top_' + i + '_Required_' + j + '"><label for="top_' + i + '_Required_' + j + '">Required</label></td>';	
			}			
			var main_mid_table_tr_td2 = '<td width="300" style="text-align: left;">' + jdata.data[i].positions[j].name + '</td>';
			var main_mid_table_tr_td3_td8 = '';
			for( var k=0;k<jdata.data[i].positions[j].values.length-1;k++ ){
				main_mid_table_tr_td3_td8 += '<td width="50" class="right_border">' + jdata.data[i].positions[j].values[k] + '</td>';
			}
			var index = jdata.data[i].positions[j].values.length-1;
			var tol = jdata.data[i].positions[j].values[index];
			bottom_total += tol;
			var main_mid_table_tr_td9 = '<td width="60">' + tol + '</td>';
			main_mid_table_tr[j] = $('<tr></tr>').append(main_mid_table_tr_td1).append(main_mid_table_tr_td2).append(main_mid_table_tr_td3_td8).append(main_mid_table_tr_td9);	
		}
		var all_tr_str = '';
		for( var j=0;j<main_mid_table_tr.length;j++ ){
			all_tr_str += '<tr>' + main_mid_table_tr[j][0].innerHTML + '</tr>';
		}
		var main_mid_table = $('<table  border="0" cellspacing="0" cellpadding="0"></table>').append(main_mid_table_title).append(all_tr_str);
		//mid
		var main_mid = $('<div class="main_mid"></div>').append(main_mid_table);
		//top
		var main_top = '<div class="main_top"><div class="main_top_1">Table preview</div><div class="main_top_2"><span class="main_top_3">Position</span><span class="main_top_4">Numeric</span><span class="main_top_5">TOL(+/-)</span></div></div>';
		//bottom
		var main_bottom = '<div class="main_bottom"><span>' + bottom_total + '</span><span>Total</span></div>';
		//container
		var Measurement_info = $('<div class="Measurement_main" id="Measurement_info_' + i + '"></div>').append(main_top).append(main_mid).append(main_bottom);	
		$("#Measurement_info").append(Measurement_info);
	}
	show_Measurement_info(0);
}
function show_Measurement_info( i ){
	//点击样式
	$("#title_"+i).siblings().removeClass().addClass("Measurement_tag");
	$("#title_"+i).removeClass().addClass("Measurement_tag_click");
	//隐藏所有Measurement info
	$(".Measurement_main").hide();
	//显示需要的
	$("#Measurement_info_" + i ).show();
}

function create_size_option(){
	var size_val_arr = [];
	//循环得到size的val放入数组
	for(var i=1;i<15;i++){
		var id = "size_" + id_to_dblchar_str(i);
		if( $("#" + id ).length > 0 && $("#" + id ).val() != "" ){
			size_val_arr[i] = $("#" + id ).val();
		}else{
			break;
		}
	}
	//清空原有的option
	$("#Sample_size").html("");
	//把val做成option放入select
	var option_str = '<option value="">Please select</option>';
	for(var i = 1;i<size_val_arr.length;i++){
		option_str += '<option value="' + size_val_arr[i] + '">' + size_val_arr[i] + '</option>';
	}
	$("#Sample_size").append(option_str);
	//复制到其他部分
	for(var i=1;i<=10;i++){
		var id = "Sample_size" + id_to_dblchar_str(i);
		if( $("#" + id ).length > 0 ){
			$("#" + id ).html("");
			var option = $("#Sample_size").children("option").clone();
			$("#" + id ).append(option);
		}else{
			break;
		}
	}
	//click style
	$("#Template").removeClass();
	$("#Typing").removeClass();
	$("#Template").addClass("change_tip");
	$("#Typing").addClass("change_tip_click");
	//div switch
	$("#Template_div").hide();
	$("#Typing_div").show();
}	


$(document).ready(function (){	
	draw_qty_info(fake_data);
	draw_Measurement_info(fake_Measurement_data); 
	
	//switch tag
	$("#Template").on("click",function(){
		//click style
		$("#Template").removeClass();
		$("#Typing").removeClass();
		$("#Template").addClass("change_tip_click");
		$("#Typing").addClass("change_tip");
		//div switch
		$("#Template_div").show();
		$("#Typing_div").hide();
	});
	$("#Typing").on("click",create_size_option);
	
	//Template
	var add_size_count = 0;
	var size_count_str = "";
	//delete size
	function delete_size_function(){
		size_count_str = id_to_dblchar_str(add_size_count);
		$("#size_" + size_count_str ).remove();
		add_size_count--;
		if(add_size_count == 0){
			$("#delete_size").off("click");
		}
		if(add_size_count<14){
			$("#add_size").off("click");
			$("#add_size").on("click",add_size_function);
		}
	}
	//add size
	
	function add_size_function(){
		add_size_count++;
		size_count_str = id_to_dblchar_str(add_size_count);
		var new_size = '<input type="text" id="size_' + size_count_str + '" name="size_' + size_count_str + '" class="size_value">';
		$("#size_div").append(new_size);
		if(add_size_count>13){
			$("#add_size").off("click");
		}
		$("#delete_size").off("click");
		$("#delete_size").on("click",delete_size_function);
	}
	$("#add_size").on("click",add_size_function);
	$("#delete_size").on("click",delete_size_function);

	$("#add_size").click().click().click().click().click().click();
	
	
	//add title
	var add_title_count = 3;
	var title_count_str = "";
	function add_title_function(){
		add_title_count++;
		title_count_str = id_to_dblchar_str(add_title_count);
		var new_title = '<input type="text" id="title_' + title_count_str + '" name="title_' + title_count_str + '" class="title_value"><span id="title_star_' + title_count_str + '" class="star_span" style="float: none;">*</span>';
		$("#title_clone_parent").append(new_title);
		if(add_title_count>5){
			$("#add_title").off("click");
		}
		$("#delete_title").off("click");
		$("#delete_title").on("click",function(){
			title_count_str = id_to_dblchar_str(add_title_count);
			$("#title_" + title_count_str ).remove();
			$("#title_star_" + title_count_str ).remove();
			add_title_count--;
			if(add_title_count == 3){
				$("#delete_title").off("click");
			}
			if(add_title_count<6){
				$("#add_title").off("click");
				$("#add_title").on("click",add_title_function);
			}
		});
	}
	$("#add_title").on("click",add_title_function);
	
	
	
	
	//uploade
	
	var fitreport_uploader = WebUploader.create({     //111
	    swf:  'js/webuploader/webuploader-0.1.5/Uploader.swf',
	    // 文件接收服务端。
	    server: 'UploadOrderFile.action',
	    pick: {
	    	"id":'#show_template_flash',     //对应swf_panel_id
	    	"multiple":true
	    },  
	    auto: true,
	    duplicate:true,
	    dnd:"#clone_template_father",
	    disableGlobalDnd: true,
	    fileNumLimit:20,
	    fileSingleSizeLimit: 20*1024*1024,
	    fileVal:"upload",
	    formData:{
	        "ttype":"qc_fit_report",    //改
	        "task":"createqc"
	    },         	
	});
	fitreport_uploader.bar_id="template_panel",		   //文件上传面板，文件显示，进度条，被他包裹在里边。		
	fitreport_uploader.full_progress_bar_id="template_bar",     //进度条总长度的div
	fitreport_uploader.percent_bar_id="template_progress_bar",   //进度条width变化的div
	fitreport_uploader.related_var="template_order",     //realated_var表示相关的变量，在一个<input type="hidden">标签中，不在网页中显示，一般用来传递参数。文件上传之后value的值变为has，若必填，检验value的值是否为空。
	fitreport_uploader.file_link_id="template_link",       	  //文件上传成功后在id为 order_link的<a>标签中显示文件名，点击可以下载。
	fitreport_uploader.swf_panel_id="show_template_flash",     //放上传flash图标的地方		   
	fitreport_uploader.del_panel_id="show_template_delete";    //放删除flash图标的地方
	fitreport_uploader.type="qc_fit_report";            //改
	fitreport_uploader.task="createqc";
	
	fitreport_uploader.on("error",show_error);             //改
	fitreport_uploader.on( 'fileQueued',queued );       //改 
	fitreport_uploader.on( 'uploadProgress',uploading );//改
	fitreport_uploader.on( 'uploadSuccess',upload_ok );//改 
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//Typing
	//clone Seal sample information
	var count_Seal_sample_info = 0;   //记录复制了多少个 Seal_sample_info  的框体
	var MAX_Seal_sample_count = 10;
	var Seal_sample_num = 1;
	var Seal_sample_str = "";
	$("#add_Seal_sample_info").click(function(){
		
		//将复制计数器count_Seal_sample_info放入函数id_to_dblchar_str中，保持生成的新di后的编号是2位。然后取得右上角  删除已经添加的框体   的新ID，隐藏掉。（保证只有最后一个新增框体右上角有删除按钮）
		$("#Seal_sample_removeid"+id_to_dblchar_str(count_Seal_sample_info)).hide();
		//计数器+1，表示复制的个数，然后将数字转为2位字符串，记录在Seal_sample_str中
		count_Seal_sample_info++;        
		Seal_sample_num = count_Seal_sample_info;  
		Seal_sample_str = id_to_dblchar_str( count_Seal_sample_info ); 
		
		//下面这些把需要复制的部分单个赋值，并且加上序号用于复制。
		//第一行
		var tr1_td1 = '<td width="160">Color</td>';
		var tr1_td_input = '<input id="Color' + Seal_sample_str + '" name="Color' + Seal_sample_str + '" type="text" class="order_input"/>';
		var tr1_td2 = $('<td width="220"></td>').append(tr1_td_input);
		var tr1_td3 = '<td width="120"><span class="star_span">*</span></td>';
		var tr1_td4 = '<td width="160">Approve date</td>';																					
		var tr1_td5_input = '<input id="Approve_date' + Seal_sample_str + '" name="Approve_date' + Seal_sample_str + '" type="text" class="order_input Wdate" onclick="WdatePicker({lang:\'en\'})"/>';
		var tr1_td5 = $('<td width="220"></td>').append(tr1_td5_input);
		var tr1_td6 = '<td width="20"><span class="star_span">*</span></td>';	
		var tr1 = $('<tr style="height:44px;"></tr>').append(tr1_td1).append(tr1_td2).append(tr1_td3).append(tr1_td4).append(tr1_td5).append(tr1_td6);
		//第二行
		var tr2_td1 = '<td width="160">Sample size</td>';
		var tr2_td2 = '<td width="220"><select id="Sample_size' + Seal_sample_str +  '" name="Sample_size' + Seal_sample_str + '" class="order_input"></select></td>';
		var tr2_td3 = '<td width="120"><span class="star_span">*</span></td>';
		var tr2_td4 = '<td width="160">Clip number</td>';
		var tr2_td5 = '<td width="220"><input type="text" id="Clip_number' + Seal_sample_str + '" name="Clip_number' + Seal_sample_str + '" class="order_input" /></td>';
		var tr2_td6 = '<td width="120"><span class="star_span">*</span></td>';		
		var tr2 = $('<tr style="height:44px;"></tr>').append(tr2_td1).append(tr2_td2).append(tr2_td3).append(tr2_td4).append(tr2_td5).append(tr2_td6);
		//整体table   上边两行都要插入table
		var table = '<table border="0" cellspacing="0" cellpadding="0"  class="Inspection_table_main" style="table-layout: fixed;margin:0 0 0 10px;">';
		//将上边的两行插入table中，形成表格。
		var table_one = $(table).append(tr1).append(tr2);
		//下边这个p用于存放                      PO_Information大框体右上角的       删除复制的大框体的按钮
		var p = '<p id="Seal_sample_removeid'+Seal_sample_str+'" class="Seal_sample_remove"><span class="icon-check-minus"></span></p>';
	    //下边这个parent就是整个克隆体，克隆的时候就克隆他。
		var parent = '<div id="clone_Seal_sample'+Seal_sample_str+'" class="Seal_sample_main"></div>';
		//取得克隆体parent，插入表格，插入按钮，插入增加颜色和数量的按钮，加入删除框体的按钮。赋值给clone           
	    var clone = $(parent).append(table_one).append(p);
	    //将克隆体插入  用于存放克隆体的   父元素中。
	    $("#clone_Seal_sample_father").append(clone);
	    //这里复制第一个的option并且插入
		var tr2_td2_option = $("#Sample_size").children("option").clone();
		$("#Sample_size"+ Seal_sample_str ).append(tr2_td2_option);
	    //限制增加PO_Information大框体的数量，最多14个。等于14的时候隐藏增加按钮
	    if(count_Seal_sample_info >= MAX_Seal_sample_count){
			$("#add_Seal_sample_info").hide();
	    }
    
	    //给最后一个框体（显示删除按钮）的删除按钮绑定函数
	    $("#Seal_sample_removeid"+Seal_sample_str).click(function(){
	    	//删除最后一个克隆体
	    	$("#clone_Seal_sample"+Seal_sample_str).remove();
	    	//更新克隆体数量
	    	count_Seal_sample_info--;
	    	//把传入的计数转为2位字符串赋值给po_str2
	    	Seal_sample_str = id_to_dblchar_str( count_Seal_sample_info );
		    $("#Seal_sample_removeid"+Seal_sample_str).show();
		    
		    //限制增加PO_Information大框体的数量，小于14的时候显示增加按钮
			if(count_Seal_sample_info < MAX_Seal_sample_count){
			    $("#add_Seal_sample_info").show();
			}
	    });
	
	});
	
	
});
function  id_to_dblchar_str(id){
	if( id<10)
		return '0' + id;
	else
		return ''+id;
}


















