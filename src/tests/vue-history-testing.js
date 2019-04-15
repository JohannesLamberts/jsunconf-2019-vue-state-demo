/* eslint-disable import/prefer-default-export */

function collectItems(item, collector) {
  collector.push(item)
  item.subEvents.slice()
    // .sort((a, b) => b.timestamp - a.timestamp)
    .forEach(subItem => collectItems(subItem, collector))
}

export function serializeHistory(history) {
  const orderedItems = []

  history.items
    .filter(item => !item.caller)
    .forEach((item) => {
      collectItems(item, orderedItems)
    })

  return orderedItems.map(({
    namespace,
    callId,
    payload,
    error,
    caller,
  }, index) => ({
    call: `${namespace}.${callId}`,
    ref: index,
    payload,
    error: error && error.message,
    caller: caller ? {
      ref: orderedItems.indexOf(caller),
      call: `${caller.namespace}.${caller.callId}`,
    } : null,
  }))
}
