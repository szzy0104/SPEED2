'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../api/axios';
import { Submission } from '../types/submission';

export default function ModeratePage() {
  const [list, setList] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 加载数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/submissions/pending');
      setList(res.data.data || []);
      setError('');
    } catch (err) {
      setError('获取数据失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 格式化时间
  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleString();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 导航 */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>返回首页</Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>待审核文献队列</h1>
          <button onClick={fetchData} style={{ backgroundColor: 'white', border: '1px solid #d1d5db', color: '#4b5563', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
            刷新
          </button>
        </div>
      </header>

      {/* 列表 */}
      <main style={{ flexGrow: 1, padding: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>加载中...</div>
          ) : error ? (
            <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.05)', color: 'red', padding: '1rem', borderRadius: '0.25rem', textAlign: 'center' }}>{error}</div>
          ) : list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>暂无待审核文献</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #d1d5db' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', color: '#4b5563' }}>标题</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', color: '#4b5563' }}>DOI</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', color: '#4b5563' }}>作者</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', color: '#4b5563' }}>提交时间</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item) => (
                    <tr key={item._id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{item.title}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                        <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                          {item.doi}
                        </a>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{item.author}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#666' }}>{formatTime(item.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* 页脚 */}
      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '1rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.875rem' }}>© 2025 学术文献管理系统 | 简化版</p>
      </footer>
    </div>
  );
}