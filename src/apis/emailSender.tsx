import { Entity, Invoice } from "../types";

export function sendEmail(
  document_uri: string,
  invoice: Invoice,
  entity: Entity
) {
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
    }).catch((error) => console.error(error));
  } catch (err) {
    console.log(err);
  }
}
