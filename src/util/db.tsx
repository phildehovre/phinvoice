import db from "../config/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  getDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  deleteField,
  arrayRemove,
  getDocs,
} from "firebase/firestore";
import {
  useQuery,
  hashQueryKey,
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

export const updateInvoice = async (invoiceId: string, status: string) => {
  const invoiceRef = doc(db, "invoices", invoiceId);
  await updateDoc(invoiceRef, { status });
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

export function deleteBusiness(businessId: string) {
  return deleteDoc(doc(db, "businesses", businessId));
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
