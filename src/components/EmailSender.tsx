import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entity, Invoice } from "../types";
import { generateInvoiceFile } from "../apis/pdfGenerator";

function EmailSender(props: {
  invoice: Invoice;
  entity: Entity;
  onSend: () => void;
  isChecked: boolean;
}) {
  const { invoice, entity, isChecked } = props;

  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <button
          className="send_invoice-btn"
          disabled={!isChecked}
          onClick={() => generateInvoiceFile(invoice, entity)}
        >
          <FontAwesomeIcon icon={faEnvelope} size="lg" color="white" />
        </button>
      </div>
    </>
  );
}

export default EmailSender;
