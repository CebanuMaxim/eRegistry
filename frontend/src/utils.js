export const showAlert = (message, variant = "success", seconds = 1000) => {
  setAlert({
    show: true,
    message,
    variant,
  })

  setTimeout(() => {
    setAlert({
      show: false,
      message: "",
      variant: "success",
    })
  }, seconds)
}
