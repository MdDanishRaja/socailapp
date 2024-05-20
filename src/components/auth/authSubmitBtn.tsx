"use client"
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'

export default function AuthSubmitBtn({ text }: { text: string }) {
    const {pending} = useFormStatus();
  return (
    <Button className='w-full mt-3' type="submit" disabled={pending}>
        {pending? "Processing": "submit"}
    </Button>
  )
}
