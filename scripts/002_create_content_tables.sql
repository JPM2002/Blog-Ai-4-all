-- Papers table
CREATE TABLE IF NOT EXISTS public.papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL,
  abstract TEXT NOT NULL,
  content TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  topics TEXT[] NOT NULL,
  arxiv_url TEXT,
  published_date DATE,
  reading_time INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Roadmap nodes table
CREATE TABLE IF NOT EXISTS public.roadmap_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  prerequisites TEXT[] DEFAULT '{}',
  position_x FLOAT NOT NULL,
  position_y FLOAT NOT NULL,
  papers TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Glossary terms table
CREATE TABLE IF NOT EXISTS public.glossary_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT UNIQUE NOT NULL,
  definition TEXT NOT NULL,
  category TEXT NOT NULL,
  related_terms TEXT[] DEFAULT '{}',
  papers TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on content tables
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "papers_public_read" ON public.papers
  FOR SELECT USING (status = 'published');

CREATE POLICY "roadmap_nodes_public_read" ON public.roadmap_nodes
  FOR SELECT USING (status = 'published');

CREATE POLICY "glossary_terms_public_read" ON public.glossary_terms
  FOR SELECT USING (status = 'published');

-- Admin full access to all content
CREATE POLICY "papers_admin_all" ON public.papers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "roadmap_nodes_admin_all" ON public.roadmap_nodes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "glossary_terms_admin_all" ON public.glossary_terms
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
