import { faCheckCircle, faCircleCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SetStateAction, useState } from 'react';
import Spinner from './Spinner';


function EmailSender(props: { 
    customers: any, 
    content: string, 
    subject: string, 
    onSend: () => void 
}) {

    const [response, setResponse] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const { subject, content, onSend } = props

    function sendEmail(subject: string, content: string) {
        setIsLoading(true)
        for (let customer of props.customers) {
            const { firstName, lastName, email } = customer;
            try {

                fetch('https://api.sendinblue.com/v3/smtp/email', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'api-key': import.meta.env.VITE_SENDINBLUE_APIKEY,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({

                        "sender": {
                            "name": "Phil De Hovre",
                            "email": "ph.dehovre@gmail.com"
                        },
                        "to": [{
                            "email": "placeholder@email.com",
                            "name": "Phil De Hovre"
                        }],
                        // "bcc": [
                        //     {
                        //         "email": email,
                        //         "name": `${firstName} ${lastName}`
                        //     },
                        // ],
                        "templateId": 1,
                        "params": {
                            "firstName": firstName,
                            "lastName": lastName,
                            "content": content
                        },
                        "subject": subject,
                    })
                })
                    .then(response => {
                        setIsLoading(false)
                        onSend()
                        setResponse(response)
                    })
                    .catch(error => console.error(error));
            } catch (err) {
                console.log(err)
            }
        }
    }


    const handleModalConfirmSend = () => {
        sendEmail(subject, content)
        setShowModal(false)
    }
    return (
        <div>
            <button onClick={() => setShowModal(true)}>
                {isLoading ? <Spinner /> : 'Send Emails'}
            </button>
        </div>
    );
}

export default EmailSender;
