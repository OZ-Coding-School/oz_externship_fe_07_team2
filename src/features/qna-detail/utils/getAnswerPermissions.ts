type GetAnswerPermissionsParams = {
  currentUserId: number | null
  questionAuthorId: number
  answerAuthorId: number
}

export function getAnswerPermissions({
  currentUserId,
  questionAuthorId,
  answerAuthorId,
}: GetAnswerPermissionsParams) {
  const isLoggedIn = currentUserId !== null
  const isQuestionAuthor = currentUserId === questionAuthorId
  const isAnswerAuthor = currentUserId === answerAuthorId

  return {
    isLoggedIn,
    isQuestionAuthor,
    isAnswerAuthor,
    canAdopt: isLoggedIn && isQuestionAuthor,
    canEdit: isLoggedIn && isAnswerAuthor,
    canDelete: isLoggedIn && isAnswerAuthor,
  }
}
