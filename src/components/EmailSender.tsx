import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Spinner from "./Spinner";
import { Entity, Invoice } from "../types";

function EmailSender(props: {
  invoice: Invoice;
  entity: Entity;
  onSend: () => void;
  isChecked: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onSend, invoice, entity, isChecked } = props;

  function sendEmail() {
    setIsLoading(true);

    console.log();

    const { date, venue, fee } = invoice;
    const { address, postcode, email, name } = entity;
    try {
      fetch("https://api.sendinblue.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": import.meta.env.VITE_SENDINBLUE_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "Phil De Hovre",
            email: "ph.dehovre@gmail.com",
          },
          to: [
            {
              email: email,
              name: name,
            },
          ],
          templateId: 2,
          params: {
            name: name,
            location: venue,
            date: date,
            fee: `£ ${fee}`,
            address: address,
            postcode: postcode,
          },
          subject: `Invoice - Phil De Hovre - ${date} - ${venue}`,
        }),
      })
        .then(() => {
          setIsLoading(false);
          onSend();
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button
        className="send_invoice-btn"
        disabled={!isChecked}
        onClick={sendEmail}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <FontAwesomeIcon icon={faEnvelope} size="lg" color="white" />
        )}
      </button>
    </div>
  );
}

export default EmailSender;
