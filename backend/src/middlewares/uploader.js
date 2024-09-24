import multer from "multer";
import path from "path";

const disk = (folder) => multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, folder);},
    filename: (req, file, callback)=>{
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        callback(null, filename);
    }
});

const upload =(folder) => multer({storage: disk(folder)});
export default upload;