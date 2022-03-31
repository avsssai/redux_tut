import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

const TimeAgo = ({ date }) => {
  let timeAgo = ''
  if (date) {
    timeAgo = formatDistanceToNow(parseISO(date))
    timeAgo = timeAgo + ' ago'
  }

  return (
    <span title={date}>
      &nbsp;<i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo
