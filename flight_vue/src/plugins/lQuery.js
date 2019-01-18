export const lQuery = (selector,context) => {
  return new lQuery.init(selector,context)
}

lQuery.init = function(selector,context){
  var type = lQuery.type(selector),doc = document,
    pre,str;
  
  if( type === 'string' ){
    pre = selector.charAt();
    str = selector.slice(1);
    
    switch(pre){
      case '#':
        this.length = 1;
        this[0] = document.getElementById(str);
        return this;
        break;
      case '.':
        this.length = 0;
        lQuery.merge(this, (context||doc).getElementsByClassName(str) );
        return this;
        break;
      case '<':
        this.length = 1;
        this[0] = doc.createElement(str.slice(0,-1));
        return this;
        break;
      default: 
        this.length = 0;
        lQuery.merge(this,(context||doc).getElementsByTagName(selector));
        return this;
        break;
    }
    
  }else if( type === 'function' ){
    
    if( document.addEventListener ){
      document.addEventListener('DOMContentLoaded',selector);
    }else{
      
      if( window.onload ){
        var oldFn = window.onload;
        window.onload = function(){
          oldFn();
          selector();
        };
      }else{
        window.onload = selector;
      }

    }
    
  }else{
    
//  return selector;
    
    if( selector instanceof lQuery.init )return selector;
    
    this[0] = selector;
    this.length = 1;
    return this;
    
  }
  
}

lQuery.init.prototype = {
  constructor : lQuery.init,
  html : function(str){
    
    if( lQuery.type(str) === 'undefined' ) return this[0].innerHTML;
    
    lQuery.each(this,function(index,val){
      this.innerHTML = str;
    });
  },
  each : function(callback){
    lQuery.each(this, callback);
  },
  eq : function(n){
    var len = this.length,i;
    i = n < 0 ? len + n : n;
    return lQuery(this[i]);
  },
  css : function(){
    var arg = arguments,type;
    
    if( arg.length == 1 ){
      type = lQuery.type(arg[0]);
      
      if(type === 'object'){
        
        lQuery.each(this, function() {
        	   var _this = this;
        	   lQuery.each(arg[0],function(attr,val){
        	     css(_this,attr,val);
        	   });
        	   
        });
        
      }else{
//      console.log( arg );
        return css(this[0],arg[0]);
      }
      
    }else{
      
      lQuery.each(this,function(){
        
        css(this,arg[0],arg[1]);
        
      });
      
    }
    
  },
  addClass: function(str) {
    lQuery.each(this, function() {
      addClassFunc(this,str);
    })
  },
  removeClass: function(str) {
    lQuery.each(this, function() {
      removeClassFunc(this,str);
    })
  }
  
}

lQuery.merge = function(first,second){
  var i = first.length,j = 0;
  for(;j<second.length;j++){
    first[i++] = second[j];
  }
  first.length = i;
}

lQuery.each = function(obj,callback){
  var i = 0, len;
  if(!obj||typeof obj !== 'object')return;
  
  if( lQuery.isArrayLike(obj) ){
    len = obj.length;
    
    for(; i<len; i++){
      callback.call(obj[i],i,obj[i]);
    }
    
  }else{
    
    for(i in obj){
      callback.call(obj[i],i,obj[i]);
    }
    
  }
  
};

lQuery.isArrayLike = function( obj ){
  var tp = lQuery.type(obj),length;
  if(!obj||tp==='function'||tp==='window'||tp==='string') return false;
  
  if( tp === 'array' ) return true;
  
  length = obj.length;
  
  if('length' in obj && typeof length === 'number' &&  length >= 0 ) return true;
  
  return false;
     
};

lQuery.type = function(obj){
  var o = {};
  return o.toString.call(obj).slice(8,-1).toLowerCase();
}

function css(obj,attr,val){
  if(val){
    switch(attr){
      case 'backgroundColor':
      case 'opacity':
      case 'zIndex':
        obj.style[attr] = val;
        break;
      default:
        obj.style[attr] = val;
    }
    
  }else{
    return getComputedStyle(obj)[attr];
  }
}

function addClassFunc(obj, cls) {
  let obj_class = obj.className,//获取 class 内容.
  blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
  let added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
  obj.className = added;//替换原来的 class.
}

function removeClassFunc(obj, cls) {
  let obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
  obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
  let removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
  removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
  obj.className = removed;//替换原来的 class.
}