import AmericanQuestion from "@/models/american-question";
import AmericanQuestionAnswer from "@/models/american-question-answer";
import OrderingQuestion from "@/models/ordering-question";
import OrderingQuestionStatement from "@/models/ordering-question-statement";
import TestSettings from "@/models/test-settings";

export const getTestQuestions = (testSettings: TestSettings) => {
    // make backend request
    return [
        new AmericanQuestion(
            "מהי בירת ישראל?",
            [
                new AmericanQuestionAnswer("תל אביב", "תל אביב היא מרכז כלכלי ותרבותי חשוב, אך אינה הבירה.", false),
                new AmericanQuestionAnswer("ירושלים", "ירושלים היא בירת ישראל והעיר הגדולה ביותר.", true),
                new AmericanQuestionAnswer("חיפה", "חיפה היא עיר נמל מרכזית בצפון הארץ.", false),
                new AmericanQuestionAnswer("באר שבע", "באר שבע היא העיר הגדולה בנגב.", false)
            ]
        ),
        new AmericanQuestion(
            "באיזו שנה הוכרזה מדינת ישראל?",
            [
                new AmericanQuestionAnswer("1947", "בשנה זו התקבלה תוכנית החלוקה באו\"ם.", false),
                new AmericanQuestionAnswer("1956", "בשנה זו היה מבצע קדש.", false),
                new AmericanQuestionAnswer("1948", "מדינת ישראל הוכרזה בה' באייר תש\"ח, 14 במאי 1948.", true),
                new AmericanQuestionAnswer("1967", "בשנה זו פרצה מלחמת ששת הימים.", false)
            ]
        ),
        new AmericanQuestion(
            "מהו המקום הנמוך ביותר בעולם?",
            [
                new AmericanQuestionAnswer("ים המלח", "ים המלח הוא המקום הנמוך ביותר ביבשה.", true),
                new AmericanQuestionAnswer("הכנרת", "הכנרת היא אגם המים המתוקים הנמוך ביותר בעולם, אך ים המלח נמוך יותר.", false),
                new AmericanQuestionAnswer("מאריאנה טרנץ'", "זהו המקום העמוק ביותר באוקיינוס, לא הנמוך ביותר ביבשה.", false),
                new AmericanQuestionAnswer("עמק המוות", "עמק המוות הוא מקום נמוך מאוד, אך לא כמו ים המלח.", false)
            ]
        ),
        new OrderingQuestion(
            "סדר את האירועים הבאים, מהמוקדם למאוחר",
            [
                new OrderingQuestionStatement("מלחמת ששת הימים", "מלחמת ששת הימים פרצה ב1967", 2),
                new OrderingQuestionStatement("מבצע קדש", "מבצע קדש פרץ ב1956", 1),
                new OrderingQuestionStatement("מלחמת העצמאות", "מלחמת העצמאות פרצה ב1948", 0),
                new OrderingQuestionStatement("מלחמת יום כיפור", "מלחמת יום כיפור פרצה ב1973", 3)
            ]
        )
    ]
}