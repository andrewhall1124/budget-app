import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';

const getUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.refreshSession();
        if (error) {
          setUser(null)
        } else {
          const { user, session } = data;
          setUser(user);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchUser();
  }, []);

  return user;
};

export default getUser;
