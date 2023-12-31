import db from "../config/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import {
  useQuery,
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "@tanstack/react-query";

const client = new QueryClient();

// ================== Invoices =======================

export const getInvoices = async () => {
  const q = query(collection(db, "invoices"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export function useInvoices(uid: string | undefined) {
  return useQuery(["invoices"], () => getInvoices(), {
    enabled: !!uid,
  });
}

export const updateInvoice = async (id: string, data: any) => {
  const invoiceRef = doc(db, "invoices", id);
  await updateDoc(invoiceRef, { ...data });
};

export const getInvoicesByUser = async (userId: string | undefined) => {
  const q = query(collection(db, "invoices"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export function useInvoicesByUser(userId: string | undefined) {
  return useQuery(["invoices", userId], () => getInvoicesByUser(userId), {
    enabled: !!userId,
  });
}

export async function setInvoice(invoice: any) {
  return setDoc(doc(db, "invoices", invoice.invoiceId), invoice);
}

export function deleteInvoice(invoiceId: string) {
  return deleteDoc(doc(db, "invoices", invoiceId));
}

//   =============== Entities ========================

export const getEntitiesByUser = async (userId: string | undefined) => {
  const q = query(collection(db, "entities"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export function useEntitiesByUser(userId: string | undefined) {
  return useQuery(["entities", userId], () => getEntitiesByUser(userId), {
    enabled: !!userId,
  });
}

export async function setEntity(entity: any) {
  return setDoc(doc(db, "entities", entity.id), entity);
}

export async function updateEntity(entityId: string, data: any) {
  const entityRef = doc(db, "entities", entityId);
  await updateDoc(entityRef, data);
}

export function deleteEntity(entityId: string) {
  return deleteDoc(doc(db, "entities", entityId));
}

export function QueryClientProvider(props: { children: React.ReactNode }) {
  return (
    <QueryClientProviderBase client={client}>
      {props.children}
    </QueryClientProviderBase>
  );
}
