'use client'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <nav>
      <ul>
        <li>{t('home')}</li>
        <li>{t('about')}</li>
      </ul>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => changeLanguage('ru')}>🇷🇺 RU</button>
        <button onClick={() => changeLanguage('de')}>🇩🇪 DE</button>
      </div>
    </nav>
  );
};

export default Header;
