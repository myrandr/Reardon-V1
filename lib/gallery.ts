export type Category =
  | 'kitchen'
  | 'bathroom'
  | 'exterior'
  | 'bedroom'
  | 'living_room'
  | 'construction'
  | 'commercial';

export type FeaturedType = 'residential' | 'commercial' | 'renovation';

export interface Photo {
  filename: string;
  drive_url: string;
  category: Category;
  project_id: string;
  project_name: string;
  status: string;
  alt_text: string;
  date_added: string;
  sequence: number;
  featured: FeaturedType | null;
}

export interface Project {
  project_id: string;
  project_name: string;
  photos: Photo[];
}

export interface Featured {
  residential: Photo | null;
  commercial: Photo | null;
  renovation: Photo | null;
}

export interface GalleryData {
  allPhotos: Photo[];
  projects: Project[];
  featured: Featured;
}

interface SheetsResponse {
  values?: string[][];
}

const VALID_CATEGORIES: Category[] = [
  'kitchen',
  'bathroom',
  'exterior',
  'bedroom',
  'living_room',
  'construction',
  'commercial',
];

const VALID_FEATURED: FeaturedType[] = ['residential', 'commercial', 'renovation'];

function parseCategory(value: string): Category {
  const normalized = value?.toLowerCase().trim();
  if (VALID_CATEGORIES.includes(normalized as Category)) {
    return normalized as Category;
  }
  return 'construction';
}

function parseFeatured(value: string): FeaturedType | null {
  const normalized = value?.toLowerCase().trim();
  if (VALID_FEATURED.includes(normalized as FeaturedType)) {
    return normalized as FeaturedType;
  }
  return null;
}

export async function getGalleryData(): Promise<GalleryData> {
  const empty: GalleryData = {
    allPhotos: [],
    projects: [],
    featured: { residential: null, commercial: null, renovation: null },
  };

  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const sheetId = process.env.GALLERY_SHEET_ID;

  if (!apiKey || !sheetId) {
    console.error('Missing GOOGLE_SHEETS_API_KEY or GALLERY_SHEET_ID');
    return empty;
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/ReardonGallery!A:J?key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error('Sheets API error:', response.status);
      return empty;
    }

    const data: SheetsResponse = await response.json();
    const rows = data.values;

    if (!rows || rows.length <= 1) {
      return empty;
    }

    // Parse rows (skip header)
    // Columns: 0=filename, 1=drive_url, 2=category, 3=project_id,
    // 4=project_name, 5=status, 6=alt_text, 7=date_added, 8=sequence, 9=featured
    const photos: Photo[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const status = row[5]?.trim().toLowerCase();

      if (status !== 'active') continue;

      photos.push({
        filename: row[0] || '',
        drive_url: row[1] || '',
        category: parseCategory(row[2]),
        project_id: row[3] || '',
        project_name: row[4] || '',
        status: 'active',
        alt_text: row[6] || '',
        date_added: row[7] || '',
        sequence: parseInt(row[8] || '0', 10),
        featured: parseFeatured(row[9]),
      });
    }

    // Sort by date_added descending
    const allPhotos = [...photos].sort((a, b) => {
      return new Date(b.date_added).getTime() - new Date(a.date_added).getTime();
    });

    // Group by project_id
    const projectMap = new Map<string, Project>();

    for (const photo of photos) {
      const id = photo.project_id;
      if (!id) continue;

      if (!projectMap.has(id)) {
        projectMap.set(id, {
          project_id: id,
          project_name: photo.project_name,
          photos: [],
        });
      }
      projectMap.get(id)!.photos.push(photo);
    }

    // Sort photos within each project by sequence
    for (const project of projectMap.values()) {
      project.photos.sort((a, b) => a.sequence - b.sequence);
    }

    // Sort projects by most recent photo date
    const projects = Array.from(projectMap.values()).sort((a, b) => {
      const aDate = Math.max(...a.photos.map((p) => new Date(p.date_added).getTime() || 0));
      const bDate = Math.max(...b.photos.map((p) => new Date(p.date_added).getTime() || 0));
      return bDate - aDate;
    });

    // Extract featured photos
    const featured: Featured = {
      residential: photos.find((p) => p.featured === 'residential') || null,
      commercial: photos.find((p) => p.featured === 'commercial') || null,
      renovation: photos.find((p) => p.featured === 'renovation') || null,
    };

    return { allPhotos, projects, featured };
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return empty;
  }
}
