'use client'
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <p>© {new Date().getFullYear()} {t('allRightsReserved')}</p>
    </footer>
  );
};

export default Footer;
