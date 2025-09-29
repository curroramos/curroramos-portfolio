import { useState } from "react";

export default function WorkSection() {
  const [modal, setModal] = useState(null);

  const handleOpen = (type) => setModal(type);
  const handleClose = () => setModal(null);

  return (
    <section className="w-full py-12 px-6 md:px-16 my-20" id="work">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest Work
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Recent projects showcasing AI systems and full-stack development
          </p>
        </div>

        {/* Project Title and Description */}
        <div className="space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center">ReserBot</h3>

          <div className="text-gray-400 space-y-4 max-w-5xl mx-auto">
            <p>
              <strong>ReserBot</strong> is a conversational AI assistant built to help
              restaurants handle reservations, customer questions, menu info, and reviews — all through a smart,
              real-time chat interface.
            </p>

            <p>
              It’s built with modern tools like <strong>Next.js 15</strong>, <strong>React 19</strong>,
              <strong> Tailwind CSS</strong>, and powered by <strong>GPT-4o mini</strong>. The app combines fast
              performance with smart AI orchestration using <strong>LangChain</strong> and <strong>LangGraph</strong>.
            </p>

            <div>
              <p className="font-semibold mb-2">Key features:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Custom API integrations for live booking and data updates</li>
                <li>Streaming responses for smooth, real-time chats</li>
                <li>Prompt caching and smart context handling for better AI performance</li>
                <li>Secure auth with Clerk and real-time storage using Convex</li>
                <li>Fully responsive UI, mobile-friendly, and production-ready</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Video */}
          <div
            className="w-full aspect-video relative group cursor-pointer"
            onClick={() => handleOpen("video")}
          >
            <iframe
              className="w-full h-full rounded-2xl"
              src="https://www.youtube.com/embed/sBg5gLEaGXI"
              title="ReserBot Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Image */}
          <div
            className="w-full aspect-video overflow-hidden rounded-2xl relative group cursor-pointer"
            onClick={() => handleOpen("image")}
          >
            <img
              src="/assets/reserBot2.png"
              alt="ReserBot Screenshot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {modal === "video" ? (
              <iframe
                className="w-full h-full rounded-2xl"
                src="https://www.youtube.com/embed/sBg5gLEaGXI"
                title="ReserBot Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src="/assets/reserBot2.png"
                alt="ReserBot Screenshot"
                className="w-full h-full object-cover rounded-2xl"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
