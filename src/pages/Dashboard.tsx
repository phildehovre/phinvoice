import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import InvoiceList from "../components/InvoiceList";
import { useInvoicesByUser } from "../util/db";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const auth = getAuth();
  const navigate = useNavigate();

  const { data, isLoading } = useInvoicesByUser(auth?.currentUser?.uid);

  useEffect(() => {
    !auth.currentUser && navigate("/");
  }, []);
  return (
    <>{data && !isLoading ? <InvoiceList invoiceList={data} /> : <Spinner />}</>
  );
}

export default Dashboard;
