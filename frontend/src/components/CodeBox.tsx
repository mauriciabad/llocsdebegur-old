import classNames from 'classnames'

export default function CodeBox<T>({
  data,
  className,
}: {
  data: T
  className?: string
}) {
  return (
    <pre
      className={classNames(
        className,
        'overflow-x-auto rounded-md bg-stone-900 p-4 text-left font-mono text-white'
      )}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}
