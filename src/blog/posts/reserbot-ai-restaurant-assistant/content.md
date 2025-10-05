# ReserBot 🍳: Building an AI-Powered Restaurant Assistant

  You know that feeling when you call a restaurant to make a reservation and get put on hold for ten minutes? Or when
  you're trying to figure out if they can accommodate your gluten-free friend? Yeah, I got tired of that too.

  So I built ReserBot - an AI agent that actually knows how to talk to restaurants.

  ## The Problem

  Restaurant booking is weirdly stuck in the past. You've got these clunky online forms, phone tag with busy hosts, or
   apps that only work for chain restaurants. I wanted something that felt more natural - like texting a really
  helpful restaurant employee who never sleeps.

  ## What It Actually Does

  ReserBot connects to a restaurant's backend API and handles the full reservation lifecycle. Create, read, update,
  delete - all the CRUD operations you'd expect, but wrapped in a conversational interface powered by Claude 3.5
  Sonnet.

  The interesting part was getting the AI to use tools properly. I used LangChain to orchestrate everything - when you
   ask "Can I get a table for 4 on Friday?", it knows to:
  1. Check availability for that date and party size
  2. Create the reservation if there's a spot
  3. Give you a confirmation number
  4. Answer follow-up questions about the menu

  It can also handle modifications and cancellations, answer menu questions (including allergen info), and generally
  not sound like a robot while doing it.

  ## The Tech Side

  Built with Next.js and React, using Convex for real-time data sync. The AI piece uses LangGraph for state
  management, which turned out to be crucial for keeping conversations coherent across multiple tool calls.

  I also implemented prompt caching to keep response times snappy and costs down. Restaurant info doesn't change that
  often, so why keep sending it over and over?

  The streaming responses were a nice touch - instead of waiting for the full answer, you see the AI "thinking" in
  real-time. Makes it feel way more natural.

  ### System Architecture

  ![ReserBot System Architecture](/assets/reserBot2.png)

  The architecture follows a clean separation of concerns:

  - **Frontend Layer**: Next.js application with Clerk authentication handling user sessions and the chat interface
  - **Real-time Data**: Convex manages conversation history and messages, with a history trimmer keeping context windows manageable
  - **AI Orchestration**: GPT-4o mini processes chat prompts with system instructions, streaming responses back via Server-Side Events (SSE)
  - **Tool Integration**: The AI has access to four primary tools - checking availability, managing reservations (CRUD operations), fetching menu information, and collecting user reviews
  - **Backend API**: Node.js REST API connects to databases for menus, reservations, and reviews, providing the actual restaurant functionality

  The beauty of this setup is how the AI agent seamlessly orchestrates multiple tool calls based on natural language input, handling the complexity behind a simple chat interface.

  ### See It In Action

  <iframe width="560" height="315" src="https://www.youtube.com/embed/sBg5gLEaGXI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  ## What I Learned

  Building this reinforced something I've been thinking about: AI agents are only as good as the tools you give them.
  The Claude model is impressive, but the real magic happens when you connect it to actual systems that can do stuff.

  Also, error handling is critical. When a reservation fails, you can't just say "oops, something went wrong" - you
  need to figure out *why* and communicate it clearly. Lost time slots? Already booked? Invalid date? The agent needs
  to handle all of that gracefully.

  ## Try It

  If you're curious, the code's up on GitHub. It's called ReserBot (or BistroBot-Lite internally, because naming
  things is hard). You'll need your own restaurant API to plug it into, but the structure is there.