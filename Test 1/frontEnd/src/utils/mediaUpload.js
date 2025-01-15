import { createClient } from "@supabase/supabase-js"

const key =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllamphcGt0cHBwdWZjeHFoZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzU2MDEsImV4cCI6MjA1MjI1MTYwMX0.EN51cs6W3K9gh5TgkIN2q6DlwJq6cUlVeewd1HhMo_0
`
const url="https://iejjapktpppufcxqhgqz.supabase.co"

export default function UploadMediaToSupabase(file){

    return new Promise((resolve, reject) => {
        if(file == null){
            reject("file not added")
        }
        let fileName = file.name
        const extension = fileName.split(".")[fileName.split(".").length-1]

        const supabase= createClient(url,key)
        const timestamp = new Date().getTime()
        fileName = timestamp + fileName + "." + extension

        supabase.storage.from("images").upload(fileName,file,{
            cacheControl: "3600",
            upsert : false
        }).then(() => {
            const { publicUrl } = supabase.storage.from("images").getPublicUrl(fileName).data;

            resolve(publicUrl);
        }).catch((err)=>{
            reject(err);
        });
    })

}









   

    // if(extension !="jpg" && extension !="png"){
    //     alert("please select a file type")
    //     return
    // }




    
   

   

    
        
    




