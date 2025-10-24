import PageTitle from "@/app/_components/PageTitle";

export default function Support() {
  return (
    <>
      <div className="py-4 mx-auto min-h-full">
        <PageTitle title="پشتیبانی" />
      </div>

      <div className="  flex flex-col items-center justify-center">
        <div className="w-full ">
          <iframe
            src="https://widget.raychat.io/68fbf0a3f8f1ec1406132a90?version=2"
            title="پشتیبانی آنلاین - Raychat"
            className="w-full h-[500px] border-none"
            allow="camera; microphone; autoplay; clipboard-read; clipboard-write"
          />
        </div>
      </div>
    </>
  );
}
