import { Button } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function TostMessage() {
  return (
    <>
      <div
        aria-live="polite"
        // aria-atomic="true"
        className=" position-relative"
        style={{ top: 50 }}
      >
        <ToastContainer className="p-3" position={"top-center"} bg="danger">
          <Toast>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Bootstrap</strong>
            </Toast.Header>
            <Toast.Body style={{ backgroundColor: "#ff000040" }}>
              Hello, world! This is a toast message.
            </Toast.Body>
            <Button variant="primary">Login</Button>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export default TostMessage;
