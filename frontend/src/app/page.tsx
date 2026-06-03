"use client";

import { useState } from "react";

type TechStackItem = {
  name: string;
  category: string;
  purpose: string;
};

type BlueprintResponse = {
  project_name: string;
  user_idea: string;
  summary: string;
  tech_stack: TechStackItem[];
  connections: string[];
  diagram: string;
};

export default function Home() {
  const [idea, setIdea] = useState("");
  const [blueprint, setBlueprint] = useState<BlueprintResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleGenerateBlueprint() {
    setIsLoading(true);
    setErrorMessage("");
    setBlueprint(null);

    try {
      const response = await fetch("http://localhost:8000/api/blueprints/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idea: idea
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate blueprint.");
      }

      const data = await response.json();
      setBlueprint(data);
    } catch (error) {
      setErrorMessage("Something went wrong. Make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="mb-10">
          <p className="text-sm uppercase tracking-widest text-cyan-400">
            StackSketch AI
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Turn your software idea into a tech stack blueprint
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Enter a project idea and generate a starter architecture, recommended
            technologies, and an explanation of how everything connects.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label className="block text-sm font-medium text-slate-300">
            Project idea
          </label>

          <textarea
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            placeholder="Example: I want to build an app where students upload lecture notes and ask questions from them."
            className="mt-3 h-36 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-cyan-400"
          />

          <button
            onClick={handleGenerateBlueprint}
            disabled={isLoading || idea.trim().length === 0}
            className="mt-4 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Generate Blueprint"}
          </button>

          {errorMessage && (
            <p className="mt-4 text-red-400">
              {errorMessage}
            </p>
          )}
        </section>

        {blueprint && (
          <section className="mt-10 space-y-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-bold">
                {blueprint.project_name}
              </h2>

              <p className="mt-3 text-slate-300">
                {blueprint.summary}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-bold">
                Recommended Tech Stack
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {blueprint.tech_stack.map((item) => (
                  <div
                    key={`${item.category}-${item.name}`}
                    className="rounded-xl border border-slate-700 bg-slate-950 p-4"
                  >
                    <p className="text-sm text-cyan-400">
                      {item.category}
                    </p>

                    <h4 className="mt-1 text-lg font-semibold">
                      {item.name}
                    </h4>

                    <p className="mt-2 text-sm text-slate-300">
                      {item.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-bold">
                How Everything Connects
              </h3>

              <ol className="mt-5 list-decimal space-y-3 pl-6 text-slate-300">
                {blueprint.connections.map((connection, index) => (
                  <li key={index}>
                    {connection}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-bold">
                Mermaid Diagram Code
              </h3>

              <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-300">
                {blueprint.diagram}
              </pre>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}