import { useEntitiesByUser } from '../util/db';
import InvoiceForm from '../components/InvoiceForm';
import { getAuth } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth'

function InvoicePage() {


    const [user] = useAuthState(getAuth())

    const {
        data: entityData,
        isLoading: entityIsLoading,
        isError: entityIsError,
    } = useEntitiesByUser(user?.uid);


  return (
    <div className=''>
        {
        entityData && !entityIsLoading && !entityIsError &&
            <InvoiceForm entities={entityData} />
        }
    </div>
  )
}

export default InvoicePage