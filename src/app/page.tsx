export default function Home() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="max-w-4xl text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4">
            Hi, I'm <span className="text-emerald-400">Daniel</span>!
          </h1>
          <p className="text-2xl md:text-4xl lg:text-5xl font-light mb-12">
            A full stack web developer.
          </p>
          <button className="border border-emerald-400 text-emerald-400 px-8 py-3 rounded-full text-lg hover:bg-emerald-400 hover:text-black transition-all duration-300">
            Contact Me
          </button>
        </div>
    </div>
  );
  
}