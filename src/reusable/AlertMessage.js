import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertMessage = (props) => {
    const [show, setShow] = useState(true);
    return (
        <div>
          <Alert variant={props.alertName}  onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{props.alertlabel}</Alert.Heading>
                {props.alertMessage}
            </Alert>  
        </div>
    );
};

export default AlertMessage;