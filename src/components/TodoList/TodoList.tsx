'use client'

import { useState } from 'react'
import { ListItem } from './ListItem'
import { TodoListSkeleton } from './Skeletons'
import { useListData } from './hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ListItem as ListItemType } from '@/components/TodoList/type'

interface TodoListProps {
  todos: ListItemType[]
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const {
    isAsc,
    filterInput,
    currentDisplayList,
    handleAddClick,
    handleDelete,
    handleEdit,
    handleCheck,
    handleUndo,
    changeHandler,
    handleSort,
    handleSearch,
  } = useListData({ todos })
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const renderList = () => {
    if (currentDisplayList.length === 0)
      return <p className="text-center text-2xl font-bold">Nothing to show</p>
    return currentDisplayList.map((item) => (
      <ListItem
        key={item.id}
        item={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCheck={handleCheck}
        onChange={changeHandler}
        isDeleting={isDeleting}
      />
    ))
  }

  return (
    <>
      <Input
        className="mb-3"
        type="text"
        placeholder="Search"
        value={filterInput}
        onChange={handleSearch}
      />
      <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-2 rounded-t-lg p-5 ">
        <Button variant="secondary" onClick={handleAddClick}>
          Add
        </Button>
        <Button variant="secondary" onClick={() => setIsDeleting(!isDeleting)}>
          Toggle Delete
        </Button>
        <Button variant="secondary" onClick={handleSort}>{`Sort  ${isAsc ? '⬆️' : '⬇️'}`}</Button>
        <Button variant="secondary" onClick={handleUndo}>
          Undo
        </Button>
      </div>
      <ul className="list">{renderList()}</ul>
    </>
  )
}
