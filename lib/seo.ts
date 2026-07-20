import portfolioData from "@/data/portfolio-data.json";

export const siteConfig = {
  name: portfolioData.personalInfo.name,
  shortName: portfolioData.personalInfo.shortName,
  title: portfolioData.personalInfo.title,
  description: portfolioData.seoData.description,
  url: portfolioData.personalInfo.websiteUrl,
  locale: portfolioData.seoData.locale,
  email: portfolioData.personalInfo.email,
  phone: portfolioData.personalInfo.phone,
  location: portfolioData.personalInfo.location,
  linkedIn: portfolioData.personalInfo.linkedIn,
  github: portfolioData.personalInfo.github,
  role: portfolioData.personalInfo.role,
  specialization: portfolioData.personalInfo.specialization,
  keywords: portfolioData.seoData.keywords,
  skills: portfolioData.skillSectionData.allSkills,
};

export { portfolioData };

