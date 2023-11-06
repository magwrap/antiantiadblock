import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState(
    "https://youtu.be/RwCqW4VmtTQ?si=9nCrN05GWVEQp65S"
  );
  const [searchUrl, setSearchUrl] = useState("");

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    console.log(text);
    setUrl(text);
  };

  const loadVideo = () => {
    let urlSplitted: string[];
    if (url.includes("watch")) {
      urlSplitted = url.split("="); // for links like https://www.youtube.com/watch?v=GdkBUdxWJjQ
      console.log(urlSplitted);

      //GdkBUdxWJjQ
    } else {
      urlSplitted = url.split("/"); // for links like https://youtu.be/GdkBUdxWJjQ
    }

    // console.log(
    //   "returned link: ",
    //   "https://www.youtube.com/embed/" + urlSplitted[urlSplitted.length - 1]
    // );

    setSearchUrl(
      "https://www.youtube.com/embed/" + urlSplitted[urlSplitted.length - 1]
    );
  };
  return (
    <>
      <div className="p-3 bg-slate-600  w-full md:w-auto h-auto">
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col w-3/5 justify-center">
            <div>
              <label className="flex w-full items-center text-lg text-center font-bold justify-center">
                Paste youtube video url
                <input
                  className="font-bold text-sm m-5 w-96 p-2 rounded-md"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button
                  title="paste"
                  className="hover:bg-slate-500 p-1 items-center flex justify-center rounded-md"
                  onClick={pasteFromClipboard}>
                  <img src="src/assets/paste.png" className="w-5" />
                </button>
              </label>
            </div>
            <button
              className="border-1 bg-sky-300 row rounded-lg py-2"
              onClick={loadVideo}>
              Play
            </button>
          </div>

          {searchUrl.length ? (
            <iframe
              className="m-5 w-full h-4/5"
              style={{
                height: "80vh",
              }}
              src={searchUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen></iframe>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
