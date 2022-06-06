import { useState } from "react";
import { useDB, useFind } from "react-pouchdb";
import { AsyncResultWrapper } from "ts-async-results";
import { Form } from "./components/Form";
import { useCurrentLocation } from "./hooks";
import './Main.scss';

type Props = {};

type Model = {
  name: string;
  email: string;
  lat: string;
  lng: string;
};

export const Main: React.FC<Props> = (props) => {
  const db = useDB();

  const docs = useFind<Model>({
    selector: {
      timestamp: { $gte: null },
      // completed: filterByCompletedField[filter]
    },
    sort: ["timestamp"],
  });

  const getCurrentLocation = useCurrentLocation();

  const [loadingLocation, setLoadingLocation] = useState(false);

  return (
    <div className="main-container">
      {docs && (
        <div>
          All Docs
          {docs?.map((doc: Model) => (
            <div>
              {doc.name}, {doc.email}, {doc.lat}/{doc.lng}
            </div>
          ))}
        </div>
      )}

      <Form<Model>
        key={docs?.length} // Reset the form each time a new item gets added
        onSubmit={(model) =>
          new AsyncResultWrapper(async () =>
            db.post({ ...model, timestamp: Date.now() })
          )
            .map(() => undefined)
            .mapErr(() => ({} as any))
        }
        render={(p) => (
          <>
            <div>
              <label>Name</label>
              <input
                onChange={(e) => p.onChange("name", e.currentTarget.value)}
                defaultValue={p.model.name}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                onChange={(e) => p.onChange("email", e.currentTarget.value)}
                defaultValue={p.model.email}
              />
            </div>

            <div>
              <label>Location</label>

              {p.model.lat && p.model.lng && (
                <span>
                  Lat/Lng: {p.model.lat}, {p.model.lng}
                </span>
              )}
              <button
                onClick={() => {
                  setLoadingLocation(true);

                  getCurrentLocation()
                    .then((l) => {
                      p.onChange("lat", String(l.coords.latitude));
                      p.onChange("lng", String(l.coords.longitude));
                    })
                    .finally(() => {
                      setLoadingLocation(false);
                    });
                }}
              >
                {loadingLocation ? `Loading...` : `Get Location`}
              </button>
            </div>

            <button onClick={p.submit} disabled={!p.canSubmit}>
              Submit
            </button>
          </>
        )}
      />
    </div>
  );
};
