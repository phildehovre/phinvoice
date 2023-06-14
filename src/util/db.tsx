import db from "../config/firebase";
import {
    doc, setDoc, updateDoc, arrayUnion, getFirestore,
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
} from 'firebase/firestore';
import {
    useQuery,
    hashQueryKey,
    QueryClient,
    QueryClientProvider as QueryClientProviderBase,
} from "@tanstack/react-query";


const client = new QueryClient();

export const getInvoices = async () => {
    const q = query(collection(db, "invoices"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}


export function useInvoices(uid: string | undefined) {
    return useQuery(
        ['invoices'],
        () => getInvoices(),
        {
            enabled: !!uid
        }
    );
};

export async function setInvoice(invoice: any) {
    return setDoc(doc(db, "invoices", invoice.invoiceId), invoice);
}

export function deleteBusiness(businessId: string) {
    return deleteDoc(doc(db, "businesses", businessId));
}

export function QueryClientProvider(props: { children: React.ReactNode }) {
    return (
        <QueryClientProviderBase client={client}>
            {props.children}
        </QueryClientProviderBase>
    );
}

