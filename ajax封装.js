  function ajax (option){
      option = option || {},
      option.type = option.type || 'get',
      option.url = option.url || '',
      option.data = option.data || '',
      option.callback = option.callback || function(res){
        console.log('你的回调函数没给,我们不建议这样做');
        console.log(res);
      }   
      let xhr = XMLHttpRequest();
      if(option.type === 'get'){
          option.url += '?' + option.data;
      }
      xhr.open(option.type,option.url);
      if(option.type ==='post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(option.data);
      }else{
          xhr.send();
      }
      xhr.onreadystatechange = function(){
          if(xhr.readyState ===4 && xhr.statys ===200){
              console.log(xhr.responseText);
          }
      }
  }