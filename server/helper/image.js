// import  express from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
    desitanation:function(req, file, data){
        data(null, '../../UI/images/');
    },
    filename: function(req, file, name){
        name(null, file.originalname);
    }
})
const imageUrl = multer(storage);

export default imageUrl;