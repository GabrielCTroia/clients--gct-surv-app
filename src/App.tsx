import "./App.css";
import { PouchDBProvider } from "./PouchDBProvider";
import { Main } from "./Main";

function App() {
  return (
    <div className="App">
      <PouchDBProvider localDbPath="surv" remoteDbPath="http://localhost:5984/surv">
        <Main />
      </PouchDBProvider>
    </div>
  );
}

export default App;
