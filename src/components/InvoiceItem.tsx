import { Invoice } from "../types";
import "./InvoiceItem.scss";
import dayjs from "dayjs";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import "./Checkbox.scss";
import EmailSender from "./EmailSender";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoice, updateInvoice } from "../util/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronUp,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import UpdatableInput from "./UpdatableInput";
import Modal from "./Modal";

function InvoiceItem(props: { invoice: Invoice; entity?: any }) {
  const queryClient = useQueryClient();
  const { invoice, entity } = props;
  const [isChecked, setIsChecked] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const date = dayjs(new Date(invoice.date.seconds * 1000)).format(
    "ddd DD-MMM-YYYY"
  );

  const updateInvoiceMutation = useMutation(
    (data: any) => {
      const { id } = data; // Extract id and status from the data object if necessary
      return updateInvoice(id, data); // Call the updateInvoice function with the appropriate arguments
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["invoices"]);
      },
    }
  );
  const deleteInvoiceMutation = useMutation((id: string) => {
    return deleteInvoice(id);
  });

  const onDelete = () => {
    deleteInvoiceMutation
      .mutateAsync(invoice.invoiceId)
      .then(() => queryClient.invalidateQueries(["invoices"]));
  };

  const onSend = () => {
    updateInvoiceMutation.mutate({
      id: invoice.id,
      status: "sent",
      sentAt: new Date(),
      paymentStatus: "pending",
    });
  };
  const handleCloseDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsSelected(false);
  };

  const renderConfirmationModal = () => {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onSave={onDelete}
        children={
          <>
            <h3>Are you sure you want to delete this invoice?</h3>
            {invoice.venue}
            <br />
            {date}
          </>
        }
      />
    );
  };

  return (
    <div
      key={invoice.id}
      className={`invoice_item-ctn ${isSelected ? "open" : ""}`}
      onClick={() => {
        setIsSelected(true);
      }}
    >
      <div className={`invoice_item-header ${isSelected ? "open" : ""}`}>
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
        <div
          className="invoice_item-column"
          onClick={(e) => e.stopPropagation()}
        >
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
          {isChecked && invoice.status !== "sent" && (
            <EmailSender
              invoice={{ ...invoice, date }}
              entity={entity}
              isChecked={isChecked}
              onSend={() => {
                onSend();
              }}
            />
          )}
          {invoice.status === "sent" && (
            <FontAwesomeIcon
              icon={faCheck}
              size="lg"
              color="lightgreen"
              onClick={onDelete}
            />
          )}
        </div>
      </div>
      {isSelected && (
        <div className={`invoice_item-detail-ctn `}>
          <div className="invoice_item-detail-content">
            <p>Performance date: {date}</p>
            <p>
              Sent on:{" "}
              {dayjs(new Date(invoice.sentAt?.seconds * 1000)).format(
                "ddd DD-MMM-YYYY"
              )}
            </p>
            <UpdatableInput
              label="additionalInfo"
              ressourceType="invoices"
              ressourceId={invoice.id}
              value={invoice.additionalInfo}
            />
            <button
              className="btn delete wire"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
            {renderConfirmationModal()}
          </div>
          <div onClick={handleCloseDetail} className="invoice_item-close">
            <FontAwesomeIcon icon={faChevronUp} size="lg" />
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceItem;
