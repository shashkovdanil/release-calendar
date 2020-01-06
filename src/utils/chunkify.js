export default function chunkify(array, chunkSize) {
  const chunks = Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, i) => {
      const start = chunkSize * i

      const chunk = array.slice(start, start + chunkSize)

      if (chunk.length < chunkSize)
        return [...chunk, ...Array.from({ length: chunkSize - chunk.length })]

      return array.slice(start, start + chunkSize)
    },
  )

  return chunks
}
