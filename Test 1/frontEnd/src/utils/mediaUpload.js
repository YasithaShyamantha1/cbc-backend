// Cloudinary Configuration
const CLOUD_NAME = "dekxsr071";
const UPLOAD_PRESET = "Products";

export default function UploadMediaToSupabase(file) {
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("file not added");
            return;
        }

        // Create form data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        // Upload to Cloudinary
        fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.secure_url) {
                resolve(data.secure_url);
            } else {
                reject("Upload failed: No URL returned");
            }
        })
        .catch((err) => {
            reject(err);
        });
    });
}









   

    // if(extension !="jpg" && extension !="png"){
    //     alert("please select a file type")
    //     return
    // }




    
   

   

    
        
    




