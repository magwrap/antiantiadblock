import { useEffect, useState } from "react";
import "./App.css";
import useQueryParam from "./useQueryParams";

function App() {
  const [url, setUrl] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [searchQuery, setSearchQuery] = useQueryParam("search", "");

  useEffect(() => {
    if (searchQuery) {
      loadVideo(undefined, searchQuery);
    }
  }, []);

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    setUrl(text);
  };

  const getVideoCode = (videoUrl: string) => {
    let urlSplitted: string[];

    if (videoUrl.includes("watch")) {
      urlSplitted = videoUrl.split("="); // for links like https://www.youtube.com/watch?v=GdkBUdxWJjQ
    } else {
      urlSplitted = videoUrl.split("/"); // for links like https://youtu.be/GdkBUdxWJjQ
    }

    return urlSplitted[urlSplitted.length - 1];
  };

  const loadVideo = (
    event?: React.MouseEvent<HTMLButtonElement>,
    passedVideoCode?: string
  ) => {
    const videoCode = getVideoCode(url);
    const ytLink =
      "https://www.youtube.com/embed/" +
      (typeof passedVideoCode !== "undefined" ? passedVideoCode : videoCode);
    const openWindow = window.open;
    if (event?.ctrlKey && openWindow !== null) {
      const siteUrl = "https://magwrap.github.io/antiantiadblock?search=";
      // const siteUrl = "http://127.0.0.1:5173/antiantiadblock?search=";
      openWindow(siteUrl + videoCode + "", "_blank")?.focus();
    } else {
      setSearchQuery(
        typeof passedVideoCode !== "undefined" ? passedVideoCode : videoCode
      );
      setSearchUrl(ytLink);
    }
  };
  return (
    <>
      <div className="p-3 bg-slate-600  w-full md:w-auto h-auto">
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col w-3/5 justify-center">
            <div>
              <label className="flex w-full items-center text-lg text-center font-bold justify-center">
                <input
                  className="font-bold text-sm m-5 w-96 p-2 rounded-md"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button
                  title="paste"
                  className="hover:bg-slate-500 p-1 items-center flex justify-center rounded-md text-white"
                  onClick={pasteFromClipboard}>
                  Paste from clipboard
                </button>
              </label>
            </div>

            <button
              className="border-1 bg-sky-400 row rounded-lg py-2 hover:bg-sky-500 text-white"
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
