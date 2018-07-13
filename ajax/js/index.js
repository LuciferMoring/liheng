var str = '';
var xhr = null;
var json = null;
var list = document.getElementsByClassName('list')[0];
function ajax(xhr,type,url,data,json){
	xhr = new XMLHttpRequest();
	xhr.open(type,url,true);
	xhr.send(data);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			json = xhr.responseText;
			json = JSON.parse(json);
			for(var i=0;i<json.length;i++){
				str +=`
					<tr>
					<td>${json[i].id}</td>
					<td>${json[i].name}</td>
					<td>
						<button class="dele">删除</button>
					</td>
					</tr>
				`;
			}
			list.innerHTML=str;
			function del(){
				var dele = document.getElementsByClassName("dele");
				var shadow = document.getElementsByClassName('shadow')[0];
				var tips = document.getElementById('tips');
				for(var i=0;i<dele.length;i++){
					dele[i].onclick=function(){
						shadow.style.display='block';
						tips.onmousedown=function(){
							this.onmousemove=function(e){
								e = e || window.event;
								var l=e.clientX ;
								var t=e.clientY ;
								this.style.left=l + 'px';
								this.style.top=t + 'px';
							}
						}
						tips.onmouseup=function(){
							this.onmousemove=function(){}
						}
					}
				}
			}
			function delsure(){
				var tips = $('#tips');
				var sure = $('.sure');
				var no = $('.no');
				var btn = $('.list tr .dele');
				var trBox = $('.list tr');
				var shadow = $('.shadow');
				btn.eq(json[0].id).on('click',function(){
					sure.eq(json[0].id).on('click',function(){
						trBox.eq(json[0].id).remove();
						shadow.css('display','none');
					})
					no.eq(json[0].id).on('click',function(){
						shadow.css('display','none');
					})
				})
			}
			del();
			delsure();
		}		
	}
}

ajax(xhr,'GET','produce.json',null,json);

