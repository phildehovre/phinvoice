import { Invoice } from "../types";
import "./InvoiceItem.scss";
import dayjs from "dayjs";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import "./Checkbox.scss";
import EmailSender from "./EmailSender";
// import { useMutation } from "@tanstack/react-query";
// import { updateInvoice } from "../util/db";

function InvoiceItem(props: { invoice: Invoice; entity?: any }) {
  const { invoice, entity } = props;
  const [isChecked, setIsChecked] = React.useState(false);

  const date = dayjs(invoice.date.seconds * 1000).format("DD/MM/YYYY");

  const onSend = () => {
    console.log("update item in db");
  };

  return (
    <div key={invoice.id} className="invoice_item-ctn">
      <div className="invoice_item-column">
        <p>{date}</p>
      </div>
      <div className="invoice_item-column">
        <p>{invoice.entity.split("_")[1]}</p>
      </div>
      <div className="invoice_item-column">
        <p>{invoice.venue}</p>
      </div>
      <div className="invoice_item-column">
        <p>£ {invoice.fee}</p>
      </div>
      <div className="invoice_item-column">
        <Checkbox.Root
          className="CheckboxRoot"
          checked={isChecked}
          onCheckedChange={() => {
            setIsChecked(!isChecked);
          }}
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div className="invoice_item-column">
        {isChecked && (
          <EmailSender
            invoice={{ ...invoice, date }}
            entity={entity}
            isChecked={isChecked}
            onSend={() => {
              onSend();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default InvoiceItem;
