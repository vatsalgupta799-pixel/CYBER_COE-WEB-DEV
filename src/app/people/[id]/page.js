import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
  ExternalLink, 
  FileText, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  Award, 
  Cpu, 
  BookOpen, 
  Layers, 
  Tag, 
  CheckCircle2, 
  Sparkles,
  FlaskConical,
  BadgeCheck,
  HeartHandshake
} from 'lucide-react';
import { projectsData, membersData } from '../../../data/mockData';
import { labsData } from '../../../data/labsData';
import styles from './PersonDetail.module.css';

import DynamicHeroBackground from '../../../components/DynamicHeroBackground';
import EmailButton from '../../../components/EmailButton';

export default async function PersonPage({ params }) {
  const { id } = await params;
  const member = membersData.find(m => m.id === id);
  
  if (!member) {
    notFound();
  }

  const memberProjects = projectsData.filter(p => 
    (p.members && p.members.includes(member.id)) ||
    (member.projects && (
      member.projects.includes(p.id) || 
      member.projects.some(proj => typeof proj === 'string' && (p.title?.toLowerCase().includes(proj.toLowerCase()) || proj.toLowerCase().includes(p.title?.toLowerCase())))
    ))
  );

  return (
    <main className={styles.detailPage}>
      <div className={styles.heroSection}>
        <DynamicHeroBackground />
        <div className={`container ${styles.heroContent}`}>
          <Link href="/people" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to People
          </Link>
          <div className={styles.headerFlex}>
            <div className={styles.avatarPlaceholder}>
              {member.name.charAt(0)}
            </div>
            <div className={styles.headerText}>
              <div className={styles.categoryBadge}>
                <span className={styles.badgeDot}></span>
                {member.category ? member.category.toUpperCase() : 'MEMBER'}
              </div>
              <h1 className={styles.title}>{member.name}</h1>
              <p className={styles.role}>{member.role}</p>
              
              <div className={styles.contactLinks}>
                {member.email && (
                  <EmailButton email={member.email} />
                )}
                {member.linkedin && member.linkedin !== '#' && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactBtn}>
                    <ExternalLink size={15} /> LinkedIn
                  </a>
                )}
                {member.github && member.github !== '#' && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className={styles.contactBtn}>
                    <ExternalLink size={15} /> GitHub
                  </a>
                )}
                {member.website && (
                  <a href={member.website} target="_blank" rel="noopener noreferrer" className={styles.contactBtn}>
                    <ExternalLink size={15} /> Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.contentSection}`}>
        {/* Left Column: Main Narrative */}
        <div className={styles.mainInfo}>
          {/* About Section */}
          <div className={styles.portfolioBlock}>
            <h2 className={styles.sectionTitle}>
              <BookOpen size={20} className={styles.titleIcon} />
              About
            </h2>
            <p className={styles.description}>{member.bio}</p>
          </div>

          {/* Education Section */}
          {member.education && member.education.length > 0 && (
            <div className={styles.portfolioBlock}>
              <h2 className={styles.sectionTitle}>
                <Layers size={20} className={styles.titleIcon} />
                Education & Academic Background
              </h2>
              <div className={styles.timeline}>
                {member.education.map((edu, idx) => (
                  <div key={idx} className={styles.timelineItem}>
                    <div className={styles.timelineYear}>{edu.year}</div>
                    <div className={styles.timelineContent}>
                      <h4>{edu.degree}</h4>
                      <p>{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Section */}
          {member.workExperience && member.workExperience.length > 0 && (
            <div className={styles.portfolioBlock}>
              <h2 className={styles.sectionTitle}>
                <Briefcase size={20} className={styles.titleIcon} />
                Experience
              </h2>
              <div className={styles.timeline}>
                {member.workExperience.map((exp, idx) => (
                  <div key={idx} className={styles.timelineItem}>
                    <div className={styles.timelineYear}>{exp.duration || exp.year}</div>
                    <div className={styles.timelineContent}>
                      <h4>{exp.role}</h4>
                      {exp.company && <div className={styles.timelineCompany}>{exp.company}</div>}
                      {exp.location && <div className={styles.timelineLoc}>{exp.location}</div>}
                      {exp.description && <p className={styles.timelineDesc}>{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volunteering Section */}
          {member.volunteering && member.volunteering.length > 0 && (
            <div className={styles.portfolioBlock}>
              <h2 className={styles.sectionTitle}>
                <HeartHandshake size={20} className={styles.titleIcon} />
                Volunteering & Leadership
              </h2>
              <div className={styles.timeline}>
                {member.volunteering.map((vol, idx) => (
                  <div key={idx} className={styles.timelineItem}>
                    <div className={styles.timelineYear}>{vol.duration || vol.year}</div>
                    <div className={styles.timelineContent}>
                      <h4>{vol.role}</h4>
                      {vol.organization && <div className={styles.timelineCompany}>{vol.organization}</div>}
                      {vol.cause && <div className={styles.timelineLoc}>{vol.cause}</div>}
                      {vol.description && <p className={styles.timelineDesc}>{vol.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Licenses & Certifications Section */}
          {member.certifications && member.certifications.length > 0 && (
            <div className={styles.portfolioBlock}>
              <h2 className={styles.sectionTitle}>
                <BadgeCheck size={20} className={styles.titleIcon} />
                Licenses & Certifications
              </h2>
              <div className={styles.certGrid}>
                {member.certifications.map((cert, idx) => (
                  <div key={idx} className={styles.certCard}>
                    <div className={styles.certIcon}>
                      <BadgeCheck size={20} />
                    </div>
                    <div className={styles.certInfo}>
                      <div className={styles.certTitle}>{cert.title}</div>
                      {cert.issuer && <div className={styles.certIssuer}>{cert.issuer}</div>}
                      {cert.date && <div className={styles.certDate}>Issued {cert.date}</div>}
                      {cert.credentialId && <div className={styles.certCredId}>Credential ID: {cert.credentialId}</div>}
                      {cert.skills && (
                        <div className={styles.certSkills}>
                          <strong>Skills:</strong> {Array.isArray(cert.skills) ? cert.skills.join(', ') : cert.skills}
                        </div>
                      )}
                      {cert.link && cert.link !== '#' && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                          Show Credential <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publications Section */}
          {member.publications && member.publications.length > 0 && (
            <div className={styles.portfolioBlock}>
              <h2 className={styles.sectionTitle}>
                <FileText size={20} className={styles.titleIcon} />
                Selected Publications & Books
              </h2>
              <ul className={styles.list}>
                {member.publications.map((pub, idx) => (
                  <li key={idx} className={styles.listItem}>
                    <div className={styles.pubContent}>
                      <strong>{pub.title}</strong> — <em>{pub.venue}</em> ({pub.year})
                    </div>
                    {pub.link && pub.link !== '#' && (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                        Read Publication <ExternalLink size={13} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Honors & Awards Section */}
          {member.awards && member.awards.length > 0 && (
            <div className={styles.portfolioBlock}>
              <h2 className={styles.sectionTitle}>
                <Award size={20} className={styles.titleIcon} />
                Honors & Key Achievements
              </h2>
              <ul className={styles.list}>
                {member.awards.map((award, idx) => (
                  <li key={idx} className={styles.listItem}>
                    <span className={styles.bullet}>★</span> {award}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Affiliated Cybersecurity Labs (Left Side when configured) */}
          {member.associatedLabs && member.associatedLabs.length > 0 && member.labsPosition === 'left' && (
            <div className={styles.portfolioBlock}>
              <h2 className={styles.sectionTitle}>
                <FlaskConical size={20} className={styles.titleIcon} />
                Affiliated Cybersecurity Labs
              </h2>
              <div className={styles.mainLabsGrid}>
                {member.associatedLabs.map((labName, idx) => {
                  const labInfo = labsData.find(l => l.name?.toLowerCase() === labName?.toLowerCase()) || {
                    name: labName,
                    desc: 'Specialized lab facility dedicated to hands-on cybersecurity research, simulations, and real-world investigations at the Cybersecurity Centre of Excellence.'
                  };
                  return (
                    <Link href="/practice-labs" key={idx} className={styles.mainLabCard}>
                      <div className={styles.mainLabHeader}>
                        <div className={styles.labIcon}>
                          <FlaskConical size={18} />
                        </div>
                        <div className={styles.mainLabTitleGroup}>
                          <div className={styles.mainLabTitle}>{labInfo.name}</div>
                          <span className={styles.mainLabStatus}>Active Facility</span>
                        </div>
                      </div>
                      <p className={styles.mainLabDesc}>
                        {labInfo.desc}
                      </p>
                      <div className={styles.mainLabLink}>
                        Explore Lab & Hands-on Exercises <ExternalLink size={13} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Rich Profile Cards & Metadata */}
        <aside className={styles.sidebar}>
          {/* Overview / Affiliation Widget */}
          <div className={styles.sidebarWidget}>
            <h3 className={styles.sidebarTitle}>
              <Building2 size={18} className={styles.widgetIcon} />
              Quick Overview
            </h3>
            <div className={styles.overviewList}>
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Affiliation</span>
                <span className={styles.overviewVal}>{member.affiliation || 'Cybersecurity Centre of Excellence, UPES'}</span>
              </div>
              {member.department && (
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>Department</span>
                  <span className={styles.overviewVal}>{member.department}</span>
                </div>
              )}
              {member.experience && (
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>Experience</span>
                  <span className={styles.overviewVal}>{member.experience}</span>
                </div>
              )}
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Designation</span>
                <span className={styles.overviewVal}>{member.role}</span>
              </div>
            </div>
          </div>

          {/* Associated Projects Section (Right Sidebar) */}
          {memberProjects.length > 0 && (
            <div className={styles.sidebarWidget}>
              <h3 className={styles.sidebarTitle}>
                <Cpu size={18} className={styles.widgetIcon} />
                Projects & Research
              </h3>
              <div className={styles.sidebarProjectsList}>
                {memberProjects.map(project => (
                  <Link href={`/projects/${project.id}`} key={project.id} className={styles.sidebarProjectCard}>
                    <div className={styles.sidebarProjectHeader}>
                      <span className={styles.sidebarProjectTitle}>{project.title}</span>
                      <span className={styles.sidebarProjectStatus}>{project.status}</span>
                    </div>
                    {project.description && (
                      <p className={styles.sidebarProjectDesc}>
                        {project.description.split('\n')[0].replace(/^\d+\.\s*/, '')}
                      </p>
                    )}
                    <div className={styles.sidebarProjectLink}>
                      View Project <ExternalLink size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Affiliated Cybersecurity Labs (Right Sidebar) */}
          {member.associatedLabs && member.associatedLabs.length > 0 && member.labsPosition !== 'left' && (
            <div className={styles.sidebarWidget}>
              <h3 className={styles.sidebarTitle}>
                <FlaskConical size={18} className={styles.widgetIcon} />
                Affiliated Cybersecurity Labs
              </h3>
              <div className={styles.sidebarLabsList}>
                {member.associatedLabs.map((labName, idx) => {
                  const labInfo = labsData.find(l => l.name?.toLowerCase() === labName?.toLowerCase()) || {
                    name: labName,
                    desc: 'Specialized lab facility dedicated to hands-on cybersecurity research and practice.'
                  };
                  return (
                    <Link href="/practice-labs" key={idx} className={styles.sidebarLabCard}>
                      <div className={styles.sidebarLabHeader}>
                        <span className={styles.sidebarLabTitle}>{labInfo.name}</span>
                        <span className={styles.sidebarLabStatus}>Active</span>
                      </div>
                      <p className={styles.sidebarLabDesc}>{labInfo.desc}</p>
                      <div className={styles.sidebarLabLink}>
                        Explore Lab <ExternalLink size={12} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Metrics / Highlights Grid */}
          {member.metrics && member.metrics.length > 0 && (
            <div className={styles.sidebarWidget}>
              <h3 className={styles.sidebarTitle}>
                <Sparkles size={18} className={styles.widgetIcon} />
                Impact & Highlights
              </h3>
              <div className={styles.metricsGrid}>
                {member.metrics.map((metric, idx) => (
                  <div key={idx} className={styles.metricCard}>
                    <div className={styles.metricValue}>{metric.value}</div>
                    <div className={styles.metricLabel}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Expertise Tags */}
          {member.expertise && member.expertise.length > 0 && (
            <div className={styles.sidebarWidget}>
              <h3 className={styles.sidebarTitle}>
                <Tag size={18} className={styles.widgetIcon} />
                Areas of Expertise
              </h3>
              <div className={styles.tagCloud}>
                {member.expertise.map((tag, idx) => (
                  <span key={idx} className={styles.tagChip}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Advisory & Leadership */}
          {member.advisory && member.advisory.length > 0 && (
            <div className={styles.sidebarWidget}>
              <h3 className={styles.sidebarTitle}>
                <ShieldCheck size={18} className={styles.widgetIcon} />
                Advisory & Board Roles
              </h3>
              <div className={styles.advisoryList}>
                {member.advisory.map((role, idx) => (
                  <div key={idx} className={styles.advisoryItem}>
                    <CheckCircle2 size={16} className={styles.advisoryCheck} />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
