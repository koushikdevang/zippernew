// import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  
  const postFile =(file)=>{
    const formdata=new FormData();
    formdata.append("file",file);
    postFiles(formdata,"file");
  };

  const postMultipleFile = (filelist)=>{
    console.log(filelist);
    const formdata = new FormData();
    for( let index=0; index<filelist.length; index++){
      const file=filelist[index];
      formdata.append("files",file);
    }
    postFiles(formdata,'multifiles');
  }

  const postFiles = async(formdata,endpoint)=> {
    try {
      const result= await axios.post('http://localhost:4000/multifiles', formdata);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {/* <h1>test</h1> */}
      <input type='file' onChange={(event)=>{
        const file = event.target.files[0];
        postFile(file);
      }}
      ></input>
      <input type='file' multiple onChange={(event)=>{
        const filelist = event.target.files;
        postMultipleFile(filelist);
      }}
      ></input>
    </div>
    // <div className="container">
    //   <h1 className="text-center">Compress Files to ZIP File</h1>
    //   <form action="/multifiles" method="post" encType="multipart/form-data">
    //     <div className="form-group">
    //       <label for="file">Upload Files:</label>
    //       <input
    //         className="form-control"
    //         type="file"
    //         name="file"
    //         multiple
    //         required
    //       />
    //     </div>
    //     <div className="form-gro">
    //       <button className="btn btn-block btn-primary">Download ZIP File</button>
    //     </div> 
    //   </form>
    // </div>
      

  );
}

export default App;
