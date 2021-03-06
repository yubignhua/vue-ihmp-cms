/**
 * Created by yubh on 2018/3/28.
 */

const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};


export const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];
  
  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;
    
    let child, proto;
    
    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }
    
    // 处理循环引用
    const index = parents.indexOf(parent);
    
    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);
    
    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }
    
    return child;
  };
  return _clone(parent);
};





/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  }else if(element.currentStyle){
    target = element.currentStyle[attr];
  }else{
    target = document.defaultView.getComputedStyle(element,null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  let windowHeight = window.screen.height;
  let height;
  let setTop;
  let paddingBottom;
  let marginBottom;
  let requestFram;
  let oldScrollTop;
  
  document.body.addEventListener('scroll',() => {
    loadMore();
  }, false)
  //运动开始时获取元素 高度 和 offseTop, pading, margin
  element.addEventListener('touchstart',() => {
    height = element.offsetHeight;
    setTop = element.offsetTop;
    paddingBottom = getStyle(element,'paddingBottom');
    marginBottom = getStyle(element,'marginBottom');
  },{passive: true})
  
  //运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener('touchmove',() => {
    loadMore();
  },{passive: true})
  
  //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener('touchend',() => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  },{passive: true})
  
  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        loadMore();
        moveEnd();
      }else{
        cancelAnimationFrame(requestFram);
        //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight;
        loadMore();
      }
    })
  }
  
  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback();
    }
  }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
  let requestFram;
  let oldScrollTop;
  
  document.addEventListener('scroll',() => {
    showBackFun();
  }, false)
  document.addEventListener('touchstart',() => {
    showBackFun();
  },{passive: true})
  
  document.addEventListener('touchmove',() => {
    showBackFun();
  },{passive: true})
  
  document.addEventListener('touchend',() => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  },{passive: true})
  
  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
      }else{
        cancelAnimationFrame(requestFram);
      }
      showBackFun();
    })
  }
  
  //判断是否达到目标点
  const showBackFun = () => {
    if (document.body.scrollTop > 500) {
      callback(true);
    }else{
      callback(false);
    }
  }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
  clearInterval(element.timer);
  
  //判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration;
    duration = 400;
  }else if(duration instanceof String){
    mode = duration;
    duration = 400;
  }
  
  //判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode;
    mode = 'ease-out';
  }
  
  //获取dom样式
  const attrStyle = attr => {
    if (attr === "opacity") {
      return Math.round(getStyle(element, attr, 'float') * 100);
    } else {
      return getStyle(element, attr);
    }
  }
  //根字体大小，需要从此将 rem 改成 px 进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize);
  
  const unit = {};
  const initState = {};
  
  //获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^\.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
    }else{
      unit[attr] = 'px';
    }
    initState[attr] = attrStyle(attr);
  });
  
  //去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] == 'rem') {
      target[attr] = Math.ceil(parseInt(target[attr])*rootSize);
    }else{
      target[attr] = parseInt(target[attr]);
    }
  });
  
  
  let flag = true; //假设所有运动到达终点
  const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0;  //步长
      let status = false; //是否仍需运动
      let iCurrent = attrStyle(attr) || 0; //当前元素属性址
      let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
      let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      switch(mode){
        case 'ease-out':
          speedBase = iCurrent;
          intervalTime = duration*5/400;
          break;
        case 'linear':
          speedBase = initState[attr];
          intervalTime = duration*20/400;
          break;
        case 'ease-in':
          let oldspeed = remberSpeed[attr] || 0;
          iSpeed = oldspeed + (target[attr] - initState[attr])/duration;
          remberSpeed[attr] = iSpeed
          break;
        default:
          speedBase = iCurrent;
          intervalTime = duration*5/400;
      }
      if (mode !== 'ease-in') {
        iSpeed = (target[attr] - speedBase) / intervalTime;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      }
      //判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch(mode){
        case 'ease-out':
          status = iCurrent != target[attr];
          break;
        case 'linear':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        case 'ease-in':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        default:
          status = iCurrent != target[attr];
      }
      
      if (status) {
        flag = false;
        //opacity 和 scrollTop 需要特殊处理
        if (attr === "opacity") {
          element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
          element.style.opacity = (iCurrent + iSpeed) / 100;
        } else if (attr === 'scrollTop') {
          element.scrollTop = iCurrent + iSpeed;
        }else{
          element.style[attr] = iCurrent + iSpeed + 'px';
        }
      } else {
        flag = true;
      }
      
      if (flag) {
        clearInterval(element.timer);
        if (callback) {
          callback();
        }
      }
    })
  }, 20);
}
/*
 *---------------  DateAdd(interval,number,date)  -----------------
 *  DateAdd(interval,number,date)
 *  功能:实现VBScript的DateAdd功能.
 *  参数:interval,字符串表达式，表示要添加的时间间隔.
 *  参数:number,数值表达式，表示要添加的时间间隔的个数.
 *  参数:date,时间对象.
 *  返回:新的时间对象.
 *  var  now  =  new  Date();
 *  var  newDate  =  DateAdd( "d ",5,now);
 *  author:wanghr100(灰豆宝宝.net)
 *  update:2004-5-28  11:46
 *---------------  DateAdd(interval,number,date)  -----------------
 */
export const   DateAdd = (interval,number,date) => {

  switch(interval)
  {
    case  "y "  :  {
      date.setFullYear(date.getFullYear()+number);
      return  date;
      break;
    }
    case  "q "  :  {
      date.setMonth(date.getMonth()+number*3);
      return  date;
      break;
    }
    case  "m "  :  {
      date.setMonth(date.getMonth()+number);
      return  date;
      break;
    }
    case  "w "  :  {
      date.setDate(date.getDate()+number*7);
      return  date;
      break;
    }
    case  "d "  :  {
      date.setDate(date.getDate()+number);
      return  date;
      break;
    }
    case  "h "  :  {
      date.setHours(date.getHours()+number);
      return  date;
      break;
    }
    case  "m "  :  {
      date.setMinutes(date.getMinutes()+number);
      return  date;
      break;
    }
    case  "s "  :  {
      date.setSeconds(date.getSeconds()+number);
      return  date;
      break;
    }
    default  :  {
      date.setDate(d.getDate()+number);
      return  date;
      break;
    }
  }
}
// var  now  =  new  Date();
// //加五天.
// var  newDate  =  DateAdd( "d ",5,now);
// alert(newDate.toLocaleDateString())
// //加两个月.
// newDate  =  DateAdd( "m ",2,now);
// alert(newDate.toLocaleDateString())
// //加一年
// newDate  =  DateAdd( "y ",1,now);
// alert(newDate.toLocaleDateString())
