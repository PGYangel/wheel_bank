/** 图片所在目录 	*///~~
	imageDir = "images";
/** 文件节点的图片 *///~~
	img_file = imageDir+"/file.gif";
/** 关闭的目录的图片 *///~~
	img_folder_close = imageDir+"/close.gif";
/** 在中间的加号的图片	*///~~
	img_plus = imageDir+"/plusnode.gif";
/** 在树末尾的加号的图片 *///~~
	img_plus_last = imageDir+"/pluslastnode.gif";
/** 打开的目录的图片 *///~~
	img_folder_open = imageDir+"/open.gif";
/** 在树末尾的减号的图片 *///~~
	img_minus_last = imageDir+"/minuslastnode.gif";
/** 在中间的减号的图片	*///~~
	img_minus = imageDir+"/minusnode.gif";
/** 无节点线条的图片 *///~~
	img_line = imageDir+"/line.gif";
/** 最后节点的线条图片	*///~~
	img_line_last = imageDir+"/lastnode.gif";
/** 中间节点的线条图片	*///~~
	img_line_mid = imageDir+"/node.gif";
/** 空白区域的图片 *///~~
	img_blank = imageDir+"/blank.gif";

/*******************************************设置公共的图片变量结束**************************************************/

function tree() {

/** 根节点 *///~~
	this.root = null;
/** 节点个数 *///~~
	this.length = 0;
/** 节点数组 *///~~
	this.nodes = new Array();
/** 在drawFrontLine时用来临时存储字符串 *///~~
//	this.tempStr = "";

/** 添加根节点 *///~~
	this.addRoot = addRoot;
/** 添加节点 *///~~
	this.addNode = addNode;

/** 画出根节点 *///~~
	this.drawRoot = drawRoot;
/** 画出节点前的空白图片或连接线图片 *///~~
	this.drawFrontLine = drawFrontLine;
/** 画出节点 *///~~
	this.drawNode = drawNode;
/** 画出所有节点 *///~~
	this.drawNodes = drawNodes;
/** 得到节点的父节点 *///~~
	this.getParent = getParent;
/** 添加节点时，将同一层的其他节点的isLast属性设置为false *///~~
	this.setOtherIsLast = setOtherIsLast;
}
/** 
 * 根节点对象 
 * @param id 根节点的id号
 * @param name 根节点名称,显示在页面的连接的名字
 * @param url 链接
 * @param target 指示链接的目标页面
*/
function root(id,name,url,target,t) {
	this.id = id; 
	this.name = name;
	this.parentId = null;
	this.type = "root";
	this.url = url;
	this.target = target;
	this.winTitle=t;
}

function addRoot(root) {
	this.root = root;
	this.length = 1;
	this.nodes[0] = root;
}
/**
 * 节点对象
 * @param id 节点id号
 * @param name 节点名称,显示在页面上的链接的名字
 * @param parentId 父节点id号
 * @param type 节点的类型(folder|file)
 * @param url 节点的链接
 * @param target 节点链接的目标页面
*///~~

function node(id,name,parentId,type,url,target,title,style) {
	/** 节点id号 *///~~
	this.id = id;
	/** 节点名称,显示在页面上的链接的名字 *///~~
	this.name =name;
	/** 父节点id号 *///~~
	this.parentId = parentId;
	/** 节点的类型(folder|file) *///~~
	this.type = type;
	/** 节点的链接 *///~~
	this.url = url;
	/** 节点链接的目标页面 *///~~
	this.target = target;
	/** title *////~~
	this.title=title;
	/** 样式 *///~~~
	this.style=style;

	/** 节点的图片(目录或文件等) *///~~
	this.image = "";
	/** 节点的前导图片(加号或减号或线条等) *///~~
	this.fImage = "";
	/** 是否是同层中最后节点 *///~~
	this.isLast = false;
}

/** 判断一个节点是否有父节点，如果有则返回其父节点，如果没有返回null */
function getParent(node) {
	for (var i=0;i<this.length;i++)	{
		if (this.nodes[i].id == node.parentId) {
			return this.nodes[i];
		}
	}
	return null;
}

/** 当添加一个新节点后，将与它处在同一层的其它元素的isLast标志设置为false */
function setOtherIsLast(node) {
	for (var i=1;i<this.length;i++) {//i=1,表示不包括根节点在内的循环
		if (this.nodes[i].parentId == node.parentId && this.nodes[i].isLast) {//如果找到父节点相同的，并且isLast为true的节点
			this.nodes[i].isLast = false; //设置该节点的isLast为false
			if (this.nodes[i].type == "folder"){ //设置图片为非末节点图片
				this.nodes[i].fImage = img_plus;
			} else {
				this.nodes[i].fImage = img_line_mid;
			}
			return true;
		}
	}
	return false;
}

