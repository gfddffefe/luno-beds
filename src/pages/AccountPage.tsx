import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import { Profile } from '../lib/types';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function AccountPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        if (data) setProfile(data as Profile);
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMsg('');
    const form = new FormData(e.currentTarget);
    const fullName = form.get('full_name') as string;

    const { error } = await supabase.from('profiles').update({ full_name: fullName }).eq('id', user.id);
    if (error) {
      setMsg(error.message);
    } else {
      setMsg('Profile updated successfully.');
      if (profile) setProfile({ ...profile, full_name: fullName });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light tracking-wide mb-8">Account settings</h1>
      <div className="bg-surface rounded-2xl p-8">
        {msg && <div className="mb-4 text-sm font-medium p-4 bg-background border border-border rounded-lg">{msg}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <Input disabled value={user?.email || ''} className="opacity-70" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input 
              name="full_name" 
              value={profile?.full_name || ''} 
              onChange={(e) => setProfile(prev => prev ? { ...prev, full_name: e.target.value } : { id: user?.id || '', email: user?.email || '', full_name: e.target.value, avatar_url: null, created_at: '' })}
            />
          </div>
          <div className="pt-4 flex justify-between items-center">
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</Button>
            <Button type="button" variant="ghost" onClick={handleLogout} className="text-error">Logout</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
