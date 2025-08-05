'use client'
import { useTranslation } from "next-i18next";
import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

const Footer = () => {
    const { t, i18n } = useTranslation("common");


  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href="/about">{t('aboutProject')}</Link>
        <Link href="/contact">{t('contact')}</Link>
        <Link href="/impressum">{t('impressum')}</Link>
        <Link href="/privacy">{t('privacyPolicy')}</Link>
      </div>
      <p className={styles.copy}>
        © {new Date().getFullYear()} {t('allRightsReserved')}
      </p>
    </footer>
  );
};

export default Footer;
