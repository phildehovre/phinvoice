import { useForm } from "react-hook-form";
import "./Form.scss";
import SelectWrapper from "./Select";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setInvoice } from "../util/db";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object().shape({
  entity: yup.string().required("Please select a band"),
  venue: yup.string().required("Please enter a venue"),
  date: yup.date().required("Please enter a date"),
  fee: yup.number().required("Please enter a fee"),
});

function InvoiceForm(props: any) {
  const { entities } = props;

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const regex = new RegExp(`.*${query}.*`, "gi");

  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const auth = getAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length === 0) {
      setData(entities);
    }
    if (query.length > 0) {
      let filteredData = entities?.filter((item: any) =>
        regex.test(item.firstName)
      );
      setData(filteredData);
    }
  }, [query]);

  const addInvoice = useMutation({
    mutationFn: (invoice: any) => setInvoice(invoice),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });

  const onSubmit = (data: any) => {
    console.log("Submitting ", data);
    const invoice = {
      ...data,
      invoiceId: uuidv4(),
      userId: auth?.currentUser?.uid,
      createdAt: new Date(),
    };
    addInvoice
      .mutateAsync(invoice)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => alert(err));
    reset();
  };

  const onOptionClick = async (label: any, value: any) => {
    try {
      setValue(label, value);
      // await handleSubmit(onSubmit)();
      console.log("then");
    } catch (error) {
      console.log(error);
    }
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
        </label>
        <SelectWrapper
          items={entities}
          onOptionClick={onOptionClick}
          {...register("entity")}
          label="entity"
          typeahead={true}
          query={query}
          setQuery={setQuery}
        />

        <label>
          Venue
          {errors?.venue && (
            <p className="form-error">{errors?.venue?.message}</p>
          )}
        </label>
        <input className="form-input" type="text" {...register("venue")} />
        <label>
          Date
          {errors?.date && (
            <p className="form-error">{errors?.date?.message}</p>
          )}
        </label>
        <input className="form-input" type="date" {...register("date")} />
        <label>
          Fee
          {errors?.fee && <p className="form-error">{errors?.fee?.message}</p>}
        </label>
        <input className="form-input" type="number" {...register("fee")} />
        <button className="button-ctn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InvoiceForm;
