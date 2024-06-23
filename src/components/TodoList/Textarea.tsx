import { useEffect, useRef } from 'react'
import { Textarea as ShadTextarea } from '@/components/ui/textarea'

interface TextareaProps {
  inputProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>
}

export const Textarea: React.FC<TextareaProps> = ({ inputProps }) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!inputProps.readOnly) ref.current?.focus()
  }, [inputProps.readOnly])

  return <ShadTextarea ref={ref} {...inputProps} />
}
