import { Callout } from "@/components/paper/callout"
import { Term } from "@/components/paper/term"
import { Diagram } from "@/components/paper/diagram"
import { Quiz } from "@/components/paper/quiz"

const quizQuestions = [
  {
    id: "q1",
    type: "mcq" as const,
    prompt: "What replaces recurrence in the Transformer?",
    options: ["Self-attention", "Convolutions", "Pooling", "BatchNorm"],
    answer: 0,
  },
  {
    id: "q2",
    type: "mcq" as const,
    prompt: "Why divide by √d_k in attention?",
    options: ["Stability of softmax", "Regularization", "Faster compute", "Bigger gradients"],
    answer: 0,
  },
  {
    id: "q3",
    type: "mcq" as const,
    prompt: "What provides order info?",
    options: ["Layer norm", "Positional encoding", "Skip connections", "Dropout"],
    answer: 1,
  },
]

export function AttentionPaper() {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <section id="tldr">
        <h2>TL;DR</h2>
        <p>
          Self-attention replaces recurrence and convolution, learning token-to-token relationships in parallel,
          dramatically improving training efficiency and performance on translation tasks.
        </p>
      </section>

      <section id="why-matters">
        <h2>Why This Paper Matters</h2>
        <ul>
          <li>Birth of the Transformer family (BERT, GPT, T5).</li>
          <li>Enables parallel sequence processing and long-range dependency modeling.</li>
        </ul>
      </section>

      <section id="intuition">
        <h2>Intuition</h2>
        <Callout variant="info">
          Think of each word looking around the sentence and deciding which other words matter most, assigning weights
          (attention) dynamically.
        </Callout>
      </section>

      <section id="math">
        <h2>Key Equations</h2>
        <p>
          The core attention mechanism is computed as: <code>softmax(QK^T / √d_k)V</code>
        </p>
        <p>Where Q (queries), K (keys), and V (values) are learned linear projections of the input embeddings.</p>
      </section>

      <section id="visuals">
        <h2>Visuals</h2>
        <Diagram name="self-attention" />
      </section>

      <section id="glossary">
        <h2>Glossary</h2>
        <ul>
          <li>
            <Term data-term="self-attention">Self-attention</Term>: Weighing other positions in the same sequence.
          </li>
          <li>
            <Term data-term="positional-encoding">Positional encoding</Term>: Adding order information to tokens.
          </li>
        </ul>
      </section>

      <section id="quiz">
        <Quiz questions={quizQuestions} />
      </section>

      <section id="further-reading">
        <h2>Further Reading</h2>
        <ul>
          <li>
            <a href="#" className="text-primary hover:underline">
              "The Illustrated Transformer" (link placeholder)
            </a>
          </li>
          <li>
            <a href="#" className="text-primary hover:underline">
              "BERT: Pre-training of Deep Bidirectional Transformers" (link placeholder)
            </a>
          </li>
        </ul>
      </section>
    </article>
  )
}
