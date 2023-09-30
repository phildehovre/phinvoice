import { useNavigate } from "react-router-dom";
import { Invoice } from "../types";
import InvoiceItem from "./InvoiceItem";
import "./InvoiceList.scss";
import { useEntitiesByUser } from "../util/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "./Modal";
import ItemisedInvoiceItem from "./ItemisedInvoiceItem";

function InvoiceList(props: any) {
  const [user] = useAuthState(getAuth());

  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("music" as string);

  const { invoiceList } = props;
  const { data: entities } = useEntitiesByUser(user?.uid);

  const [invoiceListSorted, setInvoiceListSorted] = useState<Invoice[] | null>(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (invoiceList) {
      const sorted = invoiceList?.sort((a: Invoice, b: Invoice) => {
        return dayjs(a.date.seconds).isAfter(dayjs(b.date.seconds)) ? -1 : 1;
      });
      setInvoiceListSorted(sorted);
    }
  });

  return (
    <div className="invoice_list-ctn">
      <div className="header-ctn">
        <h1>Invoices</h1>
        <button
          className="link-ctn"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      </div>
      {invoiceListSorted?.map((invoice: Invoice) => {
        const entity = entities?.find(
          (entity) => entity.id === invoice.entity.split("_")[0]
        );
        if (invoice.type === "services") {
          return (
            <ItemisedInvoiceItem
              invoice={invoice}
              key={invoice.id}
              entity={entity}
            />
          );
        }
        return (
          <InvoiceItem invoice={invoice} key={invoice.id} entity={entity} />
        );
      })}
      <Modal
        isOpen={showModal}
        onSave={() => navigate(`/new/invoice/${selectedType}`)}
        onClose={() => setShowModal(false)}
      >
        <h1>Type: </h1>
        <span className="type-ctn">
          <button
            className={`type-btn ${selectedType === "music" ? "selected" : ""}`}
            onClick={() => setSelectedType("music")}
          >
            Music
          </button>
          <button
            className={`type-btn ${
              selectedType === "services" ? "selected" : ""
            }`}
            onClick={() => setSelectedType("services")}
          >
            Services
          </button>
        </span>
      </Modal>
    </div>
  );
}

export default InvoiceList;
