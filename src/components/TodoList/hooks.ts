import { useState, useEffect, useCallback, useMemo, ChangeEvent, useRef } from 'react'
import { ListItem } from './type'

export const useListData = ({ todos }: { todos: ListItem[] }) => {
  const [listData, setListData] = useState<ListItem[]>(todos)
  const [previousItems, setPreviousItems] = useState<ListItem[]>([])
  const [isAsc, setIsAsc] = useState<boolean>(true)
  const [filterInput, setFilterInput] = useState<string>('')

  const filteredList = useMemo(() => {
    if (filterInput === '') return listData
    return listData.filter((item) => item.content.includes(filterInput))
  }, [filterInput, listData])

  const currentDisplayList = useMemo(() => {
    return filterInput !== '' ? filteredList : listData
  }, [filterInput, filteredList, listData])

  const idSet = useRef(new Set<number>())

  useEffect(() => {
    idSet.current = new Set(todos.map((item) => item.id))
  }, [todos])

  const generateUniqueId = useCallback((): number => {
    const newId = Math.random() * 100
    if (idSet.current.has(newId)) return generateUniqueId()
    return newId
  }, [])

  const addPreviousItems = useCallback((removedItem: ListItem) => {
    setPreviousItems((prev) => {
      const newPreviousItems = [...prev, removedItem]
      if (newPreviousItems.length > 19) newPreviousItems.shift()
      return newPreviousItems
    })
  }, [])

  const handleAddClick = useCallback(() => {
    const newItem: ListItem = {
      id: generateUniqueId(),
      content: '',
      editable: true,
      checked: false,
      timestamp: Date.now(),
    }
    setListData((prev) => [newItem, ...prev])
  }, [generateUniqueId])

  const handleDelete = useCallback(
    (id: number) => {
      setListData((prev) => {
        const newListData = prev.filter((item) => item.id !== id)
        const removedItem = prev.find((item) => item.id === id)
        if (removedItem) addPreviousItems({ ...removedItem, index: prev.indexOf(removedItem) })
        return newListData
      })
    },
    [addPreviousItems]
  )

  const handleEdit = useCallback((item: ListItem, editable: boolean) => {
    setListData((prev) => prev.map((i) => (i.id === item.id ? { ...i, editable } : i)))
  }, [])

  const handleCheck = useCallback((item: ListItem) => {
    setListData((prev) => prev.map((i) => (i.id === item.id ? { ...i, checked: !i.checked } : i)))
  }, [])

  const handleUndo = useCallback(() => {
    if (!previousItems.length) return
    setListData((prev) => {
      const recoverItem = previousItems.pop()
      if (!recoverItem) return prev

      const newList = [...prev]
      if (typeof recoverItem.index === 'number') {
        newList.splice(recoverItem.index, 0, recoverItem)
      } else {
        newList.push(recoverItem)
      }
      return newList
    })
  }, [previousItems])

  const changeHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>, item: ListItem) => {
    const { name, value } = e.target
    setListData((prev) => prev.map((i) => (i.id === item.id ? { ...i, [name]: value } : i)))
  }, [])

  const handleSort = useCallback(() => {
    setIsAsc((prev) => {
      setListData((prevListData) =>
        prevListData.toSorted((a, b) =>
          prev ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
        )
      )
      return !prev
    })
  }, [])

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value)
  }, [])

  return {
    listData,
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
  }
}
