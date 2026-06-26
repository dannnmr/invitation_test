'use client';

import { useParams } from 'next/navigation';
import HomePage from '../page';

export default function TokenPage() {
  const { token } = useParams();
  return <HomePage />;
}
