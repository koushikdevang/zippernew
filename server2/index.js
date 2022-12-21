// const express = require('express');
// const cors = require("cors");
// const multer = require('multer');
// // const port = 4000;

// const admzip = require('adm-zip')
// const fs = require('fs');
// const path = require('path');
// const app = express()

// var corsOptions = {
//     origin: "http://localhost:3000",
//     optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// var dir = "public";
// var subDirectory = "public/uploads";

// if(!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
//     fs.mkdirSync(subDirectory);
// }

// //correct
// var storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         cb(null, "public/uploads");
//     },
//     filename: function(req,file, cb) {
//         cb(
//             null,
//             file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//     },
// });

// var maxSize = 10* 1024 * 1024

// var compressfilesupload = multer({storage: storage,limits:{fileSize:maxSize}})

// app.get('/',(req,res)=>{
//     res.send('welcome to express api');
//     // res.sendFile(__dirname + "/index.html")
// })

// app.post('/multifiles',compressfilesupload.array('file',100),(req,res)=>{
//     // const zip = new admzip()
//     // if(req.files){
//     //     req.files.forEach(file => {
//     //         console.log(file.path);
//     //         zip.addLocalFile(file.path)
//     //     });

//     //     var outpuPath = Date.now()+"output.zip"

//     //     fs.writeFileSync(outpuPath,zip.toBuffer())
//     //     res.download(outpuPath, (err)=>{
//     //         if(err){
//     //             req.files.forEach(file =>{
//     //                 fs.unlinkSync(file.path)
//     //             });
//     //             fs.unlinkSync(outpuPath);
//     //             res.send("Error in downloading zip file");
//     //         }
//     //         req.files.forEach(file =>{
//     //             fs.unlinkSync(file.path)
//     //         });
//     //         fs.unlinkSync(outpuPath);
//     //     })
//     // }
// })

// app.listen(4000,()=>{
//     console.log("App is listening on port 4000");
// })


const express = require("express");
const admzip = require('adm-zip')
const cors = require("cors");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const port = 4000;
const app = express();
var dir = "public";
var subDirectory = "public/uploads";

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    fs.mkdirSync(subDirectory);
}

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to Express App test");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // cb(null, `${Date.now()}_${file.originalname}`);
    cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const upload = multer({ storage });
var maxSize = 10* 1024 * 1024
var compressfilesupload = multer({storage: storage,limits:{fileSize:maxSize}})


// app.post("/file", upload.single("file"), (req, res) => {
//   const file = req.file;

//   if (file) {
//     res.json(file);
//   } else {
//     throw new Error("File upload unsuccessful");
//   }
// });

app.post("/multifiles", compressfilesupload.array('files',100),(req,res)=>{
    // console.log(file);
  const zip = new admzip()
  const files = req.files;
  if (Array.isArray(files) && files.length > 0) {
    // res.json(files);
    files.forEach(file => {
        console.log(file.path);
        zip.addLocalFile(file.path)
    });
    var outpuPath = Date.now()+"output.zip"
    fs.writeFileSync(outpuPath,zip.toBuffer())
    res.download(outpuPath, (err)=>{
        if(err){
            files.forEach(file =>{
                fs.unlinkSync(file.path)
            });
            fs.unlinkSync(outpuPath);
            res.send("Error in downloading zip file");
        }
        // files.forEach(file =>{
        //     fs.unlinkSync(file.path)
        // });
        // fs.unlinkSync(outpuPath);
    })

  } else {
    throw new Error("File upload unsuccessful");
  }
});

app.listen(port, () => {
  console.log("Express App is running on localhost :" + port);
});