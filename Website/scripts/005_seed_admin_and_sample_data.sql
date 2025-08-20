-- Insert sample paper (Attention Is All You Need)
INSERT INTO public.papers (
  slug,
  title,
  authors,
  abstract,
  content,
  difficulty,
  topics,
  arxiv_url,
  published_date,
  reading_time,
  status
) VALUES (
  'attention-is-all-you-need',
  'Attention Is All You Need',
  ARRAY['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Lukasz Kaiser', 'Illia Polosukhin'],
  'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
  '# Attention Is All You Need

## Abstract

The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.

## Introduction

Recurrent neural networks, long short-term memory and gated recurrent neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation.

<Callout type="key-insight">
The Transformer architecture revolutionized NLP by showing that attention mechanisms alone, without recurrence or convolution, can achieve state-of-the-art results in sequence-to-sequence tasks.
</Callout>

## Model Architecture

The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder.

### Encoder and Decoder Stacks

**Encoder**: The encoder is composed of a stack of N = 6 identical layers.

**Decoder**: The decoder is also composed of a stack of N = 6 identical layers.

<Term term="self-attention">Self-attention</Term> allows the model to attend to different positions of the input sequence to compute a representation of the sequence.

## Conclusion

In this work, we presented the Transformer, the first sequence transduction model based entirely on attention, replacing the recurrent layers most commonly used in encoder-decoder architectures with multi-headed self-attention.',
  'intermediate',
  ARRAY['transformers', 'attention', 'nlp', 'deep-learning'],
  'https://arxiv.org/abs/1706.03762',
  '2017-06-12',
  25,
  'published'
) ON CONFLICT (slug) DO NOTHING;

-- Insert sample roadmap nodes
INSERT INTO public.roadmap_nodes (title, description, category, difficulty, prerequisites, position_x, position_y, papers) VALUES
('Linear Algebra Basics', 'Understanding vectors, matrices, and basic operations', 'foundations', 'beginner', '{}', 100, 100, '{}'),
('Neural Network Fundamentals', 'Basic concepts of artificial neural networks', 'foundations', 'beginner', ARRAY['Linear Algebra Basics'], 300, 100, '{}'),
('Attention Mechanisms', 'Understanding attention in neural networks', 'architectures', 'intermediate', ARRAY['Neural Network Fundamentals'], 500, 200, ARRAY['attention-is-all-you-need']),
('Transformer Architecture', 'Deep dive into the Transformer model', 'architectures', 'intermediate', ARRAY['Attention Mechanisms'], 700, 300, ARRAY['attention-is-all-you-need'])
ON CONFLICT DO NOTHING;

-- Insert sample glossary terms
INSERT INTO public.glossary_terms (term, definition, category, related_terms, papers) VALUES
('Self-Attention', 'A mechanism that allows each position in a sequence to attend to all positions in the same sequence', 'attention', ARRAY['Multi-Head Attention', 'Transformer'], ARRAY['attention-is-all-you-need']),
('Multi-Head Attention', 'An extension of attention that uses multiple attention heads to capture different types of relationships', 'attention', ARRAY['Self-Attention', 'Transformer'], ARRAY['attention-is-all-you-need']),
('Transformer', 'A neural network architecture based entirely on attention mechanisms', 'architectures', ARRAY['Self-Attention', 'Multi-Head Attention'], ARRAY['attention-is-all-you-need'])
ON CONFLICT (term) DO NOTHING;

-- Note: To make yourself an admin, you'll need to sign up first, then run:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';
