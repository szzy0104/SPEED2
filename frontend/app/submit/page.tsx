'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../api/axios';
import { SubmitFormData } from '../types/submission';

export default function SubmitPage() {
  const router = useRouter();
  const [form, setForm] = useState<SubmitFormData>({
    title: '',
    doi: '',
    email: '',
    author: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // 简单验证
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = '标题不能为空';
    if (!form.doi.trim()) newErrors.doi = 'DOI不能为空';
    if (!form.email.trim()) newErrors.email = '邮箱不能为空';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = '邮箱格式错误';
    if (!form.author.trim()) newErrors.author = '作者不能为空';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post('/submissions', form);
      setAlert({ type: 'success', msg: '提交成功！已进入待审核队列' });
      setForm({ title: '', doi: '', email: '', author: '' });
      setTimeout(() => router.push('/'), 3000);
    } catch (err) {
      setAlert({ type: 'error', msg: '提交失败，请重试' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 导航 */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>返回首页</Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>文献提交</h1>
          <div></div>
        </div>
      </header>

      {/* 表单 */}
      <main style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>填写文献信息</h2>

          {/* 提示框 */}
          {alert && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: '0.25rem', marginBottom: '1.5rem' }} className={alert.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}>
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* 标题 */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>文献标题 *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                disabled={loading}
                style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem', padding: '0.5rem', width: '100%' }}
              />
              {errors.title && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.title}</p>}
            </div>

            {/* DOI */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>DOI *</label>
              <input
                type="text"
                name="doi"
                value={form.doi}
                onChange={(e) => setForm({ ...form, doi: e.target.value })}
                placeholder="示例：10.1000/182"
                disabled={loading}
                style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem', padding: '0.5rem', width: '100%' }}
              />
              {errors.doi && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.doi}</p>}
            </div>

            {/* 邮箱 */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>提交者邮箱 *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={loading}
                style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem', padding: '0.5rem', width: '100%' }}
              />
              {errors.email && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</p>}
            </div>

            {/* 作者 */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>文献作者 *</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="多个作者用逗号分隔"
                disabled={loading}
                style={{ border: '1px solid #d1d5db', borderRadius: '0.25rem', padding: '0.5rem', width: '100%' }}
              />
              {errors.author && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.author}</p>}
            </div>

            {/* 提交按钮 */}
            <button type="submit" disabled={loading} style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
              {loading ? '提交中...' : '提交文献'}
            </button>
          </form>
        </div>
      </main>

      {/* 页脚 */}
      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '1rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.875rem' }}>© 2025 学术文献管理系统 | 简化版</p>
      </footer>
    </div>
  );
}