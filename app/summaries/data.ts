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
  {
    id: 'PSIFAS',
    name: 'הפסיפס הישראלי',
    chapters: [
      {
        id: '2.2',
        name: 'עולם האמונה היהודי: מושגים בסיסיים',
        asset: require('../../assets/summaries/psifas/psifas-2.2.md'),
      },
      {
        id: '2.3',
        name: 'מיעוטים במדינת ישראל',
        asset: require('../../assets/summaries/psifas/psifas-2.3.md'),
      },
      {
        id: '2.4',
        name: 'לוח השנה הישראלי-יהודי: חגים ומועדים',
        asset: require('../../assets/summaries/psifas/psifas-2.4.md'),
      },
    ],
  },
  {
    id: 'TOLDOT',
    name: 'תולדות עם ישראל',
    chapters: [
      {
        id: '3.1',
        name: 'תקופת התנ"ך - ראשיתו של העם היהודי',
        asset: require('../../assets/summaries/toldot/toldot-3.1.md'),
      },
      {
        id: '3.2',
        name: 'בית ראשון',
        asset: require('../../assets/summaries/toldot/toldot-3.2.md'),
      },
      {
        id: '3.3',
        name: 'בית שני',
        asset: require('../../assets/summaries/toldot/toldot-3.3.md'),
      },
      {
        id: '3.4',
        name: 'המרכזים היהודיים',
        asset: require('../../assets/summaries/toldot/toldot-3.4.md'),
      },
      {
        id: '3.6',
        name: 'אמנציפציה ורעיון הציונות',
        asset: require('../../assets/summaries/toldot/toldot-3.6.md'),
      },
      {
        id: '3.7',
        name: 'התנועה הציונית',
        asset: require('../../assets/summaries/toldot/toldot-3.7.md'),
      },
      {
        id: '3.8',
        name: 'תפוצות ישראל',
        asset: require('../../assets/summaries/toldot/toldot-3.8.md'),
      },
    ],
  },
  {
    id: 'HOLOCAST',
    name: 'בימי השואה',
    chapters: [
      {
        id: '4.1',
        name: 'שנאת היהודים: פתיחה',
        asset: require('../../assets/summaries/holocast/holocast-4.1.md'),
      },
      {
        id: '4.2',
        name: 'עליית המשטר הנאצי',
        asset: require('../../assets/summaries/holocast/holocast-4.2.md'),
      },
      {
        id: '4.3',
        name: 'פריצת המלחמה',
        asset: require('../../assets/summaries/holocast/holocast-4.3.md'),
      },
      {
        id: '4.4',
        name: 'הפתרון הסופי',
        asset: require('../../assets/summaries/holocast/holocast-4.4.md'),
      },
      {
        id: '4.5',
        name: 'הצלה והתנגדות',
        asset: require('../../assets/summaries/holocast/holocast-4.5.md'),
      },
      {
        id: '4.6',
        name: 'סיום המלחמה',
        asset: require('../../assets/summaries/holocast/holocast-4.6.md'),
      },
      {
        id: '4.7',
        name: 'השואה ומדינת ישראל',
        asset: require('../../assets/summaries/holocast/holocast-4.7.md'),
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