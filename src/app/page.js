import UploadButton from "./components/UploadButton";

export default function Home() {
  return (
    <div className="flex flex-col  justify-center items-center  mt-10">
      <h1 className="text-3xl my-7 text-gray-200">File Uploader</h1>
      <UploadButton />
    </div>
  );
}
