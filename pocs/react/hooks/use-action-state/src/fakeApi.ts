export type FeedbackPayload = {
  author: string
  comment: string
}

export type FeedbackEntry = {
  id: string
  author: string
  comment: string
  submittedAt: string
}

export async function submitFeedback(payload: FeedbackPayload): Promise<FeedbackEntry> {
  await new Promise<void>((resolve) => setTimeout(resolve, 1400))

  const author = payload.author.trim()
  const comment = payload.comment.trim()

  if (!author) throw new Error('Author name is required.')
  if (comment.length < 10) throw new Error('Comment must be at least 10 characters.')

  if (Math.random() < 0.4) {
    throw new Error('Server error: failed to persist the entry. Please try again.')
  }

  return {
    id: Math.random().toString(36).slice(2, 10).toUpperCase(),
    author,
    comment,
    submittedAt: new Date().toLocaleTimeString(),
  }
}
