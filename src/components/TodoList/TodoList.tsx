'use client'

import { useState } from 'react'
import { ListItem } from './ListItem'
import { TodoListSkeleton } from './Skeletons'
import { useListData } from './hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const TodoList: React.FC = () => {
  const {
    isAsc,
    filterInput,
    currentDisplayList,
    isLoading,
    handleAddClick,
    handleDelete,
    handleEdit,
    handleCheck,
    handleUndo,
    changeHandler,
    handleSort,
    handleSearch,
  } = useListData()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const renderList = () => {
    if (isLoading || isLoading === null) return <TodoListSkeleton />
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
    <div className="relative bg-white dark:bg-black rounded-lg w-1/2 min-w-[320px] h-fit">
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
    </div>
  )
}
