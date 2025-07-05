import { NextResponse } from 'next/server';
import { Person } from '../../../types/person';
import { filterByQuery } from '../utils/filterByQuery';
import { dummyPeople } from './data/dummyPerson';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const result = filterByQuery<Person>(searchParams.toString(), dummyPeople);

  const page = Number(searchParams.get('page')) || 0;
  const pageSize = Number(searchParams.get('pageSize')) || 20;

  const startIndex = page * pageSize;
  const paginatedData = result.slice(startIndex, startIndex + pageSize);

  return NextResponse.json({
    data: paginatedData,
    total: dummyPeople.length,
    page,
    pageSize,
  });
}
