import { ChangeEvent, useMemo, useCallback } from 'react'
import { ListItem as ListItemType } from './type'
import { Textarea } from './Textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { useLongPress } from 'react-use'

interface ListItemProps {
  item: ListItemType
  isDeleting: boolean
  onEdit: (item: ListItemType, editable: boolean) => void
  onDelete: (id: number) => void
  onCheck: (item: ListItemType) => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>, item: ListItemType) => void
}

export const ListItem: React.FC<ListItemProps> = ({
  item,
  isDeleting,
  onEdit,
  onDelete,
  onCheck,
  onChange,
}) => {
  const memoizedInputProps = useMemo(
    () => ({
      className: clsx(
        item.checked ? 'line-through' : '',
        'w-full max-w-full border-0 p-2 overflow-visible cursor-text focus:outline-none read-only:cursor-pointer read-only:overflow-hidden read-only:bg-yellow-200/20 read-only:rounded-md'
      ),
      name: 'content',
      onChange: (e: ChangeEvent<HTMLTextAreaElement>) => onChange(e, item),
      onBlur: () => onEdit(item, false),
      value: item.content,
      readOnly: !item.editable,
      placeholder: 'Things to be done...',
    }),
    [item, onChange, onEdit]
  )

  const onLongPress = useCallback(() => onEdit(item, true), [item, onEdit])

  const defaultOptions = {
    isPreventDefault: true,
    delay: 300,
  }
  const longPressEvent = useLongPress(onLongPress, defaultOptions)

  return (
    <li className="border-t border-gray-800/30 p-2.5 w-full min-h-[70px] flex items-center justify-evenly">
      <Checkbox className="w-5 h-5" checked={item.checked} onClick={() => onCheck(item)} />
      <div className="w-[60%] lg:w-[85%]" {...longPressEvent}>
        <Textarea inputProps={memoizedInputProps} />
      </div>
      <Button
        className={clsx(isDeleting ? 'block' : 'hidden', 'w-6 h-6')}
        variant="destructive"
        size={'icon'}
        onClick={() => onDelete(item.id)}
      >
        X
      </Button>
    </li>
  )
}
