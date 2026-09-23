import { createClient } from '@supabase/supabase-js'
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const configEnv = useRuntimeConfig()
  const client = createClient(configEnv.supabaseUrl,configEnv.supabaseKey)


  const page = query.page as number
  const limit = query.limit as number
  const category = query.category as number
  
  if(category) {
    const { data, error } = await client.from('Products').select().eq('category_id',category).limit(limit).range((limit*page) - limit ,( (limit*page) - 1))

    if(error) {
      throw createError(error)
    }
    return {products:data}
  }else{
    const { data, error } = await client.from('Products').select().limit(limit).range((limit*page) - limit ,( (limit*page) - 1))
    if(error) {
      throw createError(error)
    }
    return {products:data}
  }
})


