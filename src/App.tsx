import { useState } from 'react';
import { Image, Button, Card } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const data = localStorage.getItem('loginData')
  const [loginData, setLoginData] = useState(
    data ? JSON.parse(data) : null
  );

  const handleSuccess = async (googleData: any) => {
    const data = {
      name: googleData.profileObj.name,
      email: googleData.profileObj.email,
      picture: googleData.profileObj.imageUrl
    }
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  }

  const handleFailure = (res: any) => {
    alert(JSON.stringify(res));
  }

  const handleLogout = () => {
    localStorage.removeItem('loginData')
    setLoginData(null)
  }

  return (
    <>
      <Card className="text-center m-5" bg='light' text='dark'>
        <Card.Header className='text-uppercase'>React - Login with Google</Card.Header>
        <Card.Body className='m-5'>
          {
            loginData ? (
              <>
                <Card.Text>
                  Hey {loginData.name}, you logged in as
                  | <strong>{loginData.email}</strong>.
                  <Button variant="link" onClick={handleLogout}> Logout </Button>
                </Card.Text>
                <Image src={loginData.picture} alt={loginData.name} roundedCircle />
              </>
            ) : (<GoogleLogin
                clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                buttonText='Sign in with Google'
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy='single_host_origin'
            />)
          }
        </Card.Body>
        <Card.Footer className='text-uppercase p-2 text-end'>
          View source code in
          <Button
            variant='link'
            href="https://github.com/encoreshao/react-google-login"
            className='text-info'
          > Github - Encore Shao </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default App;
