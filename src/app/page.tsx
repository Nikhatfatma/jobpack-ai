import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'JobPack AI Dashboard | Action Center',
  description: 'Manage current liner hanger job packs, view AI extractions, and export to PDF instantly.',
};

export default function Page() {
  return <HomePageClient />;
}
