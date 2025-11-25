import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyCsrfToken } from '@/lib/csrf';

// إنشاء عميل Supabase للخادم مع اعتماد مفتاح الخدمة أو مفتاح anonymous كخيار احتياطي
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serverSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  serviceKey
);

// GET /api/favorites - get current user's favorites with ad details
export async function GET() {
  const {
    data: { session },
    error: sessionError
  } = await serverSupabase.auth.getSession();
  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 });
  }
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user?.id;
  const { data, error } = await serverSupabase
    .from('favorites')
    .select('ad_id, ads(*)')
    .eq('user_id', userId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/favorites - add favorite: expects { adId }
export async function POST(request: Request) {
  const csrfHeader = request.headers.get('x-csrf-token');
  if (!verifyCsrfToken(csrfHeader)) {
    return NextResponse.json({ error: 'CSRF token mismatch' }, { status: 403 });
  }
  const {
    data: { session },
    error: sessionError
  } = await serverSupabase.auth.getSession();
  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 });
  }
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user?.id;
  const { adId } = await request.json();
  const { data, error } = await serverSupabase
    .from('favorites')
    .insert({ user_id: userId, ad_id: adId })
    .select('*')
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}

// DELETE /api/favorites - remove favorite: expects { adId }
export async function DELETE(request: Request) {
  const csrfHeader = request.headers.get('x-csrf-token');
  if (!verifyCsrfToken(csrfHeader)) {
    return NextResponse.json({ error: 'CSRF token mismatch' }, { status: 403 });
  }
  const {
    data: { session },
    error: sessionError
  } = await serverSupabase.auth.getSession();
  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 });
  }
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user?.id;
  const { adId } = await request.json();
  const { error } = await serverSupabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('ad_id', adId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}