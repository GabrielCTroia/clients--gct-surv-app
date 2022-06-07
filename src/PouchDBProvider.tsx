import { PropsWithChildren, Suspense, useEffect, useMemo } from "react";
import PouchDB from "pouchdb-browser";
import { Provider } from "use-pouchdb";
import PouchDBFind from "pouchdb-find";

type Props = PropsWithChildren & {
  localDbPath: string;
  remoteDbPath: string;
};

PouchDB.plugin(PouchDBFind);

const HTTPPouch = PouchDB.defaults({
  prefix: "http://localhost:3000/db",
});

export const PouchDBProvider: React.FC<Props> = (props) => {
  const dbs = useMemo(
    () => ({
      localDb: new PouchDB(props.localDbPath),
      remoteDb: new HTTPPouch("surv"),
    }),
    [props.remoteDbPath, props.localDbPath]
  );

  useEffect(() => {
    dbs.localDb.sync(dbs.remoteDb, {
      retry: true,
      live: true,
    });
  }, [dbs]);

  return (
    <Provider
      default="local"
      databases={{
        local: dbs.localDb,
        remote: dbs.remoteDb,
      }}
    >
      <Suspense fallback="loading...">{props.children}</Suspense>
    </Provider>
  );
};
