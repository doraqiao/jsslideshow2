//封装一个代替getElementById()的方法
function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}

var index= 0,
    timer=null,
    pics=byId("banner").getElementsByTagName("div"),
    len=pics.length,
    dots=byId("dots").getElementsByTagName("span"),
    prev=byId("prev"),
    next=byId("next"),
    menu=byId("menuContent"),
    menuItems=menu.getElementsByClassName("menuItem"),
    subMenu=byId("subMenu"),
    innerBox=subMenu.getElementsByClassName("innerBox");


function slideImg(){
    var main=byId("main");
    //清除定时器，离开时继续
    main.onmouseover=function(){
        //滑过清除定时器
        if(timer){
            clearInterval(timer);
        }
    }
    main.onmouseout=function(){
        timer=setInterval(function(){
            index++;
            if(index>=len){
                index=0;
            }
            changeImg();
        },3000);
    }
    //自动在main上触发鼠标离开的事件
    main.onmouseout();

    //点击圆点切换图片
    //遍历所有点击，且绑定点击事件，点击圆点切换图片
    for(var d=0;d<len;d++){
        dots[d].id=d;
        dots[d].onclick=function(){
            //改变index为当前span的索引
            index=this.id;
            changeImg();
        }
    }
    //下一张、上一张
    next.onclick=function(){
        index++;
        if(index>=len){
            index=0;
        }
        changeImg();
    }
    prev.onclick=function(){
        index--;
        if(index<0){
            index=len-1;
        }
        changeImg();
    }
    //导航菜单
    //遍历主菜单，且绑定事件
    for(var m=0;m<menuItems.length;m++){
        //设置data-inedx属性来作为索引
        menuItems[m].setAttribute("data-index",m);
        menuItems[m].onmouseover=function(){
            var idx=this.getAttribute("data-index");
            //遍历所有子菜单，鼠标滑过时隐藏。
            for(var j=0;j<innerBox.length;j++){
                innerBox[j].style.display="none";
                menuItems[j].style.background="none";
            }
            subMenu.className="subMenu";
            menuItems[idx].style.background="rgba(0,0,0,0.1)";
            innerBox[idx].style.display="block";
        };
    }

    //离开菜单，收起
    menu.onmouseout=function(){
        subMenu.className="subMenu hide";
    }
    subMenu.onmouseover=function(){
        this.className="subMenu";
    }
    subMenu.onmouseout=function(){
        this.className="subMenu hide";
    }
}

//切换图片
function changeImg(){
    //遍历banner下有的div，将其隐藏
    for(var i=0;i<len;i++){
        pics[i].style.display="none";
        dots[i].className="";
    }
    //根据index索引找到当前div，将其显示出来
    pics[index].style.display="block";
    dots[index].className="active";
}

slideImg();