/** 为树的节点组nodes[]添加一个新的节点 */
function addNode(node) {
	if (this.getParent(node) != null){ //如果有父节点
		this.setOtherIsLast(node); //设置同层中的其他元素为非末节点
		node.isLast = true; //设置本节点为末节点
		if (node.type == "folder"){ //根据节点类型设置图片
				node.image = img_folder_close;
				node.fImage = img_plus_last;
		} else {
				node.image = img_file;
				node.fImage = img_line_last;
		}
		this.nodes[this.length] = node; //添加该节点到树的节点组nodes[]
		this.length++; //节点数加1
	} else {
		alert("没有找到该节点的父节点，这是一个非法节点!");
	}
}

/** 画出根节点 */
function drawRoot() {
	document.write("<table border='0' cellspacing='0' cellpadding='0'>");
	document.write("<tr><td>");
	document.write("</td><td >");
	document.write("<a onFocus='this.blur()' href='"+this.root.url+"' target='"+this.root.target+"'>"+this.root.name+"</a>");
	document.write("</td></tr>");
	document.write("</table>");
}

/** 画出节点 */
function drawNode(node) {
	document.write("<table border='0' cellspacing='0' cellpadding='0'>");
	document.write(" <tr><td>");
	this.drawFrontLine(node);
	if (node.type == "folder"){
		document.write("<a onClick='clickOnFolder()' onFocus='this.blur()' href='#'><img border='0' src='"+node.fImage+"' align='absmiddle'></a>");
		document.write("<a onFocus='this.blur()' href='"+node.url+"' target='"+node.target+"' class='"+node.style+"'><img border='0' src='"+node.image+"' align='absmiddle'></a>");
		document.write("</td><td>");
		document.write("<a onClick='clickOnFolder()' onFocus='this.blur()' href='"+node.url+"'  id='folderLink' target='"+node.target+"' title='"+node.title+"' class='"+node.style+"'>"+node.name+"</a>");
	} else {
		document.write("<img border='0' src='"+node.fImage+"' align='absmiddle'>");
		document.write("<a onFocus='this.blur()' href='"+node.url+"' target='"+node.target+"' title='"+node.title+"' class='"+node.style+"'><img border='0' src='"+node.image+"' align='absmiddle'></a>");
		document.write("</td><td>");
		document.write("<a onFocus='this.blur()' href='"+node.url+"' target='"+node.target+"' title='"+node.title+"' class='"+node.style+"'>"+node.name+"</a>");
	}
	document.write(" </td></tr>");
	document.write("</table>");
}

/** 画出整个树的节点组 */
function drawNodes(node) {
	if (node.type != "root"){
		document.write("<div style='display:none'>");
	}
	for (var i=1;i<this.length;i++){
		if (this.nodes[i].parentId!=null && this.nodes[i].parentId == node.id){
			this.drawNode(this.nodes[i]); //画出节点
			this.drawNodes(this.nodes[i]); //递归画出整个节点组的节点
		}
	}
	if (node.type != "root"){
		document.write("</div>");
	}
}

/** 画出节点前的前导图片,有空格或线条图片.
	如果其父节点是一个末节点，那么该对应列的前导图片为空格图片.
	如果不是末节点,应该添加线条图片.
	这里进行了递归运算,但由于其图片顺序为反顺序,所以设置一个tempStr来暂存需要画出的图片,
	用以保证其图片顺序为正确顺序. */
function drawFrontLine(node) {
	var tempStr = "";
	for (var i=1;i<this.length;i++){
		if (this.nodes[i].id == node.parentId){
			if (this.nodes[i].isLast){
				tempStr = "<img src='"+img_blank+"'>" + tempStr;;
			} else {
				tempStr = "<img src='"+img_line+"'>" + tempStr;
			}
			this.drawFrontLine(this.nodes[i]);
		}
	}
	document.write(tempStr);
}

/** 当点击目录节点的前导"加号|减号"图片时，展开层或收缩层，并用相应的图片替代现有图片，实现动态收缩动作 */
function clickOnFolder() {
	var srcIndex = event.srcElement.sourceIndex;

/**居安康添加的，当点击加号|减号图片旁的文字时候，也展开或收缩层。**/
	if(document.all[srcIndex+2].tagName!="IMG"){
		srcIndex-=4;
	}


	var divElement = document.all[srcIndex+5]; //得到层对象
	var imgElement = document.all[srcIndex+2]; //得到图片对象
	var fimgElement = document.all[srcIndex]; //得到前导图片对象(即它本身)
	
	// jeickey function 
	document.title=this.root.winTitle;
	
	if (divElement.style.display == "none"){
		divElement.style.display = "";
		imgElement.src=img_folder_open;;
		if (fimgElement.src!=null && fimgElement.src.indexOf(img_plus)!=-1){
			fimgElement.src=img_minus;
		} else {
			fimgElement.src=img_minus_last;
			}
	} else {
		divElement.style.display = "none";
		imgElement.src=img_folder_close;
		if (fimgElement.src!=null && fimgElement.src.indexOf(img_minus)!=-1){
			fimgElement.src=img_plus;;
		} else {
			fimgElement.src=img_plus_last;
		}
	}
}