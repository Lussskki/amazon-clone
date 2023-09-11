import productsSchema from '../db/model/productsSchema.js'

import productsData from './productsData.js'


const defaultData = async ()=>{
    try{

        await productsSchema.deleteMany({})

        const storeData = await productsSchema.insertMany(productsData)
        
        
    }catch(err){
        signale.error(`DefaultData: error- ${err}`)
    }
}

export default defaultData