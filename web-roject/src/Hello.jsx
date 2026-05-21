import './App.css'
function Hello() {
  const isLoggedIn = true; 

  if(isLoggedIn) {
    return <h1>Welcome back, User!</h1>;
  } else {
    return <h1>Please log in to continue.</h1>;
  }
}
export default Hello