-- Create or update admin user
-- First, let's check if we have any users and make the first user an admin

-- Update any existing user to be admin (for testing)
UPDATE profiles 
SET role = 'admin' 
WHERE role IS NULL OR role = 'user'
LIMIT 1;

-- If no users exist, this will be handled by the trigger when someone signs up
-- But let's also create a way to easily make someone admin by email
CREATE OR REPLACE FUNCTION make_user_admin(user_email text)
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET role = 'admin' 
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION make_user_admin(text) TO authenticated;
