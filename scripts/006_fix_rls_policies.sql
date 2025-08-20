-- Fix infinite recursion in profiles RLS policies
-- Drop the problematic admin policy that causes recursion
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;

-- Create a simpler admin policy that doesn't reference profiles table
-- Admins will be identified by a specific function or direct auth metadata
CREATE POLICY "profiles_admin_select" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    (auth.jwt() ->> 'role')::text = 'admin'
  );

-- Allow admins to update any profile
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE USING (
    auth.uid() = id OR 
    (auth.jwt() ->> 'role')::text = 'admin'
  );

-- Allow admins to delete any profile  
CREATE POLICY "profiles_admin_delete" ON public.profiles
  FOR DELETE USING (
    auth.uid() = id OR 
    (auth.jwt() ->> 'role')::text = 'admin'
  );
