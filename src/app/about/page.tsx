import Image from "next/image";

export default function About() {
    const techStack = [
        { name: "Next.js", src: "/next.svg" },
        { name: "HTML5", src: "/html5.svg" },
        { name: "JavaScript", src: "/javascript.svg" },
        { name: "Bootstrap", src: "/bootstrap.svg" },
        { name: "PHP", src: "/php.svg" },
        { name: "Node.js", src: "/nodejs.svg" },
        { name: "Webpack", src: "/webpack.svg" },
        { name: "MySQL", src: "/mysql.svg" },
        { name: "Python", src: "/python.svg" },
        { name: "Sass", src: "/sass.svg" },
        { name: "Tailwind", src: "/tailwind.svg" },
        { name: "Java", src: "/java.svg" },
        { name: "MongoDB", src: "/mongodb.svg" },
        { name: "Git", src: "/git.svg" },
        { name: "React", src: "/react.svg" }
    ];

    return (
        <main className="min-h-screen p-8 pt-20">
            <h1 className="text-6xl font-light text-center mb-16">
                <span className="border border-emerald-400 px-8 py-4 text-emerald-400">About</span>
            </h1>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
                {/* left column */}
                <div className="space-y-8">
                    <div className="relative max-w-md">
                        <Image
                            src="/personal-photo.jpg"
                            alt="Personal photo"
                            width={300}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <p className="text-lg leading-relaxed">
                        I've always enjoyed puzzles, as analyzing a problem to find a
                        solution provides me with a strong sense of accomplishment.
                        Delving into the world of development has been able to
                        pique my curiosity in ways I haven't found in any other line of
                        work. I'm excited to continue learning and honing my skills in a
                        field with like-minded people!
                    </p>
                </div>

                {/* right column */}
                <div className="grid grid-cols-3 gap-8 place-items-center">
                    {techStack.map((tech, index) => (
                        <div key={index} className="w-20 h-20 flex items-center justify-center">
                            <Image
                                src={tech.src}
                                alt={tech.name}
                                width={80}
                                height={80}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>

    );
}