import { useState, useEffect, useCallback, useMemo, ChangeEvent, useRef } from 'react'
import { ListItem } from './type'

// 模擬 API 調用
const listApi = async (): Promise<ListItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, content: 'Hi there', editable: false, checked: false, timestamp: 1719147588991 },
        {
          id: 2,
          content: 'long press me can edit item',
          editable: false,
          checked: false,
          timestamp: 1719147588992,
        },
        {
          id: 3,
          content: 'Press "Toggle delete" button will show delete buttons~',
          editable: false,
          checked: false,
          timestamp: 1719147588993,
        },
        {
          id: 4,
          content: 'Undo button can recover at most 20 items which recently been deleted...',
          editable: false,
          checked: false,
          timestamp: 1719147588994,
        },
        {
          id: 5,
          content: 'the recover item will back to the order it was',
          editable: false,
          checked: false,
          timestamp: 1719147588995,
        },
      ])
    }, 500)
  })
}

export const useListData = () => {
  const [listData, setListData] = useState<ListItem[]>([])
  const [previousItems, setPreviousItems] = useState<ListItem[]>([])
  const [isAsc, setIsAsc] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
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
    const fetchData = async () => {
      setIsLoading(true)
      const data = await listApi()
      setListData(data)
      idSet.current = new Set(data.map((item) => item.id))
      setIsLoading(false)
    }
    fetchData()
  }, [])

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
    isLoading,
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
