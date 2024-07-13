
let getData = function(){
  const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
      let data = '완벽 이해 ';
      // let data = undefined;
      if(data){
        resolve(data);
      }else{
        reject(new Error('에러 메세지'));
      }
    }, 1000)
  }) ; 

  return promise;
}


getData()
  .then((data)=>{
    console.log('작업 성공 !! :  ' + data);
    return getData();
  })
  .then((data2)=>{
    console.log('2차 데이터' + data2);
    return '난 프로미스가 아니야!'
  })
  .then((data3)=>{
    console.log('3차 데이터' + data3);
  })
  .catch((error)=>{
    console.log(error);
  })
  .finally(()=>{
    console.log('마무리 작업~');
  })

  //---------------------------------------------------
  
fetch('url')
  .then(response => response.json())
  .then((data)=>{
    console.log(data);
  })
  .catch((error)=>{
    console.log(error);
  })
  .finally(()=>{
    console.log('마무리~')
  })


  