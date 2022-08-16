const preventDefault = (e) => e.preventDefault()

const handleMounting = () => {
  document.addEventListener('gesturestart', preventDefault)
  document.addEventListener('gesturechange', preventDefault)
  return () => {
    document.removeEventListener('gesturestart', preventDefault)
    document.removeEventListener('gesturechange', preventDefault)
  }
}

export default handleMounting;
