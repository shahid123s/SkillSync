export default function AuthImage() {
    return (
      <div className="hidden w-1/2 lg:block">
        <div className="relative h-full">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3TYyQtvzZQaHrHW3VqYZYAIDtWmmEf.png"
            alt="Educational background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <h2 className="text-3xl font-bold">SKILL SYNC</h2>
            <p className="mt-2">Make your Skiill to Industrial Level </p>
          </div>
        </div>
      </div>
    );
  }
  