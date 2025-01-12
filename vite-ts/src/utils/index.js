export const isUserAdmin = () => {
  const userInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null
  return parsedUserInfo?.isAdmin
}
