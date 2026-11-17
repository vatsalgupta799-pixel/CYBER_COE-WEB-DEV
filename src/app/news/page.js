import styles from './News.module.css';
import Link from 'next/link';
import { Newspaper, ChevronRight } from 'lucide-react';
import DataDustBackground from '../../components/DataDustBackground';
import DynamicHeroBackground from '../../components/DynamicHeroBackground';

const newsArticles = [
  {
    id: 1,
    title: 'The Hacker News',
    date: 'Updated Daily',
    category: 'Global News',
    excerpt: 'The most trusted, widely-read independent cybersecurity news source. Features the latest updates on data breaches, cyber attacks, and vulnerabilities.',
    link: 'https://thehackernews.com'
  },
  {
    id: 2,
    title: 'Bleeping Computer',
    date: 'Updated Daily',
    category: 'Tech & Sec News',
    excerpt: 'A premier destination for computer support and security news, covering ransomware attacks, malware analysis, and zero-day vulnerabilities.',
    link: 'https://www.bleepingcomputer.com'
  },
  {
    id: 3,
    title: 'Dark Reading',
    date: 'Updated Daily',
    category: 'Industry Insights',
    excerpt: 'A widely respected IT security news site offering deep dives into cyber threats, enterprise security, and the business of cybersecurity.',
    link: 'https://www.darkreading.com'
  },
  {
    id: 4,
    title: 'Krebs on Security',
    date: 'Updated Regularly',
    category: 'Investigative',
    excerpt: 'In-depth security news and investigation by Brian Krebs, focusing on cybercrime, data breaches, and the underground economy.',
    link: 'https://krebsonsecurity.com'
  },
  {
    id: 5,
    title: 'CyberScoop',
    date: 'Updated Daily',
    category: 'Government & Policy',
    excerpt: 'The premier destination for news regarding cybersecurity policy, government cyber initiatives, and national security.',
    link: 'https://www.cyberscoop.com'
  },
  {
    id: 6,
    title: 'SecurityWeek',
    date: 'Updated Daily',
    category: 'Enterprise Sec',
    excerpt: 'Provides cybersecurity news, insights, and expert analysis for IT security professionals worldwide.',
    link: 'https://www.securityweek.com'
  }
];

export default function NewsPage() {
  return (
    <div className={styles.newsPage}>
      <DataDustBackground />
      {/* ===== HERO ===== */}
      <section className="dynamic-hero-section">
        <DynamicHeroBackground />
        <div className="dynamic-hero-content">
          <h1 className={styles.heroTitle}>Global Cyber News</h1>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>News &amp; Articles</span>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className={styles.contentWrapper}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Worldwide Cybersecurity Feeds</h2>
          <p className={styles.sectionSubtitle}>
            Stay informed with the latest global threats, vulnerabilities, and industry insights from the world's most trusted cybersecurity news channels.
          </p>

          <div className={styles.newsGrid}>
            {newsArticles.map((article) => (
              <div key={article.id} className={styles.newsCard}>
                <div className={styles.newsHeader}>
                  <span className={styles.newsCategory}>{article.category}</span>
                  <span className={styles.newsDate}>{article.date}</span>
                </div>
                <h3 className={styles.newsTitle}>{article.title}</h3>
                <p className={styles.newsExcerpt}>{article.excerpt}</p>
                <div className={styles.newsFooter}>
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className={styles.readMoreBtn}>
                    Visit Channel <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
