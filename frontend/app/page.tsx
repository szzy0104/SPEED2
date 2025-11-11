'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 导航栏 */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>学术文献管理系统</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => router.push('/submit')} style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
              提交文献
            </button>
            <button onClick={() => router.push('/moderate')} style={{ backgroundColor: '#4b5563', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
              待审核队列
            </button>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>欢迎使用文献管理系统</h2>
          <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem' }}>快速提交学术文献，查看待审核队列</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={() => router.push('/submit')} style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
              立即提交
            </button>
            <button onClick={() => router.push('/moderate')} style={{ backgroundColor: 'white', border: '1px solid #d1d5db', color: '#4b5563', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
              查看队列
            </button>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '1rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.875rem' }}>© 2025 学术文献管理系统 | 简化版</p>
      </footer>
    </div>
  );
}