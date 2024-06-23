import { Skeleton } from '@/components/ui/skeleton'
export const TodoListSkeleton: React.FC = () => {
  const config = new Array(5).fill({
    container: 'flex items-center gap-2 mb-3',
    contentLeft: 'w-6 h-6',
    contentRight: 'w-full h-20',
  })

  return (
    <div>
      {config.map((item, index) => {
        return (
          <div key={index} className={item.container}>
            <Skeleton className={item.contentLeft} />
            <Skeleton className={item.contentRight} />
          </div>
        )
      })}
    </div>
  )
}
