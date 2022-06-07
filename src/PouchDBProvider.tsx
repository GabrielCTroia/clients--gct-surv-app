import { PropsWithChildren, Suspense, useMemo } from "react";
// import { PouchDB } from "react-pouchdb";
import PouchDB from "pouchdb-browser";
import { Provider } from "use-pouchdb";
import PouchDBFind from "pouchdb-find";

type Props = PropsWithChildren & {
  localDbPath: string;
  remoteDbPath: string;
};

PouchDB.plugin(PouchDBFind);

export const PouchDBProvider: React.FC<Props> = (props) => {
  const { localDb, remoteDb } = useMemo(
    () => ({
      localDb: new PouchDB(props.localDbPath),
      remoteDb: new PouchDB(props.remoteDbPath, {
        auth: {
          username: "couchdb",
          password: "7QAC1OGXvrZvHMZb",
        },
      }),
    }),
    [props.remoteDbPath, props.localDbPath]
  );

  return (
    <Provider
      default="local"
      databases={{
        local: localDb,
        remote: remoteDb,
      }}
    >
      <Suspense fallback="loading...">{props.children}</Suspense>
    </Provider>
  );
};
