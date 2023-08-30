export default function Map({
  location,
  className,
}: {
  location: {
    latitude: number
    longitude: number
  }
  className?: string
}) {
  return (
    <div className={className}>
      <div className="p-4">{JSON.stringify(location)}</div>
    </div>
  )
}
