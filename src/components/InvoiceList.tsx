import { Link } from "react-router-dom";
import { Invoice } from "../types";
import InvoiceItem from "./InvoiceItem";
import "./InvoiceList.scss";
import { useEntitiesByUser } from "../util/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

function InvoiceList(props: any) {
  const [user] = useAuthState(getAuth());

  const { invoiceList } = props;
  const { data: entities, isLoading, error } = useEntitiesByUser(user?.uid);

  return (
    <div className="invoice_list-ctn">
      <div>
        <h1> invoices</h1>
        <Link to="/new/invoice">New invoice</Link>
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
