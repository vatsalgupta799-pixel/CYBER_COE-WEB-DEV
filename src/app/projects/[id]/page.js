import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, User, GitBranch, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../../../data/mockData';
import styles from './ProjectDetail.module.css';

import DynamicHeroBackground from '../../../components/DynamicHeroBackground';

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = projectsData.find(p => p.id === id);
  
  if (!project) {
    notFound();
  }


  return (
    <main className={styles.detailPage}>
      <div className={styles.heroSection}>
        <DynamicHeroBackground />
        <div className={`container ${styles.heroContent}`}>
          <Link href="/projects" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          
          <div className={styles.headerLayout}>
            <div className={styles.headerMain}>
              <div className={styles.statusBadge}>
                <span className={project.status === 'Active' ? styles.statusActive : styles.statusCompleted}>
                  {project.status}
                </span>
              </div>
              <h1 className={styles.title}>{project.title}</h1>
              
              <div className={styles.techStack}>
                {project.technologies && project.technologies.map((tech, idx) => (
                  <span key={idx} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
            </div>
            
            <div className={styles.headerLinks}>
              {project.githubLink && project.githubLink !== '#' && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                  <GitBranch size={18} /> Source Code
                </a>
              )}
              {project.liveDemoLink && project.liveDemoLink !== '#' && (
                <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.contentSection}`}>
        <div className={styles.mainInfo}>
          <div className={styles.contentBlock}>
            <h2 className={styles.sectionTitle}>Project Overview</h2>
            <p className={styles.description}>{project.description}</p>
          </div>

          {project.milestones && project.milestones.length > 0 && (
            <div className={styles.contentBlock}>
              <h2 className={styles.sectionTitle}>Key Milestones</h2>
              <div className={styles.timeline}>
                {project.milestones.map((milestone, idx) => (
                  <div key={idx} className={styles.timelineItem}>
                    <div className={styles.timelineIcon}>
                      {project.status === 'Completed' ? <CheckCircle2 size={16} /> : <Calendar size={16} />}
                    </div>
                    <div className={styles.timelineContent}>
                      <span className={styles.timelineDate}>{milestone.date}</span>
                      <h4 className={styles.timelineTask}>{milestone.task}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
