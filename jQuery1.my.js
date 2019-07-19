;(function(window,document){
    function jQuery(selector){
        // 如果函数
        if(typeof selector === 'function'){
            document.addEventListener('DOMContentLoaded',selector);
        }else {
            // 获取元素
            return new Init(selector);
        }
        // 为了在使用的时候更加简单,在new的基础上再包一层
        
    }
    // 需要把所有方法都放在原型对象身上
    function Init(selector){
        let dom = document.querySelectorAll(selector);
        // jQuery对象要求是一个伪数组
        for(let i = 0 ;i < dom.length; i++ ){
            this[i] = dom[i];
        }
        // 伪数组还需要一个length
        this.length = dom.length;

    }
    Init.prototype.css = function(property,value){
        // 修改实例对象伪数组里面的样式
        // 需要遍历this伪数组,把里面的每个元素的样式都进行修改
        for(let i =0 ; i < this.length; i++){
            this[i].style[property] = value + 'px';
        }
    }

    // 很多方法,都会遍历数组的,就先封装伪数组的方法
    Init.prototype.each = function(callback){
        for(let i =0 ; i < this.length;i++){
            // 在遍历里面的逻辑是不确定 - 传回调函数进来
            callback(i,this[i]);
        }
    }

    // jQuery的css方法,有两个功能
    // 设置css样式
    // jq对象.css(属性名,属性值)
    // 获取css样式
    // jq对象.css(属性名)
    Init.prototype.css = function(property,value){
        // 如果没有传第二个参数,就是获取
        if(value == undefined){
            return window.gerComputedStyle(this[0])[property];
        }else {
            // 有一个数组,里面存储了所有的需要带单位的属性名
            // 简单处理带单位的数组
            let pxArr = ['width','height','top','left','right','bottom','fontSize','margin','padding'];
            // 实现设置
            // 把伪数组中的每一个都遍历,设置他的css样式属性
            // 元素对象.style.css属性名 = 新的值
            for( let i = 0; i < this.length;i++){
                // 把带单位的属性和不带单位的属性区分开
                if(pxArr.indexOf(property) !== -1){
                    // 判断是否带了px
                    if(value.toString().indexOf('px') === -1){
                        this[i].style[property] = value + 'px';
                    }else {
                        this[i].style[property] = value;
                    }
                }else {
                    this[i].style[property] = value;
                }
            }
            // 最后返回this
            return this;
        }
    }

    // 实现addClass功能
    // jq里面的addClass
    //jq对象.addClass(类名)
    
    Init.prototype.addClass = function(addClass) {
        // 循环的遍历伪数组,把里面的每个元素都实现类名添加
        for(let i = 0; i < this.length; i++){
            this[i].classList.add(className);
        }
        return this;
    }

    //封装移除类名的方法
    Init.prototype.removeClass = function(className){
        this.each(function(i,e){
            e.classList.remove(className);
        })
        return this;
    }

    // 切换类名
    Init.prototype.toggleClass = function(className){
        this.each(function(i,e){
            e.classList.toggle(className);
        })
    }
    // 删除元素
    Init.prototype.remove = function(){
        return this.each(function(i,e){
            e.parentNode.removeChild(e);
        })
    }
    // 隐藏元素
    Init.prototype.hide = function(){
        return this.each(function(i,e){
            e.style.display = 'none';
        })
    }
    // 显示元素
    Init.prototype.show = function(){
        return this.each(function(i,e){
            e.style.display = 'block';
        })
    }
    
    Init.prototype.val = function(val){
        // 判断是否有内容输入
        if(val === undefined) {
            return this[0].value;
        }else{
            return this.each(function(i,e){
                e.value = val;
            })
        }
    }

        window.$ = window.jQuery = jQuery;
})(window,document);