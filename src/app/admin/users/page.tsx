"use client";

import { useState, useEffect } from 'react';
import { db, app } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, setDoc, query, orderBy } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Users, Shield, Trash2, UserPlus, X } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AdminUser));
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    setFormLoading(true);

    try {
      // Use secondary app to create user without signing out the current admin
      const secondaryApp = initializeApp(app.options, "Secondary");
      const secondaryAuth = getAuth(secondaryApp);
      
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, formData.email, formData.password);
      await secondaryAuth.signOut();

      // Store additional details in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: 'Editor',
        createdAt: new Date().toISOString()
      });

      setIsAdding(false);
      setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || 'Error creating user');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Revoke access for ${email}? Note: This only removes them from the database, you may need to delete the user in Firebase Auth console manually unless you implement an Admin SDK cloud function.`)) return;
    
    try {
      await deleteDoc(doc(db, "users", id));
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Error removing user');
    }
  };

  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
            <div className="text-silver-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">Security</div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Access Control.</h1>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="whitespace-nowrap px-8 py-4 bg-silver-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:opacity-90 transition-all flex items-center gap-2"
        >
            <UserPlus size={16} /> Add Administrator
        </button>
      </header>

      {isAdding && (
        <div className="bg-[var(--card-bg)] rounded-[2rem] border border-[var(--border-subtle)] p-8 md:p-12 relative">
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-8 right-8 text-[var(--text-muted)] hover:text-[var(--foreground)]"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Register New Admin</h2>
          
          <form onSubmit={handleAddUser} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">First Name</label>
                <input 
                  type="text" required
                  value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-[var(--background)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-silver-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Last Name</label>
                <input 
                  type="text" required
                  value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-[var(--background)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-silver-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Email Address</label>
              <input 
                type="email" required
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[var(--background)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-silver-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Password</label>
                <input 
                  type="password" required minLength={6}
                  value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-[var(--background)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-silver-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Confirm Password</label>
                <input 
                  type="password" required minLength={6}
                  value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-[var(--background)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-silver-primary"
                />
              </div>
            </div>

            {formError && (
              <p className="text-red-500 text-sm font-medium">{formError}</p>
            )}

            <button 
              type="submit"
              disabled={formLoading}
              className="w-full md:w-auto px-12 py-4 bg-silver-primary text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {formLoading ? 'Creating User...' : 'Create Administrator'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-24 text-[11px] font-black uppercase tracking-widest animate-pulse">
            Auditing Access Logs...
        </div>
      ) : (
        <div className="bg-[var(--card-bg)] rounded-[2.5rem] border border-[var(--border-subtle)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                      <tr className="border-b border-[var(--border-subtle)] bg-[var(--foreground)]/[0.02]">
                          <th className="p-8 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Administrator</th>
                          <th className="p-8 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Role</th>
                          <th className="p-8 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Enrolled On</th>
                          <th className="p-8 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {users.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-[var(--text-muted)] text-sm">
                            No administrators found in database. You might need to add one.
                          </td>
                        </tr>
                      )}
                      {users.map((user) => (
                          <tr key={user.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--foreground)]/[0.01] transition-colors">
                              <td className="p-8">
                                  <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-full bg-[var(--background)] flex items-center justify-center text-silver-primary shrink-0">
                                          <Users size={16} />
                                      </div>
                                      <div>
                                        <div className="text-[14px] font-bold">{user.firstName} {user.lastName}</div>
                                        <div className="text-[11px] text-[var(--text-muted)]">{user.email}</div>
                                      </div>
                                  </div>
                              </td>
                              <td className="p-8">
                                  <div className="flex items-center gap-2">
                                      <Shield size={12} className="text-silver-primary" />
                                      <span className="text-[11px] font-black uppercase tracking-widest">{user.role || 'Editor'}</span>
                                  </div>
                              </td>
                              <td className="p-8 text-[13px] text-[var(--text-muted)] font-medium">
                                  {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="p-8 text-right">
                                  <button 
                                      onClick={() => handleDelete(user.id, user.email)}
                                      className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all"
                                      title="Revoke Access"
                                  >
                                      <Trash2 size={16} />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            </div>
        </div>
      )}
    </div>
  );
}
