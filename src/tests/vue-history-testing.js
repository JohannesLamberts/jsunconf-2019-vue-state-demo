/* eslint-disable import/prefer-default-export */

export function serializeEvent(event, depth) {
  const items = [
    '',
    `${event.namespace}.${event.callId}(${JSON.parse(event.payload)
      .map(el => (typeof el === 'string' ? `'${el}'` : JSON.stringify(el)))
      .join(', ')})`,
  ]

  if (event.error) {
    items.push(
      '~~ errors with',
      event.error.message,
    )
  }

  if (event.subEvents.length) {
    items.push(
      ...event.subEvents.map(item => serializeEvent(item, depth + 1)),
    )
  }
  return items
    .map(el => `${'  '.repeat(depth)}${el}`)
    .join('\n')
}

export function serializeHistory(history) {
  return `${history.items
    .filter(item => !item.caller)
    .map(item => serializeEvent(item, 0))
    .join('\n\n')}\n`
}
