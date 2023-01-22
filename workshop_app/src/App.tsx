import logo from './logo.svg';
import './App.css';
import { AuthContainer, UserSessionProvider } from './Login';
import { ApplicationBar } from './AppBar';
import { TestComponent } from './TestComponent';




function App() {

  return (
    <AuthContainer>
      <UserSessionProvider.Consumer>
        {session => <>
          <ApplicationBar />
          <div className="App">
            <header className="App-header">
              <TestComponent/>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </>}
      </UserSessionProvider.Consumer>

    </AuthContainer>
  );
}

export default App;
