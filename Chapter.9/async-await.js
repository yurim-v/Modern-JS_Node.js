

  let getData = ()=>{
    return fetch('https://dog.ceo/api/breeds/list/all');
  }

  getData()
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
    })
    .catch((err)=>{
      console.log('에러 발생');
    })
    .finally(()=>{
      console.log('마무리 작업');
    })

  //--------------------------

  async function fetchData(){
    try{
      let response = await fetch('https://dog.ceo/api/breeds/list/all');
      let data = await response.json();
  
      console.log(data);
    }catch(error){
      console.log('에러 처리 완료');
    }finally{
      console.log('마무리 작업');
    }
  }

  fetchData();