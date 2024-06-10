const URL = "https://7b638d20-5d41-4b82-99f8-d9c53192d0be-00-1yozmeicxbig9.worf.replit.dev"



const getList = async () => {

   const list = await fetch (`${URL}/list`). then(data => data.json());
    console.log(list)
}

getList();