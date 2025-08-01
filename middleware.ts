import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
 if (pathname.startsWith('/studio')) {
    return NextResponse.next()
  }
  // Пропуск API, уже локализованных путей, и статических файлов
  if (
    pathname.startsWith('/ru') ||
    pathname.startsWith('/de') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Определяем язык из заголовка
  const langHeader = request.headers.get('accept-language') || '';
  const lang = langHeader.slice(0, 2); // например, 'de-DE,de;q=0.9,en;q=0.8' → 'de'
  const redirectLocale = lang === 'ru' ? 'ru' : 'de';

  const url = request.nextUrl.clone();
  url.pathname = `/${redirectLocale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|assets|robots.txt).*)'],
};
