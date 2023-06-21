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

  function generateInvoiceFile() {
    const { date, venue, fee, invoiceId } = invoice;
    const { address, postcode, email, name } = entity;
    setIsLoading(true);
    try {
      fetch("https://api.docugenerate.com/v1/document", {
        method: "POST",
        headers: {
          Authorization: import.meta.env.VITE_DOCUGENERATE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_id: "Kz4pV0zjegUvwB7CWsAd",
          data: JSON.stringify([
            {
              invoiceId: `${invoiceId}`,
              date: `${date}`,
              name: `${name}`,
              email: `${email}`,
              address: `${address}`,
              postcode: `${postcode}`,
              venue: `${venue}`,
              fee: `${fee}`,
            },
          ]),
          name: `Invoice - De Hovre - ${name} - ${date}`,
          output_format: `.pdf`,
          output_name: `Invoice - De Hovre - ${name} - ${date}`,
        }),
      }).then(() => {
        fetch(
          `https://api.docugenerate.com/v1/document?template_id=${
            import.meta.env.VITE_DOCUGENERATE_TEMPLATE_ID
          }`,
          {
            method: "GET",
            headers: {
              Authorization: import.meta.env.VITE_DOCUGENERATE_API_KEY,
              "Content-Type": "application/json",
            },
          }
        ).then((response) =>
          response.json().then((response) => {
            console.log(response);
            sendEmail(response[0].document_uri);
          })
        );
      });
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }

  function sendEmail(document_uri: string) {
    console.log(document_uri);
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
            document_uri: document_uri,
          },
          subject: `Invoice - Phil De Hovre - ${date} - ${venue}`,
        }),
      })
        .then(() => {
          onSend();
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <button
          className="send_invoice-btn"
          disabled={!isChecked || isLoading}
          onClick={generateInvoiceFile}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <FontAwesomeIcon icon={faEnvelope} size="lg" color="white" />
          )}
        </button>
      </div>
    </>
  );
}

export default EmailSender;
