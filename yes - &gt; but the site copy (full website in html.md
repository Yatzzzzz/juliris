<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# yes - > but the site copy (full website in html) using Hbrew only - we do not use english, only for headlines somethimes and do not sell to non israeli cutsomers

כן — אבנה לך עכשיו גרסת בסיס מלאה של קופי + HTML בעברית בלבד, מותאמת לחנות שפונה ללקוחות בישראל בלבד, על בסיס מה שכבר קיים ב‑Juliris כיום: דף בית עם מסר של “תכשיטים לעור רגיש”, חנות עם קטגוריות כמו טבעות/עגילים/צמידים/שרשראות/עיצוב אישי/תכשיטי סטיינלס סטיל, וגם עמודים כמו Popular, Newest, FAQ, מדיניות החזרים ו‑Instagram.[^1][^2][^3][^4][^5][^6]
הכיוון כאן הוא לקחת את הבסיס הקיים ב‑WooCommerce, לחזק את ההבטחה של היפואלרגני + סטיינלס סטיל, ולהפוך את האתר לברור, אמין וממיר יותר לקהל הנשי הישראלי שאתו Juliris כבר עובד.

## מפת האתר

מה שאפשר לזהות כרגע הוא דף בית, חנות, עמודי Popular ו‑Newest, מדיניות החזרים, FAQ, עמוד Instagram, Sale, Wishlist, אודות, מדיניות פרטיות, צור קשר, וגם קטגוריות מוצר כמו תכשיטי סטיינלס סטיל וסטים של שרשראות.[^2][^3][^4][^5][^6][^7][^1]
אני ממליץ לבנות את האתר סביב ניווט פשוט יותר: דף הבית, חנות, כל הטבעות, כל העגילים, כל השרשראות, כל הצמידים, סטיינלס סטיל, עיצוב אישי, אודות, שאלות נפוצות, משלוחים והחזרות, צור קשר.[^4][^6][^1]

## מבנה מומלץ

העמודים שחייבים להיות בגרסה החדשה הם: דף בית, חנות/קטגוריות, אודות, שאלות נפוצות, משלוחים והחזרות, מדיניות פרטיות, צור קשר, ודף ייעודי ל“תכשיטים לעור רגיש”.[^6][^1][^4]
בנוסף, מכיוון שהאתר כבר מדגיש סטיינלס סטיל ויש קהל רלוונטי של נשים בישראל, כדאי להוסיף גם “הנמכרים ביותר”, “חדשים באתר”, ועמוד “למה סטיינלס סטיל” שיסביר את הערך ולא רק יציג מוצרים.[^3][^5][^1][^2]

## HTML מוכן

להלן סט HTML בסיסי בעברית בלבד.
הקוד כתוב כקופי + מבנה תוכן, כדי שתוכל להעביר אותו ישירות ל‑WordPress/WooCommerce או להתאים ל‑Elementor/Gutenberg.

### 1) `index.html` — דף הבית

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Juliris | תכשיטים היפואלרגניים לנשים</title>
  <meta name="description" content="תכשיטי סטיינלס סטיל היפואלרגניים לנשים בישראל. עגילים, שרשראות, טבעות וצמידים בעיצוב נשי, עדין ויומיומי." />
</head>
<body>

  <header>
    <div class="top-bar">
      <p>משלוחים לכל הארץ | שירות אישי | תכשיטים היפואלרגניים</p>
    </div>

    <nav>
      <a href="/">דף הבית</a>
      <a href="/shop/">חנות</a>
      <a href="/product-category/rings/">טבעות</a>
      <a href="/product-category/earrings/">עגילים</a>
      <a href="/product-category/necklaces/">שרשראות</a>
      <a href="/product-category/bracelets/">צמידים</a>
      <a href="/product-category/stainless-steel/">סטיינלס סטיל</a>
      <a href="/about/">אודות</a>
      <a href="/faq/">שאלות נפוצות</a>
      <a href="/shipping-returns/">משלוחים והחזרות</a>
      <a href="/contact/">צור קשר</a>
    </nav>
  </header>

  <main>

    <section class="hero">
      <h1>תכשיטים היפואלרגניים לנשים שאוהבות יופי, נוחות ואיכות</h1>
      <p>
        ב-Juliris תמצאי תכשיטי סטיינלס סטיל בעיצוב נשי, עדין ויומיומי —
        מתאימים לעור רגיש, נוחים לענידה ומשתלבים מושלם בכל לוק.
      </p>
      <a href="/shop/">לקנייה עכשיו</a>
      <a href="/popular/">הנמכרים ביותר</a>
    </section>

    <section class="trust-icons">
      <h2>למה לבחור ב-Juliris?</h2>
      <ul>
        <li>תכשיטים היפואלרגניים המתאימים לעור רגיש</li>
        <li>דגמי סטיינלס סטיל עמידים ונוחים לשימוש יומיומי</li>
        <li>עיצוב נשי, עדין ומדויק</li>
        <li>שירות אישי ומשלוחים לכל הארץ</li>
      </ul>
    </section>

    <section class="best-sellers">
      <h2>הנמכרים ביותר</h2>
      <p>הדגמים שהלקוחות שלנו הכי אוהבות — קלאסיים, נוחים וקלים לשילוב.</p>
      <div class="products-grid">
        <article>
          <h3>עגילים מובילים</h3>
          <p>עגילים קלים, מחמיאים ומתאימים ליום-יום.</p>
          <a href="/product-category/earrings/">לצפייה בעגילים</a>
        </article>
        <article>
          <h3>שרשראות אהובות</h3>
          <p>שכבות, תליונים ודגמים עדינים למראה אלגנטי.</p>
          <a href="/product-category/necklaces/">לצפייה בשרשראות</a>
        </article>
        <article>
          <h3>טבעות נבחרות</h3>
          <p>טבעות נשיות ללבישה יומיומית או לשילוב מושלם.</p>
          <a href="/product-category/rings/">לצפייה בטבעות</a>
        </article>
      </div>
    </section>

    <section class="sensitive-skin">
      <h2>תכשיטים לעור רגיש</h2>
      <p>
        אם קשה לך למצוא תכשיטים שלא מגרים את העור, הגעת למקום הנכון.
        בחרנו עבורך דגמים שמתאימים לנשים שמחפשות גם מראה יפה וגם תחושת נוחות אמיתית.
      </p>
      <a href="/hypoallergenic-jewelry/">לכל התכשיטים לעור רגיש</a>
    </section>

    <section class="social-proof">
      <h2>מה הלקוחות שלנו אומרות</h2>
      <blockquote>
        "סוף סוף עגילים שגם נראים מעולה וגם נעימים לי על האוזן."
      </blockquote>
      <blockquote>
        "התכשיטים עדינים, יפים ומרגישים איכותיים. קיבלתי מלא מחמאות."
      </blockquote>
      <blockquote>
        "אני עם עור רגיש, וזו אחת הרכישות הכי טובות שעשיתי."
      </blockquote>
    </section>

    <section class="new-arrivals">
      <h2>חדשים באתר</h2>
      <p>הדגמים החדשים שנכנסו עכשיו לקולקציה.</p>
      <a href="/newest/">לכל החדשים</a>
    </section>

    <section class="about-preview">
      <h2>הסיפור של Juliris</h2>
      <p>
        Juliris נולדה מתוך אהבה לעיצוב נשי ומתוך רצון ליצור תכשיטים
        יפים, נוחים ונגישים לנשים שאוהבות סטייל אבל לא רוצות להתפשר על תחושה.
      </p>
      <a href="/about/">לקריאה נוספת</a>
    </section>

    <section class="newsletter">
      <h2>רוצה להיות הראשונה לדעת?</h2>
      <p>הצטרפי לקבלת עדכונים על דגמים חדשים, מבצעים והשראות.</p>
      <form>
        <input type="email" placeholder="כתובת האימייל שלך" />
        <button type="submit">הצטרפי</button>
      </form>
    </section>

  </main>

  <footer>
    <div>
      <h3>Juliris</h3>
      <p>תכשיטים היפואלרגניים לנשים בישראל</p>
    </div>

    <div>
      <h4>ניווט מהיר</h4>
      <a href="/">דף הבית</a>
      <a href="/shop/">חנות</a>
      <a href="/about/">אודות</a>
      <a href="/faq/">שאלות נפוצות</a>
      <a href="/shipping-returns/">משלוחים והחזרות</a>
      <a href="/privacy-policy/">מדיניות פרטיות</a>
      <a href="/contact/">צור קשר</a>
    </div>

    <div>
      <h4>יצירת קשר</h4>
      <p>טלפון: 055-4316100</p>
      <p>אימייל: contact@juliris.com</p>
      <p>שעות מענה: ימים א'-ה' 9:00–19:00 | ו' 9:00–14:00</p>
    </div>

    <div>
      <h4>עקבי אחרינו</h4>
      <a href="/follow-our-instagram/">לאינסטגרם</a>
    </div>
  </footer>

</body>
</html>
```


### 2) `about.html` — אודות

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>אודות | Juliris</title>
  <meta name="description" content="הכירי את Juliris — מותג תכשיטים היפואלרגניים לנשים שאוהבות עיצוב עדין, איכות ונוחות יומיומית." />
</head>
<body>
  <main>
    <section>
      <h1>אודות Juliris</h1>
      <p>
        Juliris הוא מותג תכשיטים לנשים שאוהבות עיצוב נשי, עדין ונקי,
        בלי להתפשר על נוחות ועל התאמה לעור רגיש.
      </p>
      <p>
        אנחנו מאמינות שתכשיט צריך להרגיש טוב בדיוק כמו שהוא נראה —
        להשתלב ביום-יום, להחמיא, ולהעניק תחושת ביטחון בכל פעם שעונדים אותו.
      </p>
      <p>
        לכן אנחנו בוחרות דגמים עם מראה אלגנטי ונגיש, עם דגש על תכשיטי סטיינלס סטיל
        וקולקציות שמתאימות ללבישה יומיומית.
      </p>
    </section>

    <section>
      <h2>מה חשוב לנו</h2>
      <ul>
        <li>עיצוב נשי ועדין שקל לשלב עם כל לוק</li>
        <li>תכשיטים שמתאימים גם לנשים עם עור רגיש</li>
        <li>חוויית קנייה אישית, נעימה וברורה</li>
        <li>קולקציות שמתחדשות בהתאם לטרנדים, בלי לאבד קלאסיות</li>
      </ul>
    </section>

    <section>
      <h2>למי Juliris מתאימה?</h2>
      <p>
        לנשים שאוהבות מראה מטופח ולא מתאמץ.
        לנשים שמחפשות תכשיט יפה ליום-יום, למשרד, לבילוי או למתנה.
        ולמי שכבר התייאשה מתכשיטים שמרגישים לא נעים על העור.
      </p>
    </section>

    <section>
      <h2>הזמנה אישית</h2>
      <p>
        מחפשת התאמה אישית, שילוב מסוים או מתנה מיוחדת?
        נשמח לעזור לך לבחור את התכשיט הנכון עבורך.
      </p>
      <a href="/contact/">ליצירת קשר</a>
    </section>
  </main>
</body>
</html>
```


### 3) `hypoallergenic-jewelry.html` — תכשיטים לעור רגיש

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>תכשיטים לעור רגיש | Juliris</title>
  <meta name="description" content="מחפשת תכשיטים לעור רגיש? ב-Juliris תמצאי דגמי סטיינלס סטיל בעיצוב נשי, נעים ויומיומי." />
</head>
<body>
  <main>
    <section>
      <h1>תכשיטים לעור רגיש</h1>
      <p>
        אם את רגישה לתכשיטים מסוימים, את לא צריכה לבחור בין נוחות לבין יופי.
        אצלנו תוכלי למצוא תכשיטים שנבחרו מתוך מחשבה על תחושה טובה, שימוש יומיומי ומראה מחמיא.
      </p>
    </section>

    <section>
      <h2>למה לקוחות בוחרות בנו?</h2>
      <ul>
        <li>דגמים נוחים ללבישה לאורך היום</li>
        <li>מבחר תכשיטי סטיינלס סטיל</li>
        <li>מראה עדין, נשי וקלאסי</li>
        <li>אפשרויות מתנה ודגמים לכל סגנון</li>
      </ul>
    </section>

    <section>
      <h2>מה תמצאי כאן?</h2>
      <p>
        עגילים, שרשראות, טבעות וצמידים שמתאימים לנשים שמחפשות גם אסתטיקה וגם נוחות.
      </p>
      <a href="/shop/">לכל המוצרים</a>
    </section>

    <section>
      <h2>לא בטוחה מה לבחור?</h2>
      <p>
        התחילי מהקטגוריות האהובות ביותר או פני אלינו להתאמה אישית.
      </p>
      <a href="/popular/">הנמכרים ביותר</a>
      <a href="/contact/">ייעוץ אישי</a>
    </section>
  </main>
</body>
</html>
```


### 4) `faq.html` — שאלות נפוצות

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>שאלות נפוצות | Juliris</title>
</head>
<body>
  <main>
    <section>
      <h1>שאלות נפוצות</h1>

      <h2>האם התכשיטים מתאימים לעור רגיש?</h2>
      <p>
        רבים מהדגמים שלנו מתאימים גם לנשים עם עור רגיש, במיוחד דגמי הסטיינלס סטיל.
        בכל מקרה של רגישות מיוחדת, מומלץ לבדוק את פרטי המוצר או לפנות אלינו לפני ההזמנה.
      </p>

      <h2>מאילו חומרים עשויים התכשיטים?</h2>
      <p>
        בחנות תמצאי בין היתר תכשיטי סטיינלס סטיל ודגמים נבחרים נוספים.
        בכל עמוד מוצר יש לפרט את סוג התכשיט והמאפיינים שלו.
      </p>

      <h2>איך בוחרים מידה לטבעת?</h2>
      <p>
        מומלץ להיעזר במדריך המידות או לפנות אלינו לקבלת עזרה לפני הרכישה.
      </p>

      <h2>האם אפשר להזמין מתנה?</h2>
      <p>
        כן. אם מדובר במתנה, אפשר לציין זאת בהערות להזמנה ונעשה את המקסימום כדי להתאים את האריזה.
      </p>

      <h2>האם יש עיצוב אישי?</h2>
      <p>
        כן. בחלק מהמוצרים קיימת אפשרות לעיצוב אישי או התאמה מיוחדת.
      </p>

      <h2>איך יוצרים קשר?</h2>
      <p>
        אפשר לפנות אלינו דרך עמוד צור קשר, בטלפון או באימייל.
      </p>
    </section>
  </main>
</body>
</html>
```


### 5) `shipping-returns.html` — משלוחים והחזרות

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>משלוחים והחזרות | Juliris</title>
</head>
<body>
  <main>
    <section>
      <h1>משלוחים והחזרות</h1>

      <h2>משלוחים</h2>
      <p>
        אנו שולחות הזמנות לכל רחבי ישראל.
        זמן האספקה משתנה בהתאם לסוג המשלוח, לאזור החלוקה ולעומס בתקופות חגים ומבצעים.
      </p>

      <h2>החלפות והחזרות</h2>
      <p>
        אם קיבלת מוצר שאינו מתאים לך, ניתן לפנות אלינו תוך פרק הזמן שמוגדר במדיניות החנות
        ונשמח לבדוק אפשרות להחלפה או להחזרה בהתאם לסוג המוצר ולמצבו.
      </p>

      <h2>מוצרים בהתאמה אישית</h2>
      <p>
        במוצרים שיוצרו או הותאמו במיוחד עבורך ייתכנו תנאים שונים להחלפה או להחזרה.
      </p>

      <h2>פנייה לשירות לקוחות</h2>
      <p>
        לכל שאלה אפשר לפנות אלינו בטלפון 055-4316100 או באימייל contact@juliris.com.
      </p>
    </section>
  </main>
</body>
</html>
```


### 6) `contact.html` — צור קשר

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>צור קשר | Juliris</title>
</head>
<body>
  <main>
    <section>
      <h1>צור קשר</h1>
      <p>נשמח לעזור בכל שאלה לגבי מוצר, התאמה, הזמנה או משלוח.</p>

      <div>
        <p><strong>טלפון:</strong> 055-4316100</p>
        <p><strong>אימייל:</strong> contact@juliris.com</p>
        <p><strong>שעות מענה:</strong> ימים א'-ה' 9:00–19:00 | ימי ו' 9:00–14:00</p>
      </div>

      <form>
        <label>שם מלא</label>
        <input type="text" name="name" />

        <label>אימייל</label>
        <input type="email" name="email" />

        <label>טלפון</label>
        <input type="text" name="phone" />

        <label>נושא הפנייה</label>
        <input type="text" name="subject" />

        <label>הודעה</label>
        <textarea name="message"></textarea>

        <button type="submit">שלחי הודעה</button>
      </form>
    </section>
  </main>
</body>
</html>
```


### 7) `shop-intro.html` — בלוק פתיחה לעמוד החנות

```html
<section class="shop-intro">
  <h1>החנות של Juliris</h1>
  <p>
    ברוכה הבאה לקולקציה שלנו — תכשיטים היפואלרגניים בעיצוב נשי, עדין ויומיומי.
    כאן תוכלי למצוא עגילים, שרשראות, טבעות וצמידים שמתאימים לשילוב מושלם בכל לוק.
  </p>
</section>
```


### 8) `popular.html` — הנמכרים ביותר

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>הנמכרים ביותר | Juliris</title>
</head>
<body>
  <main>
    <section>
      <h1>הנמכרים ביותר</h1>
      <p>
        הדגמים שהלקוחות שלנו הכי אוהבות — נוחים, מחמיאים ומתאימים ליום-יום.
      </p>
      <p>
        אם זו ההזמנה הראשונה שלך, זה המקום המושלם להתחיל ממנו.
      </p>
    </section>
  </main>
</body>
</html>
```


### 9) `newest.html` — חדשים באתר

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>חדשים באתר | Juliris</title>
</head>
<body>
  <main>
    <section>
      <h1>חדשים באתר</h1>
      <p>
        הכירי את הדגמים החדשים שנכנסו עכשיו לקולקציה —
        טרנדיים, נשיים ונבחרו בקפידה.
      </p>
    </section>
  </main>
</body>
</html>
```


### 10) תבנית קצרה לעמוד מוצר ב‑WooCommerce

```html
<section class="product-benefits">
  <ul>
    <li>מתאים ללוק יומיומי ולשילוב קל עם תכשיטים נוספים</li>
    <li>עיצוב נשי, עדין ומחמיא</li>
    <li>נבחר בקפידה לנוחות וסטייל</li>
  </ul>
</section>

<section class="product-description">
  <h2>תיאור המוצר</h2>
  <p>
    תכשיט בעיצוב עדין ומחמיא, שמתאים ליום-יום וגם ליציאות.
    הבחירה המושלמת למי שאוהבת מראה נשי, אלגנטי ולא מתאמץ.
  </p>
</section>

<section class="product-extra">
  <h2>למי זה מתאים?</h2>
  <p>
    לנשים שאוהבות תכשיטים עם נוכחות עדינה, גימור יפה ונוחות אמיתית.
  </p>

  <h2>צריך עזרה לפני הזמנה?</h2>
  <p>
    אפשר לפנות אלינו ונשמח לעזור בבחירה, בהתאמה או בכל שאלה.
  </p>
</section>
```


## חיבורים ויישום

כרגע רואים באתר גם עמודים כלליים או שאריות תבנית כמו “How to plan the perfect beach wedding outfit”, “Video presentation new collection”, תגיות שונות, ועמודים כמו “Follow our Instagram”, מה שמעיד שיש באתר תוכן שלא משרת מספיק טוב את מסלול הקנייה הראשי.[^8][^9][^10][^11]
לכן הייתי מחבר את כל התנועה מהתפריט העליון והפוטר רק לעמודים שמקדמים רכישה, אמון והבנת המותג: בית, חנות, קטגוריות, היפואלרגני, אודות, FAQ, משלוחים והחזרות, צור קשר.[^1][^4][^6]

סדר חיבור מומלץ:

- בתפריט עליון: דף הבית, חנות, טבעות, עגילים, שרשראות, צמידים, סטיינלס סטיל, אודות, שאלות נפוצות, צור קשר.
- בפוטר: משלוחים והחזרות, מדיניות פרטיות, שאלות נפוצות, צור קשר, אינסטגרם.
- מתוך דף הבית: כפתורים ל“הנמכרים ביותר”, “חדשים באתר”, “תכשיטים לעור רגיש”.
- מתוך כל עמוד מוצר: קישור ל‑FAQ, שירות לקוחות, ומוצרים דומים.


## הערות שיפור

המסר הנוכחי בדף הבית סביב “מלאי מוגבל” ו“פתחי וגלי את ההפתעה” יוצר תחושת קמפיין, אבל הוא לא מציג מיד את היתרון המרכזי של Juliris כמותג תכשיטים לעור רגיש.
עדיף שהשורה הראשונה באתר תאמר באופן ברור מה את מוכרת, למי, ולמה זה טוב יותר: תכשיטים היפואלרגניים, סטיינלס סטיל, עיצוב נשי, ללקוחות בישראל.[^5]

החנות כבר כוללת קטגוריות חזקות כמו תכשיטי סטיינלס סטיל, עיצוב אישי, טבעות, עגילים, צמידים ושרשראות, ולכן צריך פשוט להפוך אותן ליותר ברורות ויותר שיווקיות בטקסטים ובבנרים.[^1]
מומלץ גם להחליף שמות כמו “Popular” ו‑“Newest” לגרסאות עבריות מלאות — “הנמכרים ביותר” ו“חדשים באתר” — כדי לשמור על שפה אחידה ומקומית.[^2][^3]

השלב הבא שאני ממליץ עליו הוא להכין לך את זה כסט של קבצים מוכן ממש להדבקה ב‑WordPress:

1. גרסת HTML/CSS מלאה לדף הבית.
2. טקסטים מוכנים לכל קטגוריה באתר.
3. קופי לעמודי מוצר ב‑WooCommerce.
4. גרסת SEO מלאה בעברית לכל עמוד, כולל title + meta description + H1.

האם לבנות עכשיו את שלב 2 — כל הטקסטים לקטגוריות המוצר שלך בעברית, אחת אחת?
<span style="display:none">[^12][^13][^14][^15]</span>

<div align="center">⁂</div>

[^1]: https://www.juliris.com/shop/

[^2]: https://www.juliris.com/popular/

[^3]: https://juliris.com/newest/

[^4]: https://www.juliris.com/shipping-returns/

[^5]: https://www.juliris.com/follow-our-instagram/

[^6]: https://www.juliris.com/faq/

[^7]: https://juliris.com/product-category/all-necklaces/סט-שרשראות/

[^8]: https://www.juliris.com/how-to-plan-the-perfect-beach-wedding-outfit/

[^9]: https://www.juliris.com/tag/jewelry/

[^10]: https://www.juliris.com/video-presentation-new-collection/

[^11]: https://www.juliris.com/tag/presentation/

[^12]: https://www.juliris.com

[^13]: https://juliris.com/sale/

[^14]: https://www.juliris.com/9034-2/

[^15]: https://www.juliris.com/tag/2021/

