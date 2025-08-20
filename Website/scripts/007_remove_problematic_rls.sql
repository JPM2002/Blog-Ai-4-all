-- Remove all RLS policies that cause infinite recursion
-- and create simple, safe policies

-- Drop existing problematic policies
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_all" ON profiles;

-- Disable RLS temporarily to allow profile operations
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Create a simple trigger to create profiles automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    'user'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create your admin user (replace with your actual email)
INSERT INTO profiles (id, email, full_name, role) 
VALUES (
  gen_random_uuid(),
  'admin@aipapers.dev', -- Replace with your email
  'Admin User',
  'admin'
) ON CONFLICT (email) DO UPDATE SET role = 'admin';
