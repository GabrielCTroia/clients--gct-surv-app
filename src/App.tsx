import "./App.css";
import { PouchDBProvider } from "./PouchDBProvider";
import { Main } from "./Main";

function App() {
  return (
    <div className="App">
      <PouchDBProvider dbName="surv">
        <Main />
      </PouchDBProvider>
    </div>
  );
}

export default App;
