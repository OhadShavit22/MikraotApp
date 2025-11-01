import { Asset } from 'expo-asset';

export interface Chapter {
  id: string;
  name: string;
  content: string;
}

export interface Topic {
  id: string;
  name: string;
  chapters: Chapter[];
}

// This structure will hold the metadata and asset references
const TOPICS_METADATA = [
  {
    id: 'ID',
    name: 'ישראל: תעודת זהות',
    chapters: [
      {
        id: '1.1',
        name: 'מדינת ישראל כמדינה יהודית ודמוקרטית',
        asset: require('../../assets/summaries/israel/israel-1.1.md'),
      },
      {
        id: '1.2',
        name: 'יסודות המשטר הדמוקרטי',
        asset: require('../../assets/summaries/israel/israel-1.2.md'),
      },
      {
        id: '1.3',
        name: 'צה"ל צבא במדינה יהודית ודמוקרטית',
        asset: require('../../assets/summaries/israel/israel-1.3.md'),
      },
      {
        id: '1.4',
        name: 'סמלים לאומיים',
        asset: require('../../assets/summaries/israel/israel-1.4.md'),
      },
    ],
  },
];

let cachedTopics: Topic[] | null = null;

export async function getTopics(): Promise<Topic[]> {
  if (cachedTopics) {
    return cachedTopics;
  }

  const topics: Topic[] = [];

  for (const topicData of TOPICS_METADATA) {
    const chapters: Chapter[] = [];
    for (const chapterData of topicData.chapters) {
      const asset = Asset.fromModule(chapterData.asset);
      // No need to download explicitly, fetch can handle it.
      const response = await fetch(asset.uri);
      const content = await response.text();
      chapters.push({
        id: chapterData.id,
        name: chapterData.name,
        content: content,
      });
    }
    topics.push({
      id: topicData.id,
      name: topicData.name,
      chapters: chapters,
    });
  }

  cachedTopics = topics;
  return topics;
}