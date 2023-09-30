import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setInvoice } from "../util/db";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { _omit } from "lodash";
import {
  faAngleDoubleLeft,
  faClose,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Form.scss";
import { v4 as uuidv4 } from "uuid";

interface ItemisedInvoice {
  additionalInfo: string;
  date: Date;
  entity: string;
  item1: string;
  fee1: number;
  item2: string;
  fee2: number;
  items: { [key: string]: { label: string; fee: number } };
}

// TODO convert items to array of objects with index and destructure in emailsender/pdfgenerator

// import SelectWrapper from "./Select";
const schema = yup
  .object()
  .shape({
    entity: yup.string().required("Please enter an e-mail address"),
    date: yup.date().required("Please enter a date"),
    // fee: yup.number().required("Please enter a fee"),
    additionalInfo: yup.string(),
  })
  .test("dynamicItems", "Please fill every item and fee field", (values) => {
    // Get the total number of items
    const numItems = Object.keys(values).filter((key) =>
      key.startsWith("item")
    ).length;

    for (let i = 1; i <= numItems; i++) {
      const itemLabel = `item${i}`;
      const feeLabel = `fee${i}`;

      if (!values[itemLabel] || !values[feeLabel]) {
        return false; // At least one item or fee is missing
      }
    }

    return true;
  });

function ItemisedInvoiceForm(props: any) {
  const [items, setItems] = useState<{
    [key: string]: { label: string; fee: number };
  }>({ item1: { label: "", fee: 0 } });
  const [displayCloseBtn, setDisplayCloseBtn] = useState<string | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const auth = getAuth();
  const [user] = useAuthState(auth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addInvoice = useMutation({
    mutationFn: (invoice: any) => setInvoice(invoice),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });

  const onSubmit = (data: any) => {
    const invoiceId = uuidv4();
    const invoice = {
      ...data,
      invoiceId: invoiceId,
      userId: user?.uid,
      createdAt: new Date(),
    };
    addInvoice
      .mutateAsync(invoice)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["invoices", invoiceId] });
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => alert(err));
    reset();
  };

  //   console.log(items);
  const renderItemFields = () => {
    return Object.keys(items).map((item) => {
      const itemObject = items[item];
      console.log(itemObject);
      return (
        <div
          key={item}
          className="form_item-ctn"
          onMouseEnter={() => setDisplayCloseBtn(itemObject.label)}
          onMouseLeave={() => setDisplayCloseBtn("")}
        >
          <label>
            {item}
            <input
              autoComplete="off"
              className="form-input"
              type="text"
              {...register(item)} // Use items.${index}.item for correct naming
              value={itemObject.label} // Use this line to set initial value
              onChange={(e) => {
                const newValue = e.target.value;
                setItems((prevItems) => {
                  const newItems = { ...prevItems };
                  newItems[item].label = newValue;
                  return newItems;
                });
              }}
            />
          </label>
          <label>
            fee{item.split("").pop()}
            <input
              autoComplete="off"
              className="form-input"
              type="number"
              {...register(`fee${item.split("").pop()}`)} // Use items.${index}.fee for correct naming
              value={itemObject.fee} // Use this line to set initial value
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setItems((prevItems) => {
                  const newItems = { ...prevItems };
                  newItems[item].fee = newValue;
                  return newItems;
                });
              }}
            />
          </label>
          <div id="remove_item-btn">
            <FontAwesomeIcon
              icon={faClose}
              style={{
                display: `${
                  displayCloseBtn === itemObject.label ? "flex" : "none"
                }`,
                backgroundColor: "tomato",
                padding: ".4em",
                margin: ".4em",
                borderRadius: "6px",
              }}
              onClick={() => {
                setItems((prevItems) => {
                  const newItems = { ...prevItems };
                  if (Object.keys(newItems).length > 1) {
                    delete newItems[Object.keys(items).pop() as string];
                  }
                  return newItems;
                });
              }}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div className="form-ctn">
      <div className="header-ctn">
        <Link className="link-ctn" to="/dashboard">
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Link>
        <h1>New invoice</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="invoice" />
        <label>
          Band
          {errors?.entity && (
            <p className="form-error">{errors?.entity?.message}</p>
          )}
          Entity
          {/* {errors?.items && (
              <p className="form-error">{errors?.venue?.message}</p>
            )} */}
          <input
            autoComplete="off"
            className="form-input"
            type="text"
            {...register(`entity`)}
          />
        </label>
        {renderItemFields()}
        <FontAwesomeIcon
          icon={faPlus}
          style={{
            backgroundColor: "dodgerblue",
            padding: "1em",
            borderRadius: "16px",
            cursor: "pointer",
          }}
          onClick={() => {
            setItems((prevItems) => {
              return {
                ...prevItems,
                [`item${Object.keys(prevItems).length + 1}`]: {
                  label: "",
                  fee: 0,
                },
              };
            });
          }}
        />
        <label>
          Date
          {errors?.date && (
            <p className="form-error">{errors?.date?.message}</p>
          )}
        </label>
        <input
          autoComplete="off"
          className="form-input"
          type="date"
          {...register("date")}
        />
        <label>Additional information</label>
        <textarea
          autoComplete="off"
          className="form-input"
          {...register("additionalInfo")}
          rows={5}
        />
        <button className="button-ctn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ItemisedInvoiceForm;
