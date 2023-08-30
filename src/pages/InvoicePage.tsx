import { useEntitiesByUser } from "../util/db";
import InvoiceForm from "../components/InvoiceForm";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useParams } from "react-router-dom";
import ItemisedInvoiceForm from "../components/ItemisedInvoiceForm";

function InvoicePage() {
  const [user] = useAuthState(getAuth());

  const location = useLocation();
  const type = location.pathname.split("/")[3];

  const {
    data: entityData,
    isLoading: entityIsLoading,
    isError: entityIsError,
  } = useEntitiesByUser(user?.uid);

  return (
    <div className="">
      {type === "music" ? (
        entityData &&
        !entityIsLoading &&
        !entityIsError && <InvoiceForm entities={entityData} />
      ) : (
        <ItemisedInvoiceForm />
      )}
    </div>
  );
}

export default InvoicePage;
