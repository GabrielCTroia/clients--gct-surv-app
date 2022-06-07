import { useState } from "react";
import { AsyncResultWrapper } from "ts-async-results";
import { Form } from "./components/Form";
import { FormInput } from "./components/Form/components/FormInput";
import { useCurrentLocation } from "./hooks";
import { loadFile } from "./lib/loadFile";
import {
  faFont,
  faLocationPin,
  faImage,
  faArrowRight,
  faAt,
} from "@fortawesome/free-solid-svg-icons";
import { usePouch, useFind } from "use-pouchdb";
import { Ok } from "ts-results";

type Props = {};

type Model = {
  _id: string;
  name: string;
  email: string;
  lat: string;
  lng: string;
  image: string;
};

export const Main: React.FC<Props> = () => {
  const db = usePouch();

  const rows = useFind<Model>({
    selector: {
      timestamp: { $gte: null },
    },
    index: {
      fields: ["timestamp"],
    },
    sort: [
      {
        timestamp: "desc",
      },
    ],
  });

  const getCurrentLocation = useCurrentLocation();
  const [loadingLocation, setLoadingLocation] = useState(false);

  return (
    <div className="bg-background-100 w-screen flex flex-col gap-5 justify-center mt-20 mb-20">
      <div className="w-[30rem] m-auto relative">
        <Form<Omit<Model, "_id">>
          key={rows.docs?.length} // Reset the form each time a new item gets added
          onSubmit={(model) =>
            new AsyncResultWrapper(async () =>
              db
                .put({
                  _id: String(Date.now()), // give the document a unique id
                  ...model,
                  timestamp: Date.now(),
                })
                .then(
                  (r) => {
                    console.log("sumit r", r);
                    return new Ok(r);
                  },
                  (e) => {
                    console.log("submitt e", e);
                    return e;
                  }
                )
            )
          }
          render={(p) => (
            <>
              <FormInput
                render={
                  <div>
                    <input
                      className="placeholder:text-black focus:border-0 focus:outline-none"
                      placeholder="Name"
                      onChange={(e) =>
                        p.onChange("name", e.currentTarget.value)
                      }
                      defaultValue={p.model.name}
                    />
                  </div>
                }
                icon={faFont}
              />
              <FormInput
                render={
                  <div>
                    <input
                      className="placeholder:text-black focus:border-0 focus:outline-none"
                      placeholder="Email"
                      onChange={(e) =>
                        p.onChange("email", e.currentTarget.value)
                      }
                      defaultValue={p.model.email}
                    />
                  </div>
                }
                icon={faAt}
              />
              <FormInput
                render={
                  <div className="flex gap-3  focus:border-0 focus:outline-none">
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
                      className="focus:border-0 focus:outline-none"
                    >
                      {loadingLocation ? `Loading...` : `Get Location`}
                    </button>
                    {p.model.lat && p.model.lng && (
                      <span>{`Lat: ${p.model.lat} | Lng: ${p.model.lng}`}</span>
                    )}
                  </div>
                }
                icon={faLocationPin}
              />
              <FormInput
                render={
                  <div>
                    <input
                      className="text-text-400 bg-white file:mr-4 file:border-0 file:text-base file:bg-transparent bg-transparent"
                      type="file"
                      multiple={false}
                      onChange={(e) => {
                        const files = e.target.files;

                        if (!files) {
                          return;
                        }
                        const file = files[0];
                        loadFile(file)
                          .map((loadedFile) => {
                            const value = loadedFile.toString();

                            p.onChange("image", value);
                          })
                          .mapErr((err) => {
                            console.log("error loading file", e);
                          });
                      }}
                    />
                  </div>
                }
                icon={faImage}
              />
              {p.model.image && (
                <div className="w-40 bg-background-100 border-2 border-black font-main mb-10 drop-shadow-6xl">
                  <img src={p.model.image} width="100%" />
                </div>
              )}
              <FormInput
                actionable
                render={
                  <button onClick={p.submit} disabled={!p.canSubmit}>
                    Submit
                  </button>
                }
                icon={faArrowRight}
              />
            </>
          )}
        />
      </div>
      <div className="w-[30rem] m-auto flex flex-col gap-1 justify-start">
        {rows?.docs.length > 0 && (
          <>
            <span className="flex font-bold text-3xl">All Records</span>
            <div className="flex flex-col gap-10 justify-center text-base text-black font-main">
              {rows.docs?.map((row) => {
                const doc = row as unknown as Model;

                return (
                  <div
                    className="flex relative bg-primary-100 pl-5 pt-5 pb-5 "
                    key={doc._id}
                  >
                    <div className="flex flex-col gap-3 border-white border-l-4  justify-center items-start pl-4 pt-5 pb-5">
                      <div>{doc.name}</div>
                      <div>{doc.email}</div>
                      <div>
                        Location: {doc.lat} | {doc.lng}
                      </div>
                    </div>
                    {doc.image && (
                      <div className="absolute drop-shadow-6xl -right-10 w-32 h-32 overflow-hidden">
                        <img src={doc.image} width="100%" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
