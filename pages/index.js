import Image from "next/image";
// import streetArt from "../public/streetArt.jpg";

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden">
        <main>
          <header className="relative flex items-center justify-center h-screen mb-12 overflow-hidden">
            <div className="relative z-30 p-5 text-2xl text-slate-800 bg-white bg-opacity-80 rounded-xl">
              {/* <div className="text-sm text-center">Welcome to</div> */}
              <div className="text-center tracking-widest">Welcome Friends</div>
            </div>
            <video
              muted
              autoPlay
              loop
              src="blackWater.mp4"
              type="video/mp4"
              className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
            >
              <track
                src="captions_en.vtt"
                kind="captions"
                srcLang="en"
                label="english_captions"
              ></track>
            </video>
            {/* <Image src={streetArt} layout="fill" placeholder="blur" />" */}
          </header>
        </main>
      </div>
    </>
  );
}
