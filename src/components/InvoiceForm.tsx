import { useForm } from 'react-hook-form'
import './InvoiceForm.scss'
import SelectWrapper from './Select'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setInvoice } from '../util/db';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs'

const schema = yup.object().shape({
    band: yup.string().required('Please select a band'),
    venue: yup.string().required('Please enter a venue'),
    date: yup.date().required('Please enter a date'),
    fee: yup.number().required('Please enter a fee'),
})

function InvoiceForm() {

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ resolver: yupResolver(schema) })

    const auth = getAuth()
    const queryClient = useQueryClient()


    const addInvoice = useMutation({
        mutationFn: (invoice: any) => setInvoice(invoice),
        onSuccess: () => {
            queryClient.invalidateQueries(['invoices'])
        },
    });



    const onSubmit = (data: any) => {
        console.log(data)
        const invoice = {
            ...data, 
            invoiceId: uuidv4(),
            userId: auth?.currentUser?.uid,
            createdAt: dayjs(),
        }
        addInvoice.mutateAsync(invoice).then((res) => {
            console.log(res)
        }).catch(err => alert(err));
        reset()
    };


    const onOptionClick = async (label: 'band' | 'venue' | 'fee', value: string) => {
        try {
            setValue(label, value);
            // await handleSubmit(onSubmit)();
            console.log('then');
        } catch (error) {
            // handle error
            console.log(error);
        }
    };

  return (
    <div className='invoice-ctn'>
        <h1>New invoice</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='invoice_form'>
            <label htmlFor="invoice" />
            <label>Band
                {errors?.band && <p className='invoice_form-error'>{errors?.band?.message}</p>}
            </label>
            <SelectWrapper items={
                [
                    {label: 'band1', value: 'band1'},
                    {label: 'band2', value: 'band2'},
                    {label: 'band3', value: 'band3'},
                    {label: 'band4', value: 'band4'},
            ]
                } 
                onOptionClick={onOptionClick}
                {...register('band')}
                label='band'
                />
            <label>Venue
                {errors?.venue && <p className='invoice_form-error'>{errors?.venue?.message}</p>}
            </label>
            <input type='text'{...register('venue')}/>
            <label>Date
                {errors?.date && <p className='invoice_form-error'>{errors?.date?.message}</p>}
            </label>
            <input  type='date'{...register('date')}/>
            <label>Fee
               {errors?.fee &&  <p className='invoice_form-error'>{errors?.fee?.message}</p>}
            </label>
            <input type='number'{...register('fee')}/>
            <button type='submit'>Submit</button>
            
        </form>
    </div>
  )

  
}



export default InvoiceForm