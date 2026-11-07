import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail]           = useState('');
  const [newPassword, setNew]       = useState('');
  const [confirm, setConfirm]       = useState('');
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState(false);
  const [loading, setLoading]       = useState(false);
  const [showNew, setShowNew]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (newPassword !== confirm) { setError('Passwords do not match'); return; }
    if (newPassword.length < 6)  { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    try {
      await api.post('/users/reset-password', { email: email.trim(), newPassword });
      setSuccess(true);
    } catch (err) {
      setError(err.message ?? 'Reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--surface)', padding: 'var(--s6)',
    }}>
      <div style={{
        width: 'min(520px, 100%)', background: 'var(--surface-raised)',
        borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-md)', padding: '48px 52px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--brand-text)', letterSpacing: '-.02em' }}>KADCHMA</div>
          <div style={{ fontSize: 15, color: 'var(--ink-muted)', marginTop: 6 }}>Reset your password</div>
        </div>

        {success ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'var(--success-subtle, #dcfce7)', color: 'var(--success, #16a34a)',
              display: 'grid', placeItems: 'center', fontSize: 26,
            }}>✓</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Password reset successfully</div>
              <div style={{ fontSize: 14, color: 'var(--ink-muted)' }}>You can now sign in with your new password.</div>
            </div>
            <button className="btn pri" onClick={() => navigate('/')} style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '12px' }}>
              Go to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-muted)' }}>Email address</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@domain.com"
                autoComplete="email"
                required
                style={{ fontSize: 16, padding: '12px 14px', height: 'auto' }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-muted)' }}>New password</span>
              <div style={{ position: 'relative' }}>
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNew(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  style={{ fontSize: 16, padding: '12px 44px 12px 14px', height: 'auto', width: '100%', boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowNew(v => !v)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', fontSize: 13, padding: 0,
                }}>
                  {showNew ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-muted)' }}>Confirm new password</span>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  style={{ fontSize: 16, padding: '12px 44px 12px 14px', height: 'auto', width: '100%', boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', fontSize: 13, padding: 0,
                }}>
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
              {confirm && newPassword && confirm !== newPassword && (
                <span style={{ fontSize: 12, color: 'var(--danger, #dc2626)' }}>Passwords do not match</span>
              )}
            </label>

            {error && (
              <div style={{
                background: 'var(--danger-subtle, #fee2e2)', color: 'var(--danger, #dc2626)',
                borderRadius: 'var(--r-sm)', padding: '12px 16px', fontSize: 14,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn pri"
              disabled={loading || !email.trim() || !newPassword || !confirm}
              style={{ marginTop: 8, width: '100%', justifyContent: 'center', fontSize: 16, padding: '13px' }}
            >
              {loading ? 'Resetting…' : 'Reset password'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', fontSize: 14, textAlign: 'center' }}
            >
              ← Back to sign in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
