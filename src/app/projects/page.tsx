'use client'

import Image from "next/image";
import { useState } from "react";
import projects, {Project} from "@/data/projects";
export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  
  console.log('Projects component rendered');

  // function to open project details
  const openProject = (project: Project) => {
    setActiveProject(project);
    setActivePhotoIndex(0);
  };

  // close project details
  const closeProject = () => {
    setActiveProject(null);
  };

  // navigate between photos
  const nextPhoto = () => {
    if (activeProject) {
      setActivePhotoIndex((prev) => 
        prev === activeProject.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (activeProject) {
      setActivePhotoIndex((prev) => 
        prev === 0 ? activeProject.photos.length - 1 : prev - 1
      );
    }
  };

  return (
    <main className=" text-white min-h-screen">
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
        
        {/* projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project:Project) => (
            <div 
              key={project.id} 
              className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              onClick={() => openProject(project)}
            >
              {/* featured Image */}
              <div className="relative h-48">
                <Image 
                  src={`/images/${project.photos[0]}`}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* project info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-1">Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech:string, index:number) => (
                      <span 
                        key={index} 
                        className="text-xs bg-emerald-500 text-black px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">{project.description}</p>
                <button 
                  className="mt-4 text-emerald-500 hover:text-emerald-300 font-medium"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* project detail */}
        {activeProject && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
            <div className="bg-neutral-800 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              {/* close button */}
              <div className="flex justify-end p-4">
                <button 
                  onClick={closeProject}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* project content */}
              <div className="px-6 pb-6">
                <h2 className="text-2xl font-bold mb-4">{activeProject.name}</h2>
                
                {/* photo gallery */}
                <div className="mb-6">
                  <div className="relative aspect-video mb-2">
                    <Image 
                      src={`/images/${activeProject.photos[activePhotoIndex]}`}
                      alt={`${activeProject.name} screenshot ${activePhotoIndex + 1}`}
                      fill
                      className="object-contain rounded"
                    />
                    
                    {/* navigation arrows */}
                    {activeProject.photos.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* thumbnails */}
                  {activeProject.photos.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {activeProject.photos.map((photo:string, index:number) => (
                        <div 
                          key={index} 
                          onClick={(e) => { e.stopPropagation(); setActivePhotoIndex(index); }}
                          className={`relative w-20 h-14 flex-shrink-0 cursor-pointer border-2 ${index === activePhotoIndex ? 'border-emerald-500' : 'border-transparent'}`}
                        >
                          <Image 
                            src={`/images/${photo}`}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* techs */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techs.map((tech:string, index:number) => (
                      <span 
                        key={index} 
                        className="text-sm bg-emerald-500 text-black px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-300">{activeProject.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}