import { useEffect, useState } from "react"

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler) // cancel if value changes
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
