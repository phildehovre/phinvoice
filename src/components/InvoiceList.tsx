import { Link } from "react-router-dom";
import { Invoice } from "../types";
import InvoiceItem from "./InvoiceItem";
import "./InvoiceList.scss";
import { useEntitiesByUser } from "../util/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function InvoiceList(props: any) {
  const [user] = useAuthState(getAuth());

  const { invoiceList } = props;
  const { data: entities } = useEntitiesByUser(user?.uid);

  return (
    <div className="invoice_list-ctn">
      <div className="header-ctn">
        <h1>Invoices</h1>
        <Link className="link-ctn" to="/new/invoice">
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </Link>
      </div>
      {invoiceList?.map((invoice: Invoice) => {
        const entity = entities?.find(
          (entity) => entity.id === invoice.entity.split("_")[0]
        );
        return (
          <InvoiceItem invoice={invoice} key={invoice.id} entity={entity} />
        );
      })}
    </div>
  );
}

export default InvoiceList;
