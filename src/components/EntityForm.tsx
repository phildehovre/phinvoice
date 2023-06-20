import { useForm } from 'react-hook-form'
import './Form.scss'
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setEntity } from '../util/db';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';

const schema = yup.object().shape({
  name: yup.string().required('Please enter a name'),
  email: yup.string().email().required('Please enter a valid e-mail address'),
  address: yup.string().required('Please enter a valid address'),
  postcode: yup.string().required('Please enter a valid postcode'),
})

function EntityForm() {
const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

    const [user] = useAuthState(getAuth())
    const queryClient = useQueryClient()
    const navigate = useNavigate()


    const addEntity = useMutation({
        mutationFn: (entity: any) => setEntity(entity),
        onSuccess: () => {
            queryClient.invalidateQueries(['entities'])
        },
    });

    const onSubmit = (data: any) => {
        console.log('Submitting ',data)
        const entity = {
            ...data, 
            id: uuidv4(),
            userId: user?.uid,
            createdAt: new Date(),
        }
        addEntity.mutateAsync(entity).then((res) => {
            navigate('/new/invoice')
        }).catch(err => alert(err));
        reset()
    };
  return (
    <div className='form-ctn'>
        <Link to='/dashboard'> Back to list</Link>
        <h1>New entity</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <label htmlFor="entity" />
            <label>Name
                {errors?.name && <p className='form-error'>{errors?.name?.message}</p>}
            </label>
            <input className='form-input' type='text'{...register('name')}/>
            <label>E-mail address
                {errors?.email && <p className='form-error'>{errors?.email?.message}</p>}
            </label>
            <input className='form-input' type='text'{...register('email')}/>
            <label>Address
               {errors?.address &&  <p className='form-error'>{errors?.address?.message}</p>}
            </label>
            <input className='form-input' type='text'{...register('address')}/>
            <label>Postcode
                {errors?.postcode && <p className='form-error'>{errors?.postcode?.message}</p>}
            </label>
            <input className='form-input'  type='postcode'{...register('postcode')}/>
            <button type='submit'>Submit</button>
            
        </form>
    </div>
  )
}

export default EntityForm