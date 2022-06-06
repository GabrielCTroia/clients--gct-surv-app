import { PropsWithChildren, Suspense } from "react";
import { PouchDB } from "react-pouchdb";

type Props = PropsWithChildren & {
  dbName: string;
};

export const PouchDBProvider: React.FC<Props> = (props) => {
  return (
    <PouchDB name={props.dbName}>
      <Suspense fallback="loading...">{props.children}</Suspense>
    </PouchDB>
  );
};
