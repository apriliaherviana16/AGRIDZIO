"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push('/login');
        return;
      }
      // fetch user record
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email')
        .eq('id', session.user.id)
        .single();
      if (error) {
        console.error(error);
      }
      setUser(data);
      setLoading(false);
    }
    loadUser();
  }, [router]);

  if (loading) return <p>جاري التحميل...</p>;
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">معلومات الحساب</h2>
      <table className="w-full">
        <tbody>
          <tr className="border-b">
            <th className="py-2 text-right">الاسم:</th>
            <td className="py-2">{user.name}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2 text-right">البريد الإلكتروني:</th>
            <td className="py-2">{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}