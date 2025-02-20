export const getStaticProps = async (file:any) => {
  const result = await fetch('http://localhost:3000/api/Card/cardController_postCardmeta',{
      body:JSON.stringify({
        filename: file.name,
      }),
      mode: 'cors',
      method: 'get',
  })
  const res = await result.json() //必须通过此方法才可返回数据
  
  return res
}

export default getStaticProps
