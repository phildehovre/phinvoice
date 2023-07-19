import { Entity, Invoice } from "../types";
import { sendEmail } from "./emailSender";
import { updateInvoice } from "../util/db";

export function generateInvoiceFile(invoice: Invoice, entity: Entity) {
  const { date, venue, fee, invoiceId } = invoice;
  const { address, postcode, email, name } = entity;
  console.log(date);
  try {
    fetch("https://api.docugenerate.com/v1/document", {
      method: "POST",
      headers: {
        Authorization: import.meta.env.VITE_DOCUGENERATE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_id: "Kz4pV0zjegUvwB7CWsAd",
        name: `Invoice_De_Hovre_${name}_${date}`,
        output_format: ".pdf",
        output_name: `Invoice_De_Hovre_${name}_${date}`,
        title: `Invoice_De_Hovre_${name}_${date}`,
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
      }),
    })
      .then(() => {
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
            sendEmail(response[0].document_uri, invoice, entity);
          })
        );
      })
      .then(() => {
        updateInvoice(invoiceId, {
          status: "sent",
          sentAt: new Date(),
          paymentStatus: "pending",
        });
      });
  } catch (err) {
    alert(err);
  }
  //   finally {
  //     setIsLoading(false);
  //   }
}
