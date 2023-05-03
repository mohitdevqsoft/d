import { useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';


function FileUploader({name}) {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null)

  const handleFileChange = (event) => {
	console.log(event.target) 
	  console.log(event.target.name)
	  setFile(event.target.files[0]);
	  setFilename(event.target.name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
	//console.log(file);
	//file.newname = filename
    formData.append('file',file, `${filename}.docx`);
    
    try {
        const response = await axios.post('http://pacs.iotcom.io:5500/upload', formData);
        console.log('responce ',response);
      } catch (error) {
        console.log(error);
      }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input className="form-control" name={name}  type="file" onChange={handleFileChange} />
      </label>
      <Button type="submit">Upload</Button>
    </form>
  );
}

export default FileUploader;
