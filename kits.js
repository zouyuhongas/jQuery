var kits = {};


/**
 * 转换思路是：
        url参数长成： id=10086&name=goudan&pwd=123
        把url参数使用  &  割开，成为  [键=值,键=值...]
        再把数组里面的每个 键=值 再割开 ， [键,值]
 * */
kits.getUrlParams = function () {
  let arr = location.search.substring(1).split('&');
  let prams = {};
  arr.forEach(e=>{
      let temp = e.split('=');
      let key = temp[0];
      let val = temp[1];
      prams[key] = val;
  })
  return prams;
}


let strategies = {
  isNonEmpty: function (val, msg) {
    if (val.trim().length === 0) {
      return msg;
    }
  },
  minLength: function (val, len, msg) {
    if (val.trim().length < len) {
      return msg;
    }
  }
}

// 状态模式的思想： 使用状态代替if-else
function Validator() {
  // 有一个数组，用来存储所有的验证的函数
  this.validateFuncs = [];
}
// 2.2 给构造函数的原型添加一个方法，让其可以添加一个新的函数进去
Validator.prototype.add = function (dom, arr) {
  // 遍历数组，往this.validateFuncs 添加新的验证的方法
  for (let i = 0; i < arr.length; i++) {
    let fn = function () {
      let rule = arr[i];
      let params = rule.fnName.split(':');// [minLength,8]
      let fnName = params.shift(); // fnName里面可能会包含参数
      params.unshift(dom.value); // [dom.vlaue,8]
      params.push(rule.errMsg); // [dom.value,8,rule.errMsg];
      return strategies[fnName].apply(dom, params);
    }
    this.validateFuncs.push(fn);
  }

}

// 2.3 需要一个可以把数组里面的每个函数都执行的方法
Validator.prototype.start = function () {
  for (let i = 0; i < this.validateFuncs.length; i++) {
    let msg = this.validateFuncs[i]();
    if (msg) {
      return msg;
    }
  }
}