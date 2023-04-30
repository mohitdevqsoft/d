import axios from 'axios';
import Button from 'react-bootstrap/Button';

function Download(props) {
  const downloadFile = async () => {
    try {
      const response = await axios.get(`http://pacs.iotcom.io:5500/getfile/${props.name}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${props.name}.docx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      
      <Button variant="secondary" size="sm" onClick={downloadFile}> Download File </Button>
    </div>
  );
}

export default Download;
