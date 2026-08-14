import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';
import './Skills.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Skills: React.FC = () => {
  return (
    <section className="skills-section" id="skills" aria-label="Technical Expertise and Skills">
      <div className="container">
        {/* Section Header */}
        <div className="skills-header-block">
          <div className="eyebrow">CORE COMPETENCIES &amp; STACK</div>
          <div className="skills-heading-wrap">
            <motion.h2
              className="skills-section-heading"
              initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              TECHNICAL EXPERTISE.
            </motion.h2>
          </div>
        </div>

        {/* Grouped Category Rows */}
        <div className="skills-categories-list">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              className="skill-category-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_OUT }}
            >
              {/* Category Name & Index */}
              <div className="category-meta-col">
                <span className="category-index">0{index + 1}.</span>
                <h3 className="category-name">{group.category}</h3>
              </div>

              {/* Categorized Skills List */}
              <div className="category-items-col">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
