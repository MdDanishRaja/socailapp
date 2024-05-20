import Env from "@/Env";
import moment from "moment"

export const getS3URL = (path:string):string =>{
    return `${Env.SUPABASE_URL}/storage/v1/object/public/${Env.S3_BUCKET}/${path}`
}


export const formateDate=(date:string):string=>{
    return moment(date).fromNow()
}